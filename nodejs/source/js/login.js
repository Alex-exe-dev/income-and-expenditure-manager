function login() {
    let username = document.getElementById("usernameInput").value;
    let password = document.getElementById("passwordInput").value;
    let kmli = document.getElementById("keepmeloggedin").checked;
    if (username == "" || password == "") {
        loginError(0);
    } else {
        var request = new XMLHttpRequest();
        request.open("GET", "https://localhost:80/requestAPI?action=login&username=" + username + "&key=" + password + "&kmli=" + kmli);
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                checkResult(this);
            } else if (this.readyState == 4) checkResult(this)
        }
        request.send();
    }
}

function checkResult(response) {
    console.log(response.responseText)
    switch (response.responseText) {
        case "200":
            storeData(document.getElementById("usernameInput").value, document.getElementById('keepmeloggedin'));
            break;
        case "401":
            loginError(1);
            break;
        case "404":
            loginError(2);
            break;
        case "invalidIp":
            window.open("https://localhost:80/source/html/login/loginCodeVerification.html", "_self")
            break;
        default:
            loginError(4545435);
            break;
    } 
}

function storeData(username, keepLoggedIn) {
    if (keepLoggedIn) {
        localStorage.setItem("username", username)
    } else {
        sessionStorage.setItem("username", username)
    }
    window.close();
}

function loginError(errorNumber) {
    let anzeige = document.getElementById("loginError");
    switch (errorNumber) {
        case 0:
            anzeige.innerHTML = "Ungenügende Anmeldedaten!";
            setTimeout(function () {anzeige.innerHTML = "";}, 5000);
            break;
        case 1:
            anzeige.innerHTML = "Ungültige Anmeldedaten!";
            setTimeout(function () {anzeige.innerHTML = "";}, 5000);
            break;
        case 2:
            anzeige.innerHTML = "Benutzername nicht vergeben!";
            setTimeout(function () {anzeige.innerHTML = "";}, 5000);
            break;
        default:
            anzeige.innerHTML = "Unbekannter Fehler!";
            setTimeout(function() {anzeige.innerHTML = "";}, 5000);
            break;
    }
}

function register() {
    window.open("register.html", "REGISTER", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=450,height=550");
    window.close();
}

//#####################################################################Code verification zone###########################################