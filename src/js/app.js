/*jshint esversion: 6 */
/* jshint node: true */

"use strict";

import {hydraLinkGenerator} from "./hydraLinkGenerator";
import {hydraLinkProcessor} from "./hydraLinkProcessor";
import {renderView} from "./renderView";

(() => {
    return hydraLinkGenerator.getUrl()
    .then(url => hydraLinkGenerator.generate(url))
    .then(hydraLink => hydraLinkProcessor.process(hydraLink))
    .then(processedData => renderView.render(processedData))
    .catch(error => {
        console.log(error);
        renderView.error(error);
    });
})();