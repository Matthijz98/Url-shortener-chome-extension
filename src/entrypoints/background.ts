import {browser} from 'wxt/browser';
import {copyToClipboard, getCurrentTab, shorten} from "../lib/utils";

export default defineBackground(() => {
    async function contextClick(info: browser.contextMenus.OnClickData) {
        const { menuItemId } = info;

        try {
            if (menuItemId === "create_bitly_form_selection" && info.selectionText) {
                const tabs = await browser.tabs.query({ active: true });
                const shortUrl = await shorten(info.selectionText);
                copyToClipboard(shortUrl, tabs[0]);
            }

            if (menuItemId === "create_bitly_from_link" && info.linkUrl) {

                const tabs = await browser.tabs.query({ active: true });
                const shortUrl = await shorten(info.linkUrl);
                copyToClipboard(shortUrl, tabs[0]);
            }
        } catch (error) {
            console.error("Error during context menu action:", error);
        }
    }

    browser.contextMenus.onClicked.addListener(contextClick);

    browser.runtime.onInstalled.addListener(() => {
        browser.contextMenus.create({
            id: "create_bitly_form_selection",
            title: "Shorten selection and copy to clipboard",
            contexts: ["selection"],
        });

        browser.contextMenus.create({
            id: "create_bitly_from_link",
            title: "Shorten link and copy to clipboard",
            contexts: ["link"],
        });
    });
});