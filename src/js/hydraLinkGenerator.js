/*jshint esversion: 6 */
/* jshint node: true */

"use strict";

class HydraLinkGenerator {
    generate(url) {
        return this.ajaxGet(url).then(DOMString => {
            return this.getHref(DOMString);
        }).catch(error => {
            console.log(error); throw new Error(error);
        });
    }

    ajaxGet(url) {
        return new Promise((resolve, reject) => {
            if (!window.XMLHttpRequest) {
                throw new Error(`This browser does not support XMLHttpRequest`);
            }
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(`AJAX call failed with error ${xhr.status}: ${xhr.statusText}`);
            xhr.send();
        })
    }

    getUrl() {
        return new Promise((resolve, reject) => {
            return chrome.tabs.query({"active": true, "lastFocusedWindow": true}, tabs => {
                return tabs[0].url ? resolve(`${tabs[0].url}?debug`) : reject(`No "a" tag detected on this page`);
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
