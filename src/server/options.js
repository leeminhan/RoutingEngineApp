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

module.exports = options