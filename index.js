class GetPageData {
    constructor() {
        $.ajax({
            url: "http://www.lexusofsacramento.com/LexusOffers_D",
            data: "debug",
            error: (x, s, e) => console.log(`error: ${x} failed with ${e} ... error object: ${e}`),
            success: data => {
                let parsedData = $.parseHTML(data);
                let hydraLinkNode = parsedData.find(node => {
                    return node.childNodes[0] && node.childNodes[0].href;
                });
                let dataString = hydraLinkNode.childNodes[0].href;
                console.log(dataString);
            }
        });
    }
};

new GetPageData();