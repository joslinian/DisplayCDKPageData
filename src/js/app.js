/*jshint esversion: 6 */
/* jshint node: true */

"use strict";

import {hydraLinkGenerator} from "./hydraLinkGenerator";
import {hydraLinkProcessor} from "./hydraLinkProcessor";

(() => {
    return hydraLinkGenerator.getUrl()
    .then(url => hydraLinkGenerator.generate(url)
    .then(hydraLink => console.log(hydraLinkProcessor.process(hydraLink)))
    .catch(error => console.log(error)));
})();

//in package.json add this back just before "-m -o app/js/app.min.js": "[babelify --presets [es2015]] | uglifyjs"