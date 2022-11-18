module.exports = {
    redirect: function (url) {
        switch (url.toLowerCase() ) {
            case "/tabelle":
                return "nodejs/source/html/Tabelle.html";
            case "/graph":
                return "nodejs/source/html/Graph.html";
            case "/rechner":
                return "nodejs/source/html/Rechner.html";
            case "/uebersicht":
                return "nodejs/source/html/Uebersicht.html";
            case "/meine%20daten":
                return "nodejs/source/html/MeineDaten.html";
            case "/daten%20loeschen":
                return "nodejs/source/html/DatenLoeschen.html";
            case "/login":
                return "nodejs/source/html/login/login.html";
            case "/register":
                return "nodejs/source/html/login/register.html";
            case "/registrieren":
                return "nodejs/source/html/login/register.html";
            default:
                return null;
        }
    }
}