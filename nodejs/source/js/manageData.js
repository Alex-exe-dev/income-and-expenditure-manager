//import * as jsonManager from './JSONManager_DataManager.js';

var currentElement = 0;
var loading = false;

function addTableElement(date, reason, value, load) {
    if (date == null && reason == null && value == null && load == false) {
        var date = document.getElementById("date").value
        var reason = "n/A"
        var value =  document.getElementById("value").value
    }
    var scroller = document.getElementById('tableScroller')



    var newElement = document.createElement('tr')
    var newElementValue = document.createElement('td')
    var newElementReason = document.createElement('td')
    var newElementDate = document.createElement('td')

    //create one element for each value(date and time)
    newElementValue.setAttribute("id", currentElement)
    newElementReason.setAttribute("id", currentElement)
    newElementReason.setAttribute("class", "reason defaultText")
    newElementDate.setAttribute("id", currentElement)

    //check if values are empty
    if (value == "" || date == "") {
        window.alert("Bitte gib einen Geldbetrag und ein gültiges Datum an!")
        return;
    } else {
        document.getElementById("value").value = ""
        currentElement++
    }

    //change color if positive or negativ
    if (value > 0) {
        newElementValue.setAttribute("class", "plus value")
    } else if (value < 0) {
        newElementValue.setAttribute("class", "minus value")
    } else {
        newElementValue.setAttribute("class", "value")
    }

    newElementDate.innerHTML = "<td>" + date + "</td>"
    newElementReason.innerHTML = "<td>" + reason + "</td>" 
    newElementValue.innerHTML = "<td>" + value + "</td>"

    //create a singel table entry to align everything correct
    newElement.appendChild(newElementDate)
    newElement.appendChild(newElementReason)
    newElement.appendChild(newElementValue)
    scroller.insertBefore(newElement, scroller.childNodes[0])

    addData(date, reason, value, false)
}



//#####################################################EXPORT ZONE#####################
function exportAndDownloadFile() {
    /*
    for (var i = 0; i <= 1000; i++) {
        XMLRequest('get', 'Hallo123', '456789', "na", "na", "na", dataCollector, i);
    }
    */
    if (localStorage.getItem('data') != null) {
        var exptData = localStorage.getItem('data');
        console.log(exptData);

        //Create Element to click for download
        var exptElement = document.createElement('a');
        exptElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(exptData));
        exptElement.setAttribute('download', 'exportEUAR-Data');
        exptElement.style.display = 'none';

        //add Element to Page, click it and remove it after that
        document.body.appendChild(exptElement);
        exptElement.click();
        document.body.removeChild(exptElement);
    } else {
        window.alert("Es wurden leider keine Daten von Ihnen gefunden!");
        console.log(localStorage.getItem('data'));
        return;
    }

}


