var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var calc = require('./routes/calc');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/calc', calc);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'public/views/index.html'));
});

app.listen(process.env.PORT || 3000);
