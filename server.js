// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// timestamp endpoint with value
app.get("/api/timestamp/:date_string", function (req, res) {
  let date;
  if (Date.parse(req.params.date_string)) {
    date = new Date(req.params.date_string);
    res.json({"unix": date.getTime(), "utc" : date.toUTCString() });
  } else if (!isNaN(req.params.date_string)) {
    date = new Date(parseInt(req.params.date_string));
    res.json({"unix": date.getTime(), "utc" : date.toUTCString() });
  } else {
      res.json({"error" : "Invalid Date" });
  }
});

// timestamp endpoint with empty string
app.get("/api/timestamp", function (req, res) {
  let date = new Date();
  res.json({"unix": date.getTime(), "utc" : date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
