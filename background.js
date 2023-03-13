showOptions();

function getVersion() {
    var details = chrome.app.getDetails();
    return parseFloat(details.version);
}

function showOptions() {

    if ((localStorage['version'] == undefined) || (localStorage['version'] < getVersion())) {
        localStorage['version'] = getVersion();
        chrome.tabs.create({
            url: "options.html"
        });
    }
}

function copyToClipboard(text) {
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
}

function rawurlencode(str) {
    str = (str + '')
        .toString();
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
}

chrome.contextMenus.create({
    "title": "Shorten selection and copy to clipboard",
    "contexts": ["selection"],
    "onclick": function(info, tab) {
        shorten(info.selectionText, null);
    }
});

chrome.contextMenus.create({
    "title": "Shorten link and copy to clipboard",
    "contexts": ["link"],
    "onclick": function(info, tab) {
        shorten(info.linkUrl, null);
    }
});

function shorten(text, returnResult) {
    if (text == "")
        return;

    copyToClipboard('Shortening, please wait a while...');

    if (localStorage['token'] == undefined)
        localStorage['token'] = "R_d47629726a6c43e6858f49eb7120a2c6";

    if ((localStorage['ssl'] == undefined) || (localStorage['ssl'] == 0)) {
        var protocol = "http";
    } else {
        var protocol = "https";
    }

    var request = new XMLHttpRequest();
    var url = 'https://api-ssl.bitly.com/v3/shorten?access_token=' + localStorage['token'] + '&longUrl=' + rawurlencode(text) + '&format=txt';

    request.open("GET", url, true);
    request.send(null);

    request.onload = function() {
        var result = request.responseText;
        returnResult(request.responseText);
        copyToClipboard(request.responseText)
        // if(result.substr(0, 4) == "http") {
        // 	copyToClipboard(request.responseText);

        // 	if(returnResult != undefined)
        // 		returnResult(request.responseText);
        // }
        // else {
        // 	var errorMessage = 'Failed shortening a link! Please check your settings.';
        // 	copyToClipboard('Error');

        // 	if(returnResult != undefined) {
        // 		returnResult(errorMessage);
        // 	}
        // 	else {
        // 		alert(errorMessage);
        // 	}
        // }
    }


}
Source code and support at http