/*jshint esversion: 6 */
/* jshint node: true */

"use strict";

class GetHydraLink {
    constructor() {
        this.ajaxGet(
            "http://www.lexusofsacramento.com/LexusOffers_D?debug",
            data => this.getLink(data),
            error => {throw new Error(`AJAX GET failed because response was ${error}`)}
        );
    }

    ajaxGet(url, success, error) {
        if(!window.XMLHttpRequest) throw new Error(`This browser does not support XMLHttpRequest`);
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if(request.readyState === 4) {
                if(request.status !== 200) {
                    if(error && typeof error === "function") {
                        error(request.responseText);
                    }
                }
                if(success && typeof success === "function") {
                    success(request.responseText);
                }
            }
        };
        request.open("GET", url);
        request.send();
    }

    getLink(data) {
        let nodeList = document.createElement("html");
        nodeList.innerHTML = data;
        let hydraLinkHref = nodeList.querySelector("a").href;
        console.log(hydraLinkHref);
    }
}

new GetHydraLink();