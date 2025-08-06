chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, function(tabs) {
    // and use that tab to fill in out title and url
    var tab = tabs[0];
    var tabLink = tab.url;

    var result = document.getElementById('result');
    result.innerHTML = 'Shortening, please wait a while...';

    chrome.runtime.sendMessage({
        action: 'shorten',
        url: tabLink
    }, function(response) {
        if (response && response.success) {
            result.innerHTML = '<b>' + response.shortenedUrl + "</b><br/>(link copied to the clipboard)";
        } else {
            result.innerHTML = '<b>Error shortening URL</b>';
        }
    });
});

// Add support settings link functionality
document.addEventListener('DOMContentLoaded', function() {
    const supportSettingsLink = document.getElementById('support-settings');
    if (supportSettingsLink) {
        supportSettingsLink.addEventListener('click', function(e) {
            e.preventDefault();
            chrome.runtime.sendMessage({
                action: 'generateSupportSettings'
            });
        });
    }
});