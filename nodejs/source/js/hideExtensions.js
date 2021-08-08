
window.onload = function () {
    if (document.title == "Startseite") {
        window.history.pushState("Index", document.title, "/");
    } else if (document.title == "Übersicht") {
        window.history.pushState("Uebersicht", document.title, "/Uebersicht")
    } else {
        window.history.pushState("TestString", document.title, "/" + document.title)
    }
}



window.onunload = function () {
    window.history.pushState("Hi", document.title, "/");
}