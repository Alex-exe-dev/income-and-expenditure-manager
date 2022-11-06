# Income and expenditure manager
This website is reachable under: https://aerw-b4mad-racing.apps.smaug.na.operate-first.cloud/

The tabs "Übersicht" and "Startseite" are currently not working. 
The Tabs "Graph", "Tabelle" and "Rechner" are **fully** functional.


The index.js script creates a server on your loacalhost for you (Port:8000). It was partly created by @0bMERLIN (https://github.com/0bMERLIN).

This project is also avaiable as a Docker container: https://hub.docker.com/repository/docker/aleexedev/aerw-site

# Make this a https service instead of http
Currently it only creates a http server but you can easily change it to be a https server by changing line 2 to 

```const Https = require('https')```

and remove the comments (```/* */```) in line 9 to 12. 
After that you need to generate a ```key.pem``` and a ```cert.pem``` for example with openssl to enable http over tls.

If you try to run this code yourself you might notice that some files in /media and /styles are missing. This is due to copyright reasons.
You should find all filenames somewhere in the css / html files. After that you can simply google the fonts to complete your build.

The font of the site is downloadable here: https://fonts.google.com/specimen/Sansita+Swashed

# general information 
Currently this site doesn't get displayed properly in Firefox; It should work on Google Chrome though.

To create a data structure to use this side you need to open the tab "Tabelle" which will open the registration menue. All inserted data is only
stored locally in your browser and will **not** be uploaded to the server.
