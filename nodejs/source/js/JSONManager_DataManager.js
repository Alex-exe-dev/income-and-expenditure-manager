//calc = If data should be stored in Calc history or in balance history
function addData(date, reason, value, calc) {
    const jsonData = loadData();
    if (calc) {
        const add = {
            date: 0,
            calculation: 0
        }
        add.date = date.toLocaleString();
        add.calculation = value;
        jsonData.calculatorhistory.push(add);
    } else {
        const add = {
            date: 0,
            value: 0,
            reason: "n/A"
        }
        add.date = date.toLocaleString();
        add.value = value;
        add.reason = reason;
        jsonData.history.push(add);
    }
    localStorage.setItem("jsonData", JSON.stringify(jsonData));
}

function loadData() {
    if (localStorage.getItem("jsonData") == null) return false;
    return JSON.parse(localStorage.getItem("jsonData"))
}

function createBasicJSONElement(name, password) {
    if (localStorage.getItem("jsonData") != null) return;
    const jsonData = {
        balance: 0,
        accountCreation: 0,
        name: "",
        password: "",
        history: 
            [
                {
                date: 0,
                value: "0",
                reason: "Account creation",
                }
            ],
        calculatorhistory: 
            [
            ]
    };
    jsonData.accountCreation = new Date().toLocaleString();
    jsonData.password = password;
    jsonData.name = name;
    jsonData.history[0]["date"] = new Date().toLocaleString();

    localStorage.setItem("jsonData", JSON.stringify(jsonData))
}

function createJsonFileGraph() {
    if (!(loadData())) return false;
    var jsonData = loadData();
    var balance = "";
    const chartData = {
        type:'line',
        data:{
            labels:[],
            datasets:[{
                label:'Gesamtes Geld',
                data:[],
                backgroundColor:'cyan',
                borderColor:'cyan',
            }]
        },
        options:{
            plugins:{
                title: {
                    display: true,
                    text: 'Gesamter Verlauf',
                    font:{
                        size: 100,
                        family: 'SansitaSwashed'
                    },
                    padding:{
                        top: 50,
                        bottom: 15
                    },
                    color: 'white'
                  }
            }
    
        }
    }
    for(var i = 1; i < jsonData.history.length; i++) {
        balance = eval(balance + " + " + jsonData.history[i].value);
        chartData.data.labels.push(jsonData.history[i].date);
        chartData.data.datasets[0].data.push(balance);
        
    } 
    return chartData;
}

function deleteData() {
    if (!(localStorage.getItem("jsonData"))) {
        window.alert("Es sind keine Daten von Ihnen gespeichert!")
        return;
    }
    localStorage.removeItem("jsonData");
    location.href="./";
    return;
}