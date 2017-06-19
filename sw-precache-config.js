module.exports = {
    navigateFallback: '/index.html',
    stripPrefix: './dist/',
    root: './dist/',
    staticFileGlobs: [
        './dist/index.html',
        './dist/**.js',
        './dist/**.css',
        './dist/**/**.jpg'
    ],
    options: {
        cache: {
            maximumFileSizeToCacheInBytes: 8388608
        }
    },
    runtimeCaching: [{
        urlPattern: /^https:\/\/fonts.googleapis.com\/.*/,
        handler: 'cacheFirst'
    }]
};