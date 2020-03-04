const express = require('express');
const rainbowSDK = require('rainbow-node-sdk')

const app = express();




app.listen(8000, function() {
    console.log('App running on port 8000');
});

module.exports = app;
