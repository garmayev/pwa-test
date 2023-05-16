"use strict";

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                './css/style.css',
                './images/logo512.png',
                './images/logo192.png',
                './images/logo32.png',
                './images/logo16.png',
            ])
        })
    )
});

self.addEventListener("activate", (e) => {
    console.log("Activate");
});

self.addEventListener("fetch", evt => {
    evt.respondWith(
        fetch(evt.request)
            .catch(e => {
                caches.match("./fallback.html")
            })
            .catch(function () {
                return caches.match(evt.request)
            })
    )
})

function showDisconnect() {
    let container = document.getElementById("networkDisconnect");
    if (container.classList.contains("hidden"))
        container.classList.remove("hidden")
}