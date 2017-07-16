/*jshint esversion: 6 */
/* jshint node: true */

"use strict";

class RenderView {
    render(data) {
        console.log(data);
        const MOUNT_POINT = document.getElementById("mountPoint");
        MOUNT_POINT.innerHTML = this.template(data);
    }

    template(data) {
        const PRETTY_PAGE_DATA = JSON.stringify(data.pageData, null, 4);
        return `
            <div id="renderedData">
                <div id="hydraLinks">
                    <a href="${data.hydraLink}" target="_blank">Direct Hydra Link</a>
                    <a href="${data.localLink}" target="_blank">Local Context Link</a>
                </div>
                <heading>Page Data:</heading>
                <pre id="pageData">${PRETTY_PAGE_DATA}</pre>
            </div>
        `
    }
}

export let renderView = new RenderView();