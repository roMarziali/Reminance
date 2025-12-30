
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24747, hash: '167912210c8a9616006f1e3f2c1cdfc5f013a2e088848db38fc73c5334878677', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17055, hash: 'bc8f0ad79f1887a49f447e47878d882257c6a065053862304860de318aa9b423', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 91472, hash: '16cc77655bb2590fdf4a358730e206f0371ecfe9b7cb777320e17b72daa76090', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-SRBIV2EV.css': {size: 8248, hash: 'DvQ8mWIl6w8', text: () => import('./assets-chunks/styles-SRBIV2EV_css.mjs').then(m => m.default)}
  },
};
