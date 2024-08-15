document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('cookieToggle');

    // Load the saved state of the toggle
    chrome.storage.local.get('toggleState', (data) => {
        toggle.checked = data.toggleState || false;
    });

    toggle.addEventListener('change', () => {
        const toggleState = toggle.checked;

        chrome.storage.local.set({ toggleState });

        if (toggleState) {
            // Modify cookie
            chrome.runtime.sendMessage({ action: "toggleCookie" }, (response) => {
                console.log(response.status);
            });
        } else {
            // Restore original cookie
            chrome.runtime.sendMessage({ action: "restoreCookie" }, (response) => {
                console.log(response.status);
            });
        }
    });
});