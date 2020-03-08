const express = require('express');
const RainbowSDK = require('rainbow-node-sdk')

const app = express();

// Define your configuration
let options = {
    rainbow: {
        host: "sandbox"
    },
    credentials: {
        login: "testacc1@gmail.com", // To replace by your developer credendials
        password: "Sutd@1234" // To replace by your developer credentials
    },
    // Application identifier
    application: {
        appID: "be276f0060f911ea9a6dcf004cf8c14e",
        appSecret: "BQZaEc577I0aTMo34piRvCo55caL1afKRuEtkeGNjqRmbwwRYVIWNCxqZ9GkTgD7"
    },
    // Logs options
    logs: {
        enableConsoleLogs: true,
        enableFileLogs: false,
        "color": true,
        "level": 'debug',
        "customLabel": "vincent01",
        "system-dev": {
            "internals": false,
            "http": false,
        }, 
        file: {
            path: "/var/tmp/rainbowsdk/",
            customFileName: "R-SDK-Node-Sample2",
            level: "debug",
            zippedArchive : false/*,
            maxSize : '10m',
            maxFiles : 10 // */
        }
    },
    // IM options
    im: {
        sendReadReceipt: true
    }
};

const rainbow = new RainbowSDK(options);


// Managing User & Guests

// Create accounts on rbw CLI first 
// Admins Service
// IM Service


// 1. Start the SDK
rainbow.start().then(() => {
    // Do something when the SDK is connected to Rainbow
    // ... 
    console.log('Connected to Rainbow')
});


app.listen(8000, function() {
    console.log('App running on port 8000');
});

module.exports = app;
