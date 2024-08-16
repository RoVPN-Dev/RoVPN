const COOKIE_NAME = ".ROBLOSECURITY";
const COOKIE_DOMAIN = ".roblox.com";
const STORAGE_KEY = "originalRobloxCookie";

// Function to get the .ROBLOSECURITY cookie
function getRobloxSecurityCookie(callback) {
    chrome.cookies.get({ url: "https://www.roblox.com", name: COOKIE_NAME }, (cookie) => {
        callback(cookie ? cookie.value : null);
    });
}

// Function to save the original cookie value
function saveOriginalCookie(cookieValue) {
    chrome.storage.local.set({ [STORAGE_KEY]: cookieValue }, () => {
        console.log('Cookie saved:', cookieValue);
    });
}

// Function to retrieve the saved cookie value
function getSavedCookie(callback) {
    chrome.storage.local.get([STORAGE_KEY], (data) => {
        callback(data[STORAGE_KEY] || null);
    });
}

// Function to modify the cookie value
function modifyCookie(cookieValue) {
    if (cookieValue.length >= 10) {
        return '1111111111' + cookieValue.slice(10);
    }
    return null;
}

// Function to set the modified .ROBLOSECURITY cookie
function setRobloxSecurityCookie(newValue) {
    chrome.cookies.set({
        url: "https://www.roblox.com",
        name: COOKIE_NAME,
        value: newValue,
        domain: COOKIE_DOMAIN,
        path: '/',
        secure: true,
        httpOnly: true
    }, (cookie) => {
        console.log('Cookie set:', cookie);
    });
}

// Listens for messages from the popup to toggle or restore the cookie
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleCookie") {
        getRobloxSecurityCookie((originalCookie) => {
            if (originalCookie) {
                saveOriginalCookie(originalCookie);
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
    return true;
});