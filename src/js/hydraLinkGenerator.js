/*jshint esversion: 6 */
/* jshint node: true */

"use strict";

class HydraLinkGenerator {
    generate(url) {
        return this.sendRequest(url).then(DOMString => {
            return this.getHref(DOMString);
        }).catch(error => {
            console.log(error); throw new Error(error);
        });
    }

    sendRequest(url) {
        return new Promise((resolve, reject) => {
            if (!window.XMLHttpRequest) {
                throw new Error(`This browser does not support XMLHttpRequest`);
            }
            const XHR = new XMLHttpRequest();
            XHR.open("GET", url);
            XHR.onload = () => resolve(XHR.responseText);
            XHR.onerror = () => reject(`AJAX call failed with error ${XHR.status}: ${XHR.statusText}`);
            XHR.send();
        })
    }

    getUrl() {
        return new Promise((resolve, reject) => {
            return chrome.tabs.query({"active": true, "lastFocusedWindow": true}, tabs => {
                return tabs[0].url ? resolve(`${tabs[0].url}?debug`) : reject(`chrome api did not find a tab`);
            });
        });
    }

    getHref(DOMString) {
        let nodeList = document.createElement("html");
        nodeList.innerHTML = DOMString;
        return nodeList.querySelector("a").href;
    }
}

export let hydraLinkGenerator = new HydraLinkGenerator();
