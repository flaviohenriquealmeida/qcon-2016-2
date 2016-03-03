var express = require('express');
var app = express()
	,consign = require('consign')
    ,path = require('path');

// configurações de middlewares
app.use(express.static('public'));

consign({cwd: 'app'})
	.include('api')
	.into(app);

app.all('/*', function(req, res) {
	res.sendFile(path.resolve('public/index.html'));
});

module.exports = app;




