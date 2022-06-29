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
            default:
                return null;
        }
    }
}