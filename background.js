chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
});

// Function to get the .ROBLOSECURITY cookie
function getRobloxSecurityCookie(callback) {
    chrome.cookies.get({ url: "https://www.roblox.com", name: ".ROBLOSECURITY" }, (cookie) => {
        if (cookie) {
            callback(cookie.value);
        } else {
            callback(null);
        }
    });
}

// Save cookie for later use
function saveCookie(cookieValue) {
    chrome.storage.local.set({ savedCookie: cookieValue }, () => {
        console.log('Cookie saved:', cookieValue);
    });
}

// Retrieve saved cookie
function getSavedCookie(callback) {
    chrome.storage.local.get('savedCookie', (data) => {
        callback(data.savedCookie || null);
    });
}

// Replace first 10 digits of the cookie with '1's
function modifyCookie(cookieValue) {
    if (cookieValue.length >= 10) {
        return '1111111111' + cookieValue.slice(10);
    }
    return null;
}

// Set a new .ROBLOSECURITY cookie
function setRobloxSecurityCookie(newValue) {
    chrome.cookies.set({
        url: "https://www.roblox.com",
        name: ".ROBLOSECURITY",
        value: newValue,
        path: '/',
        secure: true,
        httpOnly: true
    }, (cookie) => {
        console.log('Cookie set:', cookie);
    });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleCookie") {
        getRobloxSecurityCookie((originalCookie) => {
            if (originalCookie) {
                saveCookie(originalCookie);
                const modifiedCookie = modifyCookie(originalCookie);
                setRobloxSecurityCookie(modifiedCookie);
                sendResponse({ status: "Cookie modified and saved." });
            } else {
                sendResponse({ status: "No .ROBLOSECURITY cookie found." });
            }
        });
    } else if (request.action === "restoreCookie") {
        getSavedCookie((savedCookie) => {
            if (savedCookie) {
                setRobloxSecurityCookie(savedCookie);
                sendResponse({ status: "Original cookie restored." });
            } else {
                sendResponse({ status: "No saved cookie found." });
            }
        });
    }
    return true;  // Keep the message channel open for async response
});