const divInstall = document.getElementById("installContainer");
const butInstall = document.getElementById("butInstall");
let deferredPrompt;
/* Put code here */

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    // showInstallPromotion();;
    // Optionally, send analytics event that PWA install promo was shown.
    console.log(`'beforeinstallprompt' event was fired.`);
});

window.addEventListener('appinstalled', () => {
    // Hide the app-provided install promotion
    // hideInstallPromotion();
    // Clear the deferredPrompt so it can be garbage collected
    console.log("Installed!!!")
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log('PWA was installed');
});

butInstall.addEventListener('click', async () => {
    console.log("Install?")
    // Hide the app provided install promotion
    // hideInstallPromotion();
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
});

/* Only register a service worker if it's supported */
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/serviceWorker.js");
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === "http:") {
    const requireHTTPS = document.getElementById("requireHTTPS");
    const link = requireHTTPS.querySelector("a");
    link.href = window.location.href.replace("http://", "https://");
    requireHTTPS.classList.remove("hidden");
}

/**
 * Warn the page must not be served in an iframe.
 */
if (window.self !== window.top) {
    const requireTopLevel = document.getElementById("requireTopLevel");
    const link = requireTopLevel.querySelector("a");
    link.href = window.location.href;
    requireTopLevel.classList.remove("hidden");
}
