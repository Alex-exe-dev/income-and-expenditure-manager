function toggleUIMode() {
    if(localStorage.getItem("darkMode") == null) localStorage.setItem("darkMode", false);
    else if(localStorage.getItem("darkMode") == "true") localStorage.setItem("darkMode", false);
    else if(localStorage.getItem("darkMode") == "false") localStorage.setItem("darkMode", true);
    var body = document.body;
    body.classList.toggle("light-mode");
    
}