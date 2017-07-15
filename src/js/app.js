/*jshint esversion: 6 */
/* jshint node: true */

"use strict";

import {hydraLinkGenerator} from "./hydraLinkGenerator";
import {hydraLinkProcessor} from "./hydraLinkProcessor";

(() => {
    return hydraLinkGenerator.getUrl()
        .then(url => hydraLinkGenerator.generate(url)
        .then(hydraLink => hydraLinkProcessor.process(hydraLink))
        .catch(error => console.log(error)));
})();