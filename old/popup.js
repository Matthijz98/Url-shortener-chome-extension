chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, function(tabs) {
    // and use that tab to fill in out title and url
    var tab = tabs[0];
    var tabLink = tab.url;
    var bkg = chrome.extension.getBackgroundPage();

    var result = document.getElementById('result');
    result.innerHTML = 'Shortening, please wait a while...';

    bkg.shorten(tabLink, function(msg) {
        result.innerHTML = '<b>' + msg + "</b><br/>(link copied to the clipboard)";
    });
});