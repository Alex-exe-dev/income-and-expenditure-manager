# Income and expenditure manager
This website is reachable under: https://aerw-b4mad-racing.apps.smaug.na.operate-first.cloud/

The tabs "Übersicht" and "Startseite" are currently not working. 
The Tabs "Graph", "Tabelle" and "Rechner" are **fully** functional.


The index.js script creates a server on your loacalhost for you (Port:8000). It was partly created by @0bMERLIN (https://github.com/0bMERLIN).

This project is also avaiable as a Docker container: https://hub.docker.com/repository/docker/aleexedev/aerw-site

# Make this a https service instead of http
Currently it only creates a http server but you can easily change it to be a https server by changing line 2 to: 

```const Https = require('https')```

and remove the comments (```/* */```) in line 9 to 12. 
After that you need to generate a ```key.pem``` and a ```cert.pem``` for example with openssl to enable http over tls.

If you try to run this code yourself you might notice that some files in /media and /styles are missing. This is due to copyright reasons.

# general information 
Currently this site doesn't get displayed properly in Firefox; It should work on Google Chrome though.

To create a data structure to use this side you need to open the tab "Tabelle" which will open the registration menue. All inserted data is only
stored locally in your browser and will **not** be uploaded to the server.

# roadmap
- end of 2022:
  - finish and optimize the new disign of the site
  - adding an English version of the application
- 01/2023:
  - add text to subpages
  - maybe adding a white mode to the site
- 03/2023:
  - finally finishing the save and download option
- 06/2023:
  - adding local profiles to the application