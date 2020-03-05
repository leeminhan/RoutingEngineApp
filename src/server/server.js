const express = require('express');
const rainbowSDK = require('rainbow-node-sdk')

const app = express();

// Managing User & Guests

// Create accounts on rbw CLI first 
// Admins Service
// IM Service


// Start the SDK
rainbowSDK.start().then(() => {
    // Do something when the SDK is connected to Rainbow
    // ... 
});




app.listen(8000, function() {
    console.log('App running on port 8000');
});

module.exports = app;
