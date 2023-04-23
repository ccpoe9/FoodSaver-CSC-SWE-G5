const express = require("express");
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000
let router = require('./routes/router');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(bodyparser.json());
app.use('/', router);

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/foodsaverapi.one/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/foodsaverapi.one/fullchain.pem'),
}, app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
