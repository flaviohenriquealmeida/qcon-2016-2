var express = require('express');
var app = express()
	,consign = require('consign')
    ,path = require('path')
    ,bodyParser = require('body-parser'); 

app.use(express.static('public'));

app.use(bodyParser.json());

consign({cwd: 'app'})
  .include('models')
  .then('api')
  .into(app);
  
app.all('/*', function(req, res) {
	res.sendFile(path.resolve('public/index.html'));
});

module.exports = app;




