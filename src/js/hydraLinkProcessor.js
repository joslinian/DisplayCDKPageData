/*jshint esversion: 6 */
/* jshint node: true */

"use strict";

import queryString from "querystring";

class HydraLinkProcessor {
    process(hydraLink) {
        return {
            hydraLink: hydraLink,
            localLink: this.localLink(hydraLink),
            layerLink: this.layerLink(hydraLink),
            pageData: this.parseHydraLink(hydraLink)
        };
    }

    localLink(hydraLink) {
        let routeIdx = hydraLink.indexOf("/route/");
        let route = hydraLink.substring(routeIdx);
        return `localhost:8082${route}`;
    }

    layerLink(hydraLink) {
        return hydraLink.replace("base-view/consumer", "base-layer/page");
    }

    parseHydraLink(hydraLink) {
        let decodedData = decodeURIComponent(hydraLink);
        let payload = decodedData.substr(decodedData.indexOf(this.getSearchString(hydraLink)));
        let sanitizedPayload = this.sanitizePayload(payload);
        let depthlessObject = queryString.parse(sanitizedPayload);
        let parsedObject = {};

        for(let key of Object.keys(depthlessObject)) {
            parsedObject[key] = this.catchMalformedJSONParse(depthlessObject[key]);
        }
        return parsedObject;
    }

    sanitizePayload(payload) {
        //This handles an edge-case where the delimiters "=" or "&" are part of some string which is not a query parameter.
        const blacklist = ["debug=","&pageName="];
        for(let string of blacklist) {
            payload = payload.replace(string, "");
        }
        return payload;
    }


    catchMalformedJSONParse(JSONData) {
        const JSON_DATA_TYPE = typeof JSONData;

        if(JSON_DATA_TYPE === "object") {
            return JSONData;
        }
        if(JSON_DATA_TYPE !== "object" && JSON_DATA_TYPE !== "string") {
            return `This data has the invalid type: ${JSON_DATA_TYPE}`;
        }

        try {JSON.parse(JSONData);} catch(e) {return JSONData;}
        return JSON.parse(JSONData);
    }

    getSearchString(hydraLink) {
        return hydraLink.indexOf("?search") > -1 ? "?search" : "&search";
    }

    isObjectEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

}

export let hydraLinkProcessor = new HydraLinkProcessor();