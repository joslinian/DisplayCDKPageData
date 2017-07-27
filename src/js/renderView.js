/*jshint esversion: 6 */
/* jshint node: true */

"use strict";

const MOUNT_POINT = document.getElementById("mountPoint");

class RenderView {
    render(data) {
        MOUNT_POINT.innerHTML = this.template(data);
    }

    template(data) {
        const PRETTY_PAGE_DATA = JSON.stringify(data.paramsData, null, 4);
        return `
            <section id="renderedData">
                <h3>Here are some useful dev workflow links:</h3>
                <div id="hydraLinks">
                    <a href="${data.hydraLink}" target="_blank">Direct Hydra Link</a>
                    <a href="${data.harLink}" target="_blank">HAR Data Link</a>
                    <a href="${data.layerLink}" target="_blank">Data Layer Link</a>
                    <a href="${data.localLink}" target="_blank">Local Context Link</a>
                </div>
                <div id="pageData">
                    <h3>Here are the params data I was able to get from this page:</h3>
                    <hr />
                    <pre>ParamsData: ${PRETTY_PAGE_DATA}</pre>
                </div>
            </section>
        `;
    }

    error(error) {
        MOUNT_POINT.innerHTML = this.errorTemplate(error);
    }

    errorTemplate(error) {
        return `
            <section id="errorData">
                <div> 
                    <div>OOPS! ¯\\_(ツ)_/¯ Something went wrong and I got: </div>
                    <br/>
                    <div id="actualError">${error}</div>
                    <br/>
                </div>
               
               <div>Common reasons for errors:</div>
                <ol>
                    <li>Is this a CDK page? If not this is probably a cross origin access issue</li>
                    <li>Are you in local context?</li>
                    <li>Are you in direct hydra context?</li>
                </ol>
                
                <div>If this doesnt solve please consider reporting this error at: {{repo}}</div>
            </section>
        `;
    }
}

export let renderView = new RenderView();