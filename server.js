// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// date endpoint
app.get("/api/:date", function (req, res) {
  let userDate = req.params.date;
  let dateRegex = /^\d{4}\-\d{2}\-\d{2}$/;
  let utcRegex = /^\d{13}$/;
  let utcInt;
  let dateString;
  let invalid = true;
  if(dateRegex.test(userDate)){
    dateString = new Date(userDate).toUTCString();
    utcInt = Date.parse(userDate);
    invalid = false;
  } else if(utcRegex.test(userDate)){
    dateString = new Date(parseInt(userDate)).toUTCString();
    utcInt = parseInt(userDate);
    invalid = false;
  } 
  if(invalid){
    console.log("It's rubbish");
    res.json({ error : "Invalid Date" });
  } else{
    res.json({unix: utcInt, utc: dateString});
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
