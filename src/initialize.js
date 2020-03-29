import rainbowSDK from 'rainbow-web-sdk';
import config from './containers/Config';

const initialize = () => {
    var onReady = function onReady() {
        console.log('[Hello World] :: On SDK Ready !');
    };
    
    var onLoaded = function onLoaded() {
        console.log('[Hello World] :: On SDK Loaded !');
    
        rainbowSDK
            .initialize(config.applicationID, config.applicationSecret)
            .then(() => {
                console.log('[Hello World] :: Rainbow SDK is initialized!');
            })
            .catch(err => {
                console.log('[Hello World] :: Something went wrong with the SDK.', err);
            });
    };
    
    document.addEventListener(rainbowSDK.RAINBOW_ONREADY, onReady);
    document.addEventListener(rainbowSDK.RAINBOW_ONLOADED, onLoaded);
    
    rainbowSDK.start();
    rainbowSDK.load();
}

export default initialize;