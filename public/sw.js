if (!self.define) {
  let e,
    a = {};
  const s = (s, i) => (
    (s = new URL(s + '.js', i).href),
    a[s] ||
      new Promise(a => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (a[t]) return;
    let c = {};
    const r = e => s(e, t),
      f = { module: { uri: t }, exports: c, require: r };
    a[t] = Promise.all(i.map(e => f[e] || r(e))).then(e => (n(...e), c));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'e31abe598e89c0192cb087db56c76864' },
        { url: '/_next/static/chunks/212.a6d77743b0e2dd21.js', revision: 'a6d77743b0e2dd21' },
        { url: '/_next/static/chunks/250-12115cf3fdcf144d.js', revision: 'fhj_SJ61GyzarF74Op6-N' },
        { url: '/_next/static/chunks/576-532deb8b40875340.js', revision: 'fhj_SJ61GyzarF74Op6-N' },
        { url: '/_next/static/chunks/655-e788bd8ffbea2b35.js', revision: 'fhj_SJ61GyzarF74Op6-N' },
        { url: '/_next/static/chunks/682-ea7ecc0fd6985085.js', revision: 'fhj_SJ61GyzarF74Op6-N' },
        { url: '/_next/static/chunks/745-fb576115e5825870.js', revision: 'fhj_SJ61GyzarF74Op6-N' },
        { url: '/_next/static/chunks/749-8b10ae8cd7754e0a.js', revision: 'fhj_SJ61GyzarF74Op6-N' },
        { url: '/_next/static/chunks/837-487f9ad47e1291a6.js', revision: 'fhj_SJ61GyzarF74Op6-N' },
        {
          url: '/_next/static/chunks/app/(main)/layout-b14d667d6f65d79c.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/(main)/page-cbd07c9751b0bbd2.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/_not-found-13ef191211e862d7.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/admin/blockchain/page-31cca977e9135c90.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/admin/content/page-c9565d15fb509a9e.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/admin/finance/page-05f17801d27b1e4c.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/admin/layout-1c5e3da9aa4760dc.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/admin/login/layout-7db832c471b7e53b.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/admin/login/page-cc62efa54f8e668f.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/admin/page-4b7379d4ecabf8df.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/admin/raffles/%5Bid%5D/page-86e2d18daea1ba46.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/admin/raffles/page-ef7924f0b8831fd8.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/admin/settings/page-924e32337426c8b0.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/admin/users/page-7ea99d941ac1b6c7.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/auth/layout-1d37df2344c0a09c.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/auth/sign-in/page-76daccde1c9685c6.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/auth/sign-up/page-d0eb37a5be19d74f.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/dashboard/active-raffles/page-1502de0592943592.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/dashboard/layout-780c6525f295ae56.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/dashboard/page-31eab4b8d5f67ad4.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/dashboard/profile/page-9110daee5080c05b.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/dashboard/settings/page-b9fd011b1c372645.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/dashboard/tickets/page-32e05445b889f3df.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/dashboard/transactions/page-6e463e6d8732de27.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/layout-11c3336688300be4.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/offline/page-d075cf7d49696843.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/app/raffle/%5Bid%5D/page-3e51e6e4e3223372.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/fd9d1056-e3346d16308c1f9c.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/framework-aec844d2ccbe7592.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        { url: '/_next/static/chunks/main-30d5b1fe2b08e974.js', revision: 'fhj_SJ61GyzarF74Op6-N' },
        {
          url: '/_next/static/chunks/main-app-7a00c27afd863bfd.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/pages/_app-75f6107b0260711c.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        {
          url: '/_next/static/chunks/webpack-8b3b01531a1a77a0.js',
          revision: 'fhj_SJ61GyzarF74Op6-N',
        },
        { url: '/_next/static/css/a340003183ea254a.css', revision: 'a340003183ea254a' },
        {
          url: '/_next/static/fhj_SJ61GyzarF74Op6-N/_buildManifest.js',
          revision: 'e0a21c7d7f93d89dce16df0231dc76f2',
        },
        {
          url: '/_next/static/fhj_SJ61GyzarF74Op6-N/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/media/0484562807a97172-s.p.woff2',
          revision: 'b550bca8934bd86812d1f5e28c9cc1de',
        },
        {
          url: '/_next/static/media/062522b8b7c3ad6a-s.woff2',
          revision: '0f347a32b2168180dbc514e104ab207c',
        },
        {
          url: '/_next/static/media/19e37deead9b3ec2-s.woff2',
          revision: '8f919c25620e7f246b5abcfa979922bf',
        },
        {
          url: '/_next/static/media/3d9ea938b6afa941-s.p.woff2',
          revision: 'ee1b2a154fb9ea98a28413a839adedfb',
        },
        {
          url: '/_next/static/media/46392699924ae7e5-s.woff2',
          revision: '467f697ccbe92aebc38f6c1a433f6948',
        },
        {
          url: '/_next/static/media/6fed4e5749a3ea15-s.woff2',
          revision: 'bd04001574d461203c7264ac27d8c504',
        },
        {
          url: '/_next/static/media/83651bee47cf14da-s.woff2',
          revision: 'd2bb91b14d5895c91741b933a76be9c0',
        },
        {
          url: '/_next/static/media/8888a3826f4a3af4-s.p.woff2',
          revision: '792477d09826b11d1e5a611162c9797a',
        },
        {
          url: '/_next/static/media/9beef36ab83de3f0-s.woff2',
          revision: '82c2dc97217d32c57a029754fda91e4e',
        },
        {
          url: '/_next/static/media/a1386beebedccca4-s.woff2',
          revision: 'd3aa06d13d3cf9c0558927051f3cb948',
        },
        {
          url: '/_next/static/media/b957ea75a84b6ea7-s.p.woff2',
          revision: '0bd523f6049956faaf43c254a719d06a',
        },
        {
          url: '/_next/static/media/c3bc380753a8436c-s.woff2',
          revision: '5a1b7c983a9dc0a87a2ff138e07ae822',
        },
        {
          url: '/_next/static/media/dd4ab5b525bd804a-s.woff2',
          revision: 'b505d29c0021c60e4a004de0b5fea45f',
        },
        {
          url: '/_next/static/media/e6f5886ae1242622-s.woff2',
          revision: 'e64d3f79602912c46c2b4d7f26dcadb8',
        },
        {
          url: '/_next/static/media/f10b8e9d91f3edcb-s.woff2',
          revision: '63af7d5e18e585fad8d0220e5d551da1',
        },
        {
          url: '/_next/static/media/faac4ac11aa3d97b-s.woff2',
          revision: '9cb88d5b1ed3ff5796eefc9e62af1b8e',
        },
        { url: '/file.svg', revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71' },
        { url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
        { url: '/icons/icon-512x512.png', revision: 'd41d8cd98f00b204e9800998ecf8427e' },
        { url: '/images/ferrari-f8.png', revision: 'f785ef63b02754ef5cbe79f805361deb' },
        { url: '/images/luxury-villa.png', revision: '0a9ac43df89e7982e3b3436f82a55c92' },
        { url: '/images/rolex-daytona.png', revision: 'f4c7ff5a85f6a8b2f6f53fc58a72eff7' },
        { url: '/manifest.json', revision: 'd03a35f059853d9dd04635dea1a1535e' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/placeholder-raffle.jpg', revision: 'd41d8cd98f00b204e9800998ecf8427e' },
        { url: '/vercel.svg', revision: 'c0af2f507b369b085b35ef4bbe3bcf1e' },
        { url: '/window.svg', revision: 'a2760511c65806022ad20adf74370ff3' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: a, event: s, state: i }) =>
              a && 'opaqueredirect' === a.type
                ? new Response(a.body, { status: 200, statusText: 'OK', headers: a.headers })
                : a,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith('/api/auth/') && !!a.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    );
});
