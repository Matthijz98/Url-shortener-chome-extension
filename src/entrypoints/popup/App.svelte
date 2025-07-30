<script lang="ts">
    import {browser} from 'wxt/browser';
    import {onMount} from 'svelte';
    import {copyToClipboard, shorten} from "@/lib/utils";

    let result: string = '';
    let status: string = 'Shortening, please wait a while...';

    onMount(async () => {
        try {
            const tabs = await browser.tabs.query({active: true, currentWindow: true});
            if (tabs.length === 0 || !tabs[0].url) {
                throw new Error('No active tab with a valid URL found.');
            }

            const tab = tabs[0];
            const tabLink: string = tab.url;
            status = `Shortening ${tabLink}...`;

            const shortUrl = await shorten(tabLink);
            result = shortUrl;
            status = 'Shortened URL successfully! Copied to clipboard.';

            await copyToClipboard(result, tab);
        } catch (error) {
            status = error instanceof Error ? error.message : 'An unknown error occurred.';
            result = '';
        }
    });
</script>

<div class="text-sm text-center p-2">
    <h1 class="pb-1">{status}</h1>
    {#if result}
        <a href="{result}" target="_blank" class="text-blue-500 underline">{result}</a>
    {/if}
</div>
