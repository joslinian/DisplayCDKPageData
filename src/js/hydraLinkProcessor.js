/*jshint esversion: 6 */
/* jshint node: true */

"use strict";

import queryString from "querystring";

class HydraLinkProcessor {
    process(hydraLink) {
        return {
            hydraLink: hydraLink,
            localLink: this.localLink(hydraLink),
            data: this.parseHydraLink(hydraLink)
        }
    }

    localLink(hydraLink) {
        let routeIdx = hydraLink.indexOf("/route/");
        let route = hydraLink.substring(routeIdx);
        return `localhost:8082${route}`;
    }

    parseHydraLink(hydraLink) {
        let decodedData = decodeURIComponent(hydraLink);
        let payload = decodedData.substr(decodedData.indexOf("?search=")).replace("debug=&pageName=", "");
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
        const blacklist = ["debug=&pageName="];
        for(let string of blacklist) {
            payload = payload.replace(string, "");
        }
        return payload;
    }


    catchMalformedJSONParse(JSONData) {
        try {JSON.parse(JSONData)} catch(e) {return JSONData}
        return JSON.parse(JSONData)
    }

}

export let hydraLinkProcessor = new HydraLinkProcessor();