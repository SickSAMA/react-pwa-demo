/*eslint-disable */

self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.core.setCacheNameDetails({
  prefix: 'react-pwa-demo',
  suffix: 'v1',
  precache: 'install-time',
  runtime: 'run-time',
  googleAnalytics: 'ga',
});

// active new service worker as long as it's installed
workbox.clientsClaim();
workbox.skipWaiting();

// suppress warnings if revision is not provided
workbox.precaching.suppressWarnings();

// precahce and route asserts built by webpack
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// return app shell for all navigation requests
workbox.routing.registerNavigationRoute('/app-shell');

// routing for api
workbox.routing.registerRoute(
  /^https:\/\/dog\.ceo/i,
  workbox.strategies.networkFirst({
    cacheName: 'react-pwa-demo-api-cache'
  })
);

// routing for cloud served images
workbox.routing.registerRoute(
  /^https:\/\/.+\.(jpe?g|png|gif|svg)$/i,
  workbox.strategies.cacheFirst({
    cacheName: 'react-pwa-demo-image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Only cache requests for a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
        // Only cache 20 requests.
        maxEntries: 20
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

/*eslint-enable */
