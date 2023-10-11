const express = require('express');
const app = express();
const requestHandler = require('./util/requestHandler.js');
const port = 6042;

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/vms', function (req, res) {
  res.sendFile(__dirname + '/public/vms-screen.html');
});

app.get('/qrcode', function (req, res) {
  let state = req.headers.state;
  var request = {
    "domain": 'stg.spm.backend.leekimhr.com',
    "port": 6041,
    "requestPath": "/generateqrcode",
    "headers": { 'state': state },
    "method": "GET"
  };
  requestHandler.getHttpsResponse(request.domain, request.requestPath, request.headers, request.method, "")
    .then(result => {
      res.jsonp(result.msg);
    })
    .catch(error => {
      console.log("\n--- Mock VMS Client Error---");
      console.log(error);
      console.log("--- Mock VMS Client Error---\n");
      res.sendStatus(500);
    });
});


app.listen(port, () => console.log(`Your VMS Client listening on port ${port}!`));