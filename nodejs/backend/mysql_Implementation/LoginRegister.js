var mysql = require('mysql');
const FileSystem = require('fs');
var path = require('path');
let configPath = path.join(__dirname, "..", "configurationfiles", "config_mysql_loginregister.json")

let  mysqlConfig = JSON.parse(FileSystem.readFileSync(configPath));

module.exports = {
    login: function (username, key, IP, cFunction) {
        var connection = mysql.createConnection(mysqlConfig);

        connection.connect(function(error) {
            if (error) throw error;
            var sqlCommand = "SELECT * FROM userdata WHERE username='" + username + "'";
            connection.query(sqlCommand, function (err, result) {
                if (err) throw err;
                if (result && result.length) {
                    let data = JSON.parse(JSON.stringify(result));
                    if (data[0].passkey == key) {
                        if (!(data[0].loggedIn)) {
                            if (data[0].ip == IP) {
                                cFunction("200", connection) //OK
                            } else {
                                cFunction("invalidIp", connection) //Unauthorized due to IP conflicts
                            }
                        } else cFunction("Anderer Benutzer eingelogged", connection);
                    } else cFunction("401", connection); //Unauthorized
                } else { 
                    cFunction("404", connection); //notfound
                }
            })
        })

    },

    register: function (username, key, email, IP, date) {
        
    },

    change: function (username, columntochange, newvalue, cFunction) {
        var connection = mysql.createConnection(mysqlConfig);

        connection.connect(function(error) {
            if (error) throw error;
            var sqlCommand = "UPDATE euaruserdatalogin.userdata SET " + columntochange + " = '" + newvalue + "' WHERE (username = '" + username + "')";
            connection.query(sqlCommand, function (err, result) {
                if (err) throw err;
                let response = JSON.parse(JSON.stringify(result));
                cFunction(response[0].changedRows);
            })
        })
    }
}