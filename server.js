var express = require('express')
var app = express();
const path = require('path');

app.use('/', express.static('client/dist'))

app.get('/api', (req, res) => {
  res.send('HEllo World');
});

app.listen(process.env.PORT || 3000);