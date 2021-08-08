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
    
    if (load != true) XMLRequest('insert', 'Hallo123', '456789', date, reason, value, getDataLOG, 59);


    //create a singel table entry to align everything correct
    newElement.appendChild(newElementDate)
    newElement.appendChild(newElementReason)
    newElement.appendChild(newElementValue)
    scroller.insertBefore(newElement, scroller.childNodes[0])
}

//Create XMLRequest
function XMLRequest (action, id, key, date, reason, value, cFunction, index) {
    showServerStats(1);
    var request = new XMLHttpRequest();
    if (action == "insert") {
        request.open("GET", "https://localhost:80/requestAPI?action=" + action + "&id=" + id + "&key=" + key + "&date=" + date + "&reason=" + reason + "&value=" + value, true);
    } else if (action == "get"){
        request.open("GET", "https://localhost:80/requestAPI?action=" + action + "&id=" + id + "&key=" + key + "&index=" + index, true)
    }else {
        request.open("GET", "https://localhost:80/requestAPI?action=" + action + "&id=" + id + "&key=" + key, true)
    }
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cFunction(this);
        }
        showServerStats(this.readyState, this.status)
    }
    
    request.send();
    
}

//Load all DataBase Values after site opening
siteOpening();
function siteOpening() {
    loading = true;
    for (var i = 0; i <= 1000; i++) {
        XMLRequest('get', 'Hallo123', '456789', "na", "na", "na", getDataTable, i);     
    }
    setTimeout(function() {loading = false; showServerStats(4, 200);}, 5000)
}

//Callback Function for xmlrequest manages tabellen data
function getDataTable(response) {
    if (typeof getDataTable.index == 'undefined'){ 
        getDataTable.index = 0;
    }else {
        getDataTable.index++;
    }
    if (typeof getDataTable.totalValue == 'undefined') getDataTable.totalValue = 0;


    var data = JSON.parse(response.responseText)
    if (data.length == 0 && getDataTable.index == 1000) {
        localStorage.setItem("totalValue", getDataTable.totalValue);
        getDataTable.index = 0;
        getDataTable.totalValue = 0;
        return;
    } else if (data.length == 0) {
        return;
    }
    var date = data[0].datum;
    var reason = data[0].reason;
    var value = data[0].value;
    getDataTable.totalValue = getDataTable.totalValue + value;
    if (getDataTable.index == 1000) {
        localStorage.setItem("totalValue", getDataTable.totalValue);
        getDataTable.index = 0;
        getDataTable.totalValue = 0;
    }
    addTableElement(date, reason, value, true)
}

function getDataIndex(response) {
    console.log(response.responseText)
}

function getDataLOG(response) {
    console.log(response.responseText)
}

//Serverstatus Funktion
function showServerStats(readyState, status) {
    if (loading == true) {
        readyState = 3;
    }

    try {
        var anzeige = document.getElementById("ServerStatus");
        var text = document.getElementById("ServerStatusText");
        switch (readyState) {
            case 1:
                anzeige.removeAttribute("class", "ready");
                anzeige.setAttribute("class", "connected serverStatus");
                text.innerHTML = "Verbinde....";
                break;
            case 2:
                anzeige.removeAttribute("class", "connected");
                anzeige.setAttribute("class", "request serverStatus");
                text.innerHTML = "Anfrage Empfangen";
                break;

            case 3:
                anzeige.removeAttribute("class", "request");
                anzeige.setAttribute("class", "processing serverStatus");
                text.innerHTML = "Anfrage wird bearbeitet";
                break;
            case 4:
                anzeige.removeAttribute("class", "processing");
                anzeige.setAttribute("class", "ready serverStatus");
                text.innerHTML = "Server Bereit";
                if (status != 200) {
                    anzeige.setAttribute("class", "servererror serverStatus");
                    text.innerHTML = "Unknown Server Error";
                }
                break;
            default:
                anzeige.setAttribute("class", "servererror serverStatus");
                text.innerHTML = "Unknown Server Error";
                console.log("default")
                break;
        }
    } catch {
    }
}



//#####################################################EXPORT ZONE#####################
function exportAndDownloadFile() {
    for (var i = 0; i <= 1000; i++) {
        XMLRequest('get', 'Hallo123', '456789', "na", "na", "na", dataCollector, i);
    }
}

function dataCollector(response) {
    if (typeof dataCollector.exportCache == 'undefined') {
        dataCollector.exportCache = 1; 
    } else dataCollector.exportCache++;
    if (typeof dataCollector.exportData == 'undefined') {
        dataCollector.exportData = '';
    }
    var data = JSON.parse(response.responseText);
    if (data.length == 0 && dataCollector.exportCache <= 1000) {
        return;
    }
    dataCollector.exportData = dataCollector.exportData + JSON.stringify(data) + "\n";
    console.log(dataCollector.exportData)
    
    if (dataCollector.exportCache >= 1001) {
        console.log("exportStarted")
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataCollector.exportData));
        element.setAttribute('download', 'exportEUAR-Data');
        
        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();
  
        document.body.removeChild(element);
        dataCollector.exportCache = 0;
    }
}