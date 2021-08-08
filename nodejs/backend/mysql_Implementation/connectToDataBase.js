var mysql = require('mysql');
const FileSystem = require('fs');
var path = require('path');
const { SSL_OP_EPHEMERAL_RSA, RSA_PKCS1_OAEP_PADDING } = require('constants');
let configPath = path.join(__dirname, "..", "configurationfiles", "config_mysql_data.json")

let  mysqlConfig = JSON.parse(FileSystem.readFileSync(configPath));


var respResult = "error";


module.exports = {

  get: function(id, key, index, cFunction) {
    var con = mysql.createConnection(mysqlConfig);

    con.connect(function(err) {
      if (err) throw err;
      var sql = "SELECT * FROM " + id + " WHERE id=" + index;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        var rawData = JSON.stringify(result);
        var data = JSON.parse(rawData);
        cFunction(rawData, con);
      });
    });
  },


  insert: function(id, key, date, reason, value) {
    
    var con = mysql.createConnection(mysqlConfig);

    con.connect(function(err) {
      if (err) throw err;
      var sql = "INSERT INTO " + id + "(datum, reason, value) VALUES('" + date + "', '" + reason + "', '" + value + "')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        respResult = result;
        
      });
    });
    console.log("INSERT")
    return respResult.insertId + "";
  }
}