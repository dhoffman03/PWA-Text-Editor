const btnInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {

    // Stores triggered events
    window.deferredPrompt = event;

    // Removes hidden class from the button
    btnInstall.classList.toggle('hidden', false);

});

btnInstall.addEventListener('click', async () => {

    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // Shows prompt
    promptEvent.prompt();

    window.deferredPrompt = null;

    btnInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {

    // Clears prompt once app is installed
    window.deferredPrompt = null;
});
