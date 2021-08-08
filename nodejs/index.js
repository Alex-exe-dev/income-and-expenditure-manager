const FileSystem = require('fs')
const Http = require('https')

let configPath = "config.json"
let baseDirs = JSON.parse(FileSystem.readFileSync(configPath)).baseDirs
let defaultRedirect = JSON.parse(FileSystem.readFileSync(configPath)).defaultRedirect

const options = {
  key: FileSystem.readFileSync('key.pem'),
  cert: FileSystem.readFileSync('cert.pem')
}

const SQL = require('./backend/mysql_Implementation/connectToDataBase.js');
const LoginRegister = require('./backend/mysql_Implementation/LoginRegister.js');
const checkURL = require('./backend/URL/checkURLS_Redirect.js');


let stringContains = (str, searchStr) => str.indexOf(searchStr) !== -1
let concatArr = arr => arr.reduce((acc, curr) => acc.concat(curr))

let getAvailFileNames = baseDir => {
  let avaliableNames = FileSystem
    .readdirSync(baseDir.path)
    .filter(nm => stringContains(nm, "."))
  
  return avaliableNames.map( name =>
    ( { path: baseDir.path + "/" + name
      , urlSelector: "/" + name
      , cType: baseDir.cType
    }))
}

let sendResponse = (response, code, cType, data) => {
  response.writeHead(code, { "content-type" : cType })
  response.end(data)
}

let redirect = (response, newUrl) => {
  response.writeHead(302 , { "Location" : newUrl } )
  response.end()
}

let serverFn = (request, response) => {
  if (request.url === "/")
    redirect(response, defaultRedirect)


  //APIREF
  else if (request.url.startsWith("/requestAPI")){
    const wUrl = new URL('https://' + request.headers.host + request.url)
    response.writeHead(200, {"Content-Type": "text/plain"})
    const params = wUrl.searchParams
    const action = params.get("action")
    const userId = params.get("id")
    const userKey = params.get("key")


    //handle API requests
    if (action == "insert") {
      //get required variables for the SQL insert
      const date = params.get("date");
      const reason = params.get("reason");
      const value = params.get("value");
      result = SQL.insert(userId, userKey, date, reason, value);
      response.end(result);

    } else if (action == "get") {

      const index = params.get("index");
      SQL.get(userId, userKey, index, function(GETResult, connection) {
        response.end(GETResult + "");
        connection.destroy();
      });    
    } else if (action == "login") {
      var username = params.get("username");
      var password = params.get("key");
      let keepLoggedIn = params.get("kmli");
      var ipaddress = request.connection.remoteAddress;
      LoginRegister.login(username, password, ipaddress, function (result, dbcon) {
        if (result == "invalidIp") {
          dbcon.end();
          response.writeHead(200)
          response.end("invalidIp");

        } else {
          dbcon.destroy();
          response.writeHead(200)
          response.end(result);
        }
      })
    }else {
      result = "es ist ein unbekannter Fehler aufgetreten!";
      response.end(result);
    }


  } else {

    let availableFileNames = concatArr(baseDirs.map(getAvailFileNames))
    let maybeSelectedFileName = availableFileNames
      .filter( nameData => "/" + nameData.path === request.url)
    let [ selectedFileName ] = maybeSelectedFileName


    if (selectedFileName != null | selectedFileName != undefined) {
      sendResponse(response, 200, selectedFileName.cType, FileSystem.readFileSync(selectedFileName.path))
    }
    else {
      //URLs ohne Dateiendungen möglich machen
      if (checkURL.redirect(request.url) != null) {
        redirect(response, checkURL.redirect(request.url));
      } else {

        console.log("could not find file: ", availableFileNames, ",", request.url)
        sendResponse(response, 404, "text/html", "Error 404: Page not found.")
      }
    }
  }
}

let server = Http.createServer(options, serverFn)
server.listen(80)
console.log("listening!")