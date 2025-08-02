import Mellowtel from "mellowtel";
import { CONFIG_KEY } from "./constants";

let mellowtel;

(async () => {
    mellowtel = new Mellowtel(CONFIG_KEY);
    await mellowtel.initBackground();
})();

chrome.runtime.onInstalled.addListener(async function(details) {
    if(details.reason === "update") {
        await mellowtel.generateAndOpenOptInLink();
    }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'shorten') {
        shortenUrl(request.url, sendResponse);
        return true; // Will respond asynchronously
    } else if (request.action === 'generateSupportSettings') {
        generateSupportSettingsLink();
    }
});

chrome.contextMenus.onClicked.addListener(contextClick)

async function getCurrentTab() {
    let queryOptions = {active: true, currentWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function injectedFunction_egrave(text) {
    let input = document.createElement('textarea');
    document.body.appendChild(input);
    input.value = text;
    input.focus();
    input.select();
    document.execCommand("copy");
    input.remove();
}

function copyToClipboard(text) {
    console.log(text);
    getCurrentTab().then(function (tab) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            args: [text],
            function: injectedFunction_egrave
        });
    });
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "id": "create_bitly_form_selection",
        "title": "Shorten selection and copy to clipboard",
        "contexts": ["selection"],
    });

    chrome.contextMenus.create({
        "id": "create_bitly_from_link",
        "title": "Shorten link and copy to clipboard",
        "contexts": ["link"],
    });
});

function contextClick(info) {
    const {menuItemId} = info

    if (menuItemId === 'create_bitly_form_selection') {
        shorten(info['selectionText'])
    }

    if (menuItemId === 'create_bitly_from_link') {
        shorten(info['linkUrl'])
    }
}

function shorten(text) {
    if (text == "")
        return;

    copyToClipboard('Shortening, please wait a while...');

    chrome.storage.sync.get(['token'], function (result) {
        const token = result.token;

        if (token == null) {
            copyToClipboard('Please set your token in the options page');
        }

        fetch('https://api-ssl.bitly.com/v4/shorten', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"long_url": text, "domain": "bit.ly"})
        }).then((data) => {
            data.json().then((json) => {
                copyToClipboard(json.link)
            })
            // send event
            fetch('http://n8n.sliceofbits.com:5678/webhook/2cbbbe27-1e78-43c3-987e-15be5372682f', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"url": text})
            })
        })

    });
}

function shortenUrl(url, sendResponse) {
    if (url == "") {
        sendResponse({success: false, error: 'Empty URL'});
        return;
    }

    chrome.storage.sync.get(['token'], function (result) {
        const token = result.token;

        if (token == null) {
            sendResponse({success: false, error: 'No token set'});
            return;
        }

        fetch('https://api-ssl.bitly.com/v4/shorten', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"long_url": url, "domain": "bit.ly"})
        }).then((data) => {
            data.json().then((json) => {
                copyToClipboard(json.link);
                sendResponse({success: true, shortenedUrl: json.link});
            })
            // send event
            fetch('http://n8n.sliceofbits.com:5678/webhook/2cbbbe27-1e78-43c3-987e-15be5372682f', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"url": url})
            })
        }).catch((error) => {
            console.error('Error shortening URL:', error);
            sendResponse({success: false, error: error.message});
        });

    });
}

async function generateSupportSettingsLink() {
    try {
        const settingsLink = await mellowtel.generateSettingsLink();
        chrome.tabs.create({ url: settingsLink });
    } catch (error) {
        console.error('Error generating support settings link:', error);
    }
}

