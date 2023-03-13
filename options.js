document.getElementById("apply-btn")
    .addEventListener("click", function() {
        var token = document.getElementById('token')
            .value;
        var status = document.getElementById('status');

        if (token != "") {
            localStorage['token'] = token;

            var ssl = document.getElementById('ssl')
                .checked;
            if (ssl) {
                localStorage['ssl'] = 1;
            } else {
                localStorage['ssl'] = 0;
            }

            status.innerHTML = "Changes have been saved";
        } else {
            status.innerHTML = "Enter your personal token";
        }
    });

window.addEventListener("load", function() {
    if (localStorage['token'] == undefined)
        localStorage['token'] = "956a50f019f0efde73ccd5781251ae22578b0852";

    if (localStorage['ssl'] == undefined)
        localStorage['ssl'] = 0;

    document.getElementById('token')
        .value = localStorage['token'];
    if (localStorage['ssl'] == 0) {
        document.getElementById('ssl')
            .checked = false;
    } else {
        document.getElementById('ssl')
            .checked = true;
    }
});