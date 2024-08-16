*current version: 1.1*

# RoVPN
The Chrome Extension to hide your Roblox cookies from hackers!

Open source and your cookies stay on your device!

Stop being afraid of links!

In one click, your .ROBLOSECURITY cookie is hidden from everyone!

This extension does not communicate with any outside sources. The only place your cookies will be stored is on your personal device.

This is supposed to HELP guard your cookies and there is no guarantee it will work.

You can always check your cookies before and after enabling this extension to see if the hash has changed or not.

    // Get all cookies and check for the specific cookie
    var allCookies = getAllCookies();
    if (allCookies['.ROBLOSECURITY']) {
      console.log('.ROBLOSECURITY cookie has been found! value = ' + allCookies['.ROBLOSECURITY']);
    }

Running the above script in dev console (in inspect element) will display your exact cookie hash so you can compare before and after to assure correct functionality.
