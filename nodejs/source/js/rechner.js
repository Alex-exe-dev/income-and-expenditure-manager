function onClickRechner(number) {

    //Variablen erstellen
    if (typeof onClickRechner.counter == 'undefined') {
        onClickRechner.counter = "";
    }
    if (typeof onClickRechner.lastEntry == 'undefined') {
        onClickRechner.lastEntry = "null";
    }

    //Rechenzeichen richtig darstellen.
 
    if (number == "+" || number == "-" || number == "*" || number == "/") {
        if (onClickRechner.lastEntry == "+" || onClickRechner.lastEntry == "-" || onClickRechner.lastEntry == "*" || onClickRechner.lastEntry == "/") {
            window.alert("Bitte gib nicht zwei Operatoren hintereinander an!")
        } else if (onClickRechner.lastEntry == "null") {
            window.alert("Bitte gib zuerst eine Zahl ein!")
        } else {
            onClickRechner.counter += (" " + number + " ");
            onClickRechner.lastEntry = number;
        }

    } else if (number == "back"){
        onClickRechner.counter = onClickRechner.counter.slice(0, -1)
    } else {
        onClickRechner.counter += number;
        onClickRechner.lastEntry = number;
    }

    //Dinge darstellen
    document.getElementById("rechnerOutputBox").innerHTML = (onClickRechner.counter);
}

function calculate() {
    var anzeigeString = document.getElementById("rechnerOutputBox").innerHTML;
    var ergebniss = eval(anzeigeString);
    document.getElementById("rechnerOutputBox").innerHTML = (anzeigeString + " = " + ergebniss);
    if ((anzeigeString.length) <= 25) {
        document.getElementById("outputHistory").innerHTML += (anzeigeString + " = " + ergebniss + "<br>");
    } else {
        document.getElementById("outputHistory").innerHTML += (ergebniss + "<br>");
    }

}