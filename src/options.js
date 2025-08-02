document.getElementById("apply-btn")
    .addEventListener("click", function() {
        const token = document.getElementById('token').value;
        const status = document.getElementById('status');

        chrome.storage.sync.set({token: token}, function() {
            status.innerHTML = "Changes have been saved";
        });
    });

window.addEventListener("load", function() {
    chrome.storage.sync.get(['token'], function(result) {
        const token = result.token;
        document.getElementById('token').value = token;
    });
});