const express = require('express');
const RainbowSDK = require('rainbow-node-sdk');
const options = require('./options'); // Import Configurations

const app = express();

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
