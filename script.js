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
}
