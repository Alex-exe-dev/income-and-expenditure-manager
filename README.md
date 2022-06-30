# Website-only-calculator-works
This will hopefully sometimes be a website where you can manage your income and expenditure!


The index.js script creates a server on your loacalhost for you (Port:8000). It was partly created by @0bMERLIN (https://github.com/0bMERLIN).

Currently it only creates a http server but you can easily change it to be a https server by changing line 2 to 

```const Https = require('https')```

and remove the comme ```/* */``` in line 9 to 12. 
After that you need to generate a ```key.pem``` and a ```cert.pem``` for example with openssl to enable http over tls.

If you try to run this code yourself you might notice that some files in /media and /styles are missing. This is due to copyright reasons.
You should find all filenames somewhere in the css / html files. After that you can simply google the fonts to complete your build.

The font of the site is downloadable here: https://fonts.google.com/specimen/Sansita+Swashed

Currently this site doesn't get displayed properly in Firefox; It should work on Google Chrome though.
