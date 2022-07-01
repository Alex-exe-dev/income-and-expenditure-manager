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
            default:
                return null;
        }
    }
}