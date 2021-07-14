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
  let parsedDate = new Date(userDate);

  if(isNaN(parsedDate)){
    console.log("It's rubbish",userDate,parsedDate.toString());
    res.json({ error : parsedDate.toString() });
  } else {
    console.log(parsedDate);
    res.json({unix: parsedDate.getTime(), utc: parsedDate.toUTCString()});
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
