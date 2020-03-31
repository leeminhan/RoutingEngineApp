// Define your configuration
const config = require('../containers/Config');

let options = {
    rainbow: {
        host: "sandbox"
    },
    credentials: {
        login: "minhan.lmh@gmail.com", // To replace by your developer credendials
        password: "Sutd@1234" // To replace by your developer credentials
    },
    // Application identifier
    application: {
        appID: config.applicationID,
        appSecret: config.applicationSecret
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