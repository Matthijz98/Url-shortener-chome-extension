chrome.tabs.getSelected(null, function(tab) {
    var tabLink = tab.url;
    var bkg = chrome.extension.getBackgroundPage();

    var result = document.getElementById('result');
    result.innerHTML = 'Shortening, please wait a while...';

    bkg.shorten(tabLink, function(msg) {
        result.innerHTML = '<b>' + msg + "</b><br/>(link copied to the clipboard)";
    });
});