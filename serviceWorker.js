"use strict";

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open('0.0.1').then((cache) => {
            return cache.addAll([
                // Styles
                './css/style.css',
                './application/css/style.css',
                '//cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css',

                // Images
                './images/logo512.png',
                './images/logo192.png',
                './images/logo32.png',
                './images/logo16.png',
                './images/disconnected.png',

                // Pages
                './application/index.html',
                './fallback.html',

                // Scripts
                '//cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js',
                '//cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js',
                '//unpkg.com/react@18/umd/react.production.min.js',
                '//unpkg.com/react-dom@18/umd/react-dom.production.min.js',
                '//unpkg.com/@babel/standalone/babel.min.js',
                '//code.jquery.com/jquery-3.2.1.slim.min.js',
                './application/js/application.js',
            ])
        })
    )
});

self.addEventListener("activate", (e) => {

});

self.addEventListener("message", ({data}) => {
    console.log(data)
})

self.addEventListener("fetch", evt => {
    evt.respondWith(
        fetch(evt.request)
            .catch(e => {
                return caches.match("./fallback.html")
            })
            .catch(function () {
                return caches.match(evt.request)
            })
    )
})