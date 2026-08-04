const path = require('path');

const CAC_LARGE_60 = require(path.join(__dirname, '../reference-data/cac-large-60'));
const SP_500 = require(path.join(__dirname, '../reference-data/sp-500'));

const CACHE_TTL_MS = 12 * 60 * 1000;
const CHUNK_SIZE = 20; // l'endpoint spark de Yahoo refuse plus de 20 symboles par requête

const cache = {
  cacLarge60: { data: null, timestamp: 0, pending: null },
  sp500: { data: null, timestamp: 0, pending: null },
};

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

async function fetchSparkBatch(symbols) {
  const url = `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${symbols.map(encodeURIComponent).join(',')}&range=1mo&interval=1d`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`Requête spark Yahoo échouée (${res.status})`);
  const data = await res.json();
  return data?.spark?.result ?? [];
}

function computeStock(symbol, referenceName, sparkResponse) {
  if (!sparkResponse) {
    return { symbol, name: referenceName, currentPrice: null, dayChangePercent: null, fiveDayChangePercent: null };
  }

  const meta = sparkResponse.meta ?? {};
  const closes = (sparkResponse.indicators?.quote?.[0]?.close ?? []).filter(c => c != null);

  const currentPrice = meta.regularMarketPrice ?? null;
  const previousClose = meta.chartPreviousClose ?? null;
  const dayChangePercent = (currentPrice != null && previousClose)
    ? ((currentPrice - previousClose) / previousClose) * 100
    : null;

  let fiveDayChangePercent = null;
  if (closes.length >= 2) {
    const baselineIndex = Math.max(0, closes.length - 1 - 5);
    const baseline = closes[baselineIndex];
    const latest = closes[closes.length - 1];
    if (baseline) fiveDayChangePercent = ((latest - baseline) / baseline) * 100;
  }

  const name = meta.longName || meta.shortName || referenceName || symbol;

  return { symbol, name, currentPrice, dayChangePercent, fiveDayChangePercent };
}

async function fetchMarketData(referenceList) {
  const chunks = chunkArray(referenceList.map(r => r.symbol), CHUNK_SIZE);

  const chunkResults = await Promise.all(chunks.map(async chunk => {
    try {
      return await fetchSparkBatch(chunk);
    } catch (err) {
      console.error('Erreur lors du fetch spark Yahoo:', err.message);
      return [];
    }
  }));

  const bySymbol = new Map();
  for (const chunkResult of chunkResults) {
    for (const item of chunkResult) {
      if (item?.symbol) bySymbol.set(item.symbol, item.response?.[0] ?? null);
    }
  }

  return referenceList.map(ref => computeStock(ref.symbol, ref.name, bySymbol.get(ref.symbol)));
}

async function getCached(key, referenceList) {
  const entry = cache[key];
  const now = Date.now();

  if (entry.data && (now - entry.timestamp) < CACHE_TTL_MS) {
    return entry.data;
  }

  if (entry.pending) {
    return entry.pending;
  }

  entry.pending = fetchMarketData(referenceList)
    .then(data => {
      entry.data = data;
      entry.timestamp = Date.now();
      entry.pending = null;
      return data;
    })
    .catch(err => {
      entry.pending = null;
      if (entry.data) {
        console.error(`Échec du rafraîchissement de "${key}", conservation des données précédentes :`, err.message);
        return entry.data;
      }
      throw err;
    });

  return entry.pending;
}

module.exports = class BourseManager {

  static async getCacLarge60() {
    return getCached('cacLarge60', CAC_LARGE_60);
  }

  static async getSp500() {
    return getCached('sp500', SP_500);
  }
};
