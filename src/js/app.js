/*jshint esversion: 6 */
/* jshint node: true */

"use strict";

import {hydraLinkGenerator} from "./getHydraLink";

(() => {
    let App = this;

        App.init = function() {

        };


}).init();

hydraLinkGenerator.getUrl().then(url => {
    return hydraLinkGenerator.process(url);
}).then(hydraLink => {
    console.log(hydraLink);
}).catch(error => {
    console.log(error);
});