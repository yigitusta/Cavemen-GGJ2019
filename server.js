var express = require('express')
var app = express();
const path = require('path');

app.get('/', function (req, res) {
  res.send('Hello World3')
})

app.get('/client', function (req, res) {
  res.sendFile(path.join(__dirname+'/client/index.html'));
})
 
app.listen(process.env.PORT || 3000);