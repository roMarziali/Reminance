
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/menu"
  },
  {
    "renderMode": 2,
    "route": "/reminance"
  },
  {
    "renderMode": 2,
    "route": "/bourse"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24747, hash: '54aabad1d087636f29787c55eba30b8411a409dddacd462a4de713e256e1a924', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17055, hash: '1233a40b685617c25d17ab92c24d08c9163f1d10de0151d5dfc74160755d5fcb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'reminance/index.html': {size: 294, hash: '24561390b6d2300603169bbac011ac932de98ab7282ed331fd7cb9363dc3a3a4', text: () => import('./assets-chunks/reminance_index_html.mjs').then(m => m.default)},
    'bourse/index.html': {size: 285, hash: 'd0bc0752ccfee4e35fabdd2aa6151d13fcbe540eb619ab3ac89d816baf5a88cd', text: () => import('./assets-chunks/bourse_index_html.mjs').then(m => m.default)},
    'menu/index.html': {size: 279, hash: 'b4beb247e8613e08bd5b9c4d9ac3bbf1acb60b2d1463aeb70a79063db74ae054', text: () => import('./assets-chunks/menu_index_html.mjs').then(m => m.default)},
    'index.html': {size: 91426, hash: '1c2b7236a486c29ece8da0c94becd53d97e194cfc8a91498faed16abdd3a7f7f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-SRBIV2EV.css': {size: 8248, hash: 'DvQ8mWIl6w8', text: () => import('./assets-chunks/styles-SRBIV2EV_css.mjs').then(m => m.default)}
  },
};
