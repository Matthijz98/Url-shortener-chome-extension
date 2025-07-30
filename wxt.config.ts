import {defineConfig} from 'wxt';
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
    vite: () => ({
        plugins: [tailwindcss()]
    }),
    srcDir: 'src',
    modules: ['@wxt-dev/module-svelte'],
    manifest: {
        manifest_version: 3,
        name: 'BitLy',
        version: '0.1.2',
        description: 'Shorten links quick and easy',
        background: {
            service_worker: 'entrypoints/background.js',
        },
        options_page: "entrypoints/options/index.html",
        icons: {
            16: 'icon/16.png',
            32: 'icon/32.png',
            48: 'icon/32.png',
            128: 'icon/32.png',
        },
        permissions: [
            'tabs',
            'contextMenus',
            'storage',
            'scripting',
            'declarativeNetRequestWithHostAccess'
        ],
        action: {
            default_icon: 'icon/16.png',
            default_popup: 'entrypoints/popup/index.html',
            default_title: 'Shorten links quick and easy',
        },
        host_permissions: ['*://*/*'],
    },
});
