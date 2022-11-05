function register () {
    let username = document.getElementById("usernameInput").value;
    let password = document.getElementById("passwordInput").value;
    let kmli = document.getElementById("keepmeloggedin")

    if (username == "" || password == "") {
        window.alert("Bitte gib einen Nutzernamen und ein Passwort ein!");
        return;
    }
    createBasicJSONElement(username, password);
    opener.location.reload(1);
    window.close();
}

window.onunload = function() {
    opener.location.reload(1);
}