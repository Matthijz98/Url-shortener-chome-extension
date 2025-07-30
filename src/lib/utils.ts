import {storage} from "#imports";
import {browser} from "wxt/browser";

export function injectedFunction(text: string) {
    const input = document.createElement('textarea');
    document.body.appendChild(input);
    input.value = text;
    input.focus();
    input.select();
    document.execCommand('copy');
    input.remove();
}

export function getCurrentTab(): any {
    const queryOptions = {};
    browser.tabs.query(queryOptions).then((tabs) => {
        return tabs[0];
    });
}

export function copyToClipboard(text: string, tab: any) {
    if (tab.id) {
        browser.scripting.executeScript({
            target: {tabId: tab.id},
            args: [text],
            func: injectedFunction,
        });
    }
}


export async function shorten(url: string): Promise<string> {
    if (url === "") return "";

    const token = await storage.getItem("sync:api_token");

    if (!token) {
        throw new Error("API token is not set. Please configure it in the options page.");
    }

    const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ long_url: url, domain: "bit.ly" }),
    });

    if (!response.ok) {
        throw new Error(`Failed to shorten URL: ${response.statusText}`);
    }

    const data = await response.json();
    return data.link;
}