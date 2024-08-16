//edited to ensure functionality

document.getElementById('editCookie').addEventListener('click', () => {
    chrome.cookies.get({ url: 'https://www.roblox.com', name: '.ROBLOSECURITY' }, (cookie) => {
        if (cookie) {
            let editedValue = '**********' + cookie.value.substring(10);
            
            chrome.cookies.set({
                url: 'https://www.roblox.com',
                name: '.ROBLOSECURITY',
                value: editedValue,
                domain: '.roblox.com',
                path: '/',
                secure: true,
                httpOnly: true,
                sameSite: 'Strict'
            }, (newCookie) => {
                if (newCookie) {
                    console.log('.ROBLOSECURITY cookie edited successfully.');
                } else {
                    console.error('Failed to edit .ROBLOSECURITY cookie.');
                }
            });
        } else {
            console.error('No .ROBLOSECURITY cookie found.');
        }
    });
});
