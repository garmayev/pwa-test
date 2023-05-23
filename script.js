const divInstall = document.getElementById("installContainer");
const butInstall = document.getElementById("butInstall");
let deferredPrompt;
/* Put code here */

localStorage.setItem("install", "0")

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
});

if (butInstall) {
    butInstall.addEventListener('click', async () => {
        if (deferredPrompt !== undefined) {
            console.log(deferredPrompt)
            deferredPrompt.prompt();
            const {outcome} = await deferredPrompt.userChoice;

            if (outcome === "accepted") {
                window.localStorage.setItem("install", "1");
            }
        }
        deferredPrompt = undefined;
    });
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/serviceWorker.js");
    navigator.serviceWorker.ready.then((registration) => {
        registration.active.postMessage(
            "Test message sent immediately after creation"
        );
    });
}

function checkNotificationSupported() {
    return new Promise((fulfilled, reject) => {
        if (!('serviceWorker' in navigator)) {
            reject(new Error('Service workers are not supported by this browser'));
            return;
        }

        if (!('PushManager' in window)) {
            reject(new Error('Push notifications are not supported by this browser'));
            return;
        }

        if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
            reject(new Error('Notifications are not supported by this browser'));
            return;
        }

        fulfilled();
    })
}

function checkNotificationPermission() {
    return new Promise((fulfilled, reject) => {
        if (Notification.permission === 'denied') {
            return reject(new Error('Push messages are blocked.'));
        }
        if (Notification.permission === 'granted') {
            return fulfilled();
        }
        if (Notification.permission === 'default') {
            return Notification.requestPermission().then(result => {
                if (result !== 'granted') {
                    reject(new Error('Bad permission result'));
                } else {
                    fulfilled();
                }
            });
        }
        return reject(new Error('Unknown permission'));
    });
}

document.addEventListener('DOMContentLoaded', documentLoadHandler);


function documentLoadHandler() {
    checkNotificationSupported()
        .then(() => {
                setTimeout(() => {
                    navigator.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(window.applicationServerKey),
                    })
                        .then(successSubscriptionHandler, errorSubscriptionHandler)
                }, 10000);
            },
            console.error
        );
}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function errorSubscriptionHandler(err) {
    if (Notification.permission === 'denied') {
        console.warn('Notifications are denied by the user.');
    } else {
        console.error('Impossible to subscribe to push notifications', err);
    }
}

function successSubscriptionHandler(subscriptionData) {
    const key = subscription.getKey('p256dh');
    const token = subscription.getKey('auth');
    const contentEncoding = (PushManager.supportedContentEncodings || ['aesgcm'])[0];
    const body = new FormData();

    body.set('endpoint', subscription.endpoint);
    body.set('publicKey', key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null);
    body.set('authToken', token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null);
    body.set('contentEncoding', contentEncoding);

    return fetch('src/push_subscription.php', {
        method,
        body,
    }).then(() => subscription);
}
