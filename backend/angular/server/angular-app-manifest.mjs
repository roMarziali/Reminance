
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
    'index.csr.html': {size: 24747, hash: 'e0bf4c6eff768abc697d313b1f21c59d21ef060db2233518535080251aaa81b2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17055, hash: '9224d8148b554fd6f7809f3883e364f137aef74f71bf3cfd39d8b9b8d01d8c81', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 91472, hash: 'ee9eead9dbf6c9b41e1c1e750c62e401e9752b146d3fecc3cbd51afd6b866ce1', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-SRBIV2EV.css': {size: 8248, hash: 'DvQ8mWIl6w8', text: () => import('./assets-chunks/styles-SRBIV2EV_css.mjs').then(m => m.default)}
  },
};
