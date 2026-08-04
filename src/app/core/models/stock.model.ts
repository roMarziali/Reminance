export interface Stock {
  symbol: string,
  name: string,
  currentPrice: number | null,
  dayChangePercent: number | null,
  fiveDayChangePercent: number | null
}
