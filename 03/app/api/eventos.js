var eventos = [
	{"nome" : "Workshop MEAN"},
	{"nome" : "Workshop Angular"}
];

module.exports = function(app) {
	
	app.route('/eventos')
		.get(function(req, res) {
			res.json(eventos);
		});
};