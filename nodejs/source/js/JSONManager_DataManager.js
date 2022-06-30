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

    console.log(loadData())
}

function loadData() {
    if (localStorage.getItem("jsonData") == null) return false;
    return JSON.parse(localStorage.getItem("jsonData"))
}

function createBasicJSONElement() {
    if (localStorage.getItem("jsonData") != null) return;
    const jsonData = {
        balance: 0,
        accountCreation: 0,
        name: "",
        prename: "",
        history: 
            [
                {
                date: 0,
                value: 0,
                reason: "Account creation",
                }
            ],
        calculatorhistory: 
            [
            ]
    };
    jsonData.accountCreation = new Date().toLocaleString();
    jsonData.history[0]["date"] = new Date().toLocaleString();

    localStorage.setItem("jsonData", JSON.stringify(jsonData))
}
