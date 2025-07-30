<script lang="ts">
    import {onMount} from 'svelte';
    import {storage} from '#imports';

    let token: string = $state('');
    let status: string = $state('');
    let show_mellowtel_explanation: boolean = $state(false);

    const saveChanges = () => {
        storage.setItem("sync:api_token", token).then(() => {
            status = 'Changes saved successfully!';
            setTimeout(() => {
                status = '';
            }, 3000);
        }).catch((error) => {
            status = `Error saving changes: ${error.message}`;
            setTimeout(() => {
                status = '';
            }, 3000);
        });
    };

    onMount(() => {
        storage.getItem("sync:api_token").then((value) => {
                token = value;
            }
        )
    });
</script>

<div id="content" class="container mx-auto p-4 bg-gray-100 rounded shadow-md">
    <h3 class="text-xl font-bold mb-4">Options</h3>
    <label class="block mb-2 font-medium">Bit.ly token:</label>
    <input type="text" bind:value={token} size="30" class="border border-gray-300 rounded p-2 w-full mb-1"/>
    <p class="text-xs text-gray-600 mb-4">
        You need to make a new generic token. Go to settings > Advanced Settings > API support > API support > Generic
        Access Tokens.
    </p>
    <button onclick={() => {saveChanges()}} class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save changes
    </button>
    {#if status}
        <p class="mt-2 text-sm {status.includes('Error') ? 'text-red-500' : 'text-green-500'}">{status}</p>
    {/if}

    <div class="mt-8">
        <h2 class="text-lg font-semibold mb-2">Support this plugin</h2>
        <p class="text-sm text-gray-600 mb-4">Because this plugin is in no way affiliated with Bit.ly, this plugin is
            made in my free time. Do you like the extension show some ❤️ so i can keep supporting the extension</p>
        <h3>Make a small donation:</h3>
        <div class="flex gap-2">
            <a class="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-white" href="https://www.paypal.com/donate/?hosted_button_id=WXRGJYDU37UCY">PayPal</a>
        </div>
        <div class="flex items-center">
            <label for="support" class="mr-2">Support using <a href="https://www.mellowtel.com/"
                                                                     class="text-blue-500 underline">mellowtell</a></label>
            <input type="checkbox" id="support" name="support" checked class="form-checkbox h-5 w-5 text-blue-500">

        </div>
        <h4 onclick={() => {show_mellowtel_explanation = !show_mellowtel_explanation}}>Show more info </h4>
        {#if show_mellowtel_explanation}
        <div>
            Mellowtel is an open-source library that lets you share your unused internet with trusted AI labs & startups who use it to train their models. The developer of this extension gets a small share of the revenue. It helps maintain this extension free and available. Mellowtel shares your bandwidth only. Security and privacy are 100% guaranteed. It doesn't collect, share, or sell personal information (not even anonymized data).
        </div>
        {/if}
    </div>
</div>
