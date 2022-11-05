function login() {
    let username = document.getElementById("usernameInput").value;
    let password = document.getElementById("passwordInput").value;
    let kmli = document.getElementById("keepmeloggedin").checked;

}

function storeData(username, keepLoggedIn) {
    if (keepLoggedIn) {
        localStorage.setItem("username", username)
    } else {
        sessionStorage.setItem("username", username)
    }
    window.close();
}


function register() {
    window.close();
    window.open("/nodejs/source/html/login/register.html", "REGISTER", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=450,height=550");
    
}

//#####################################################################Code verification zone###########################################