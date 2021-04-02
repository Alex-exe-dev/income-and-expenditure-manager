const FileSystem = require('fs')
const Http = require('http')

let configPath = "config.json"
let baseDirs = JSON.parse(FileSystem.readFileSync(configPath)).baseDirs
let defaultRedirect = JSON.parse(FileSystem.readFileSync(configPath)).defaultRedirect
console.log(defaultRedirect)


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
  else {

    let availableFileNames = concatArr(baseDirs.map(getAvailFileNames))
    let maybeSelectedFileName = availableFileNames
      .filter( nameData => "/" + nameData.path === request.url)
    let [ selectedFileName ] = maybeSelectedFileName


    if (selectedFileName != null | selectedFileName != undefined) {
      sendResponse(response, 200, selectedFileName.cType, FileSystem.readFileSync(selectedFileName.path))
    }
    else {
      console.log("could not find file: ", availableFileNames, ",", request.url)
      sendResponse(response, 404, "text/html", "404 error: could not find page.")
    }
  }
}

let server = Http.createServer(serverFn)
server.listen(80)
console.log("listening!")