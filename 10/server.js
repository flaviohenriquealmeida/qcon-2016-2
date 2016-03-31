var http = require('http')
	,app = require('./config/express');

require('./config/database')('localhost/workshop');

http.createServer(app)
	.listen(3000, function() {
		console.log('Server is running');
		console.log('http://localhost:3000')
	});

