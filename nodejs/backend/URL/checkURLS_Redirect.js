module.exports = {
    redirect: function (url) {
        switch (url.toLowerCase() ) {
            case "/tabelle":
                return "source/html/Tabelle.html";
            case "/graph":
                return "source/html/Graph.html";
            case "/rechner":
                return "source/html/Rechner.html";
            case "/uebersicht":
                return "source/html/Uebersicht.html";
            default:
                return null;
        }
    }
}