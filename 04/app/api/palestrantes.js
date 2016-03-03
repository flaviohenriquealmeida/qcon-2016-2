var palestrantes = [
	{"nome": "Flávio Almeida", "palestra" : "MEAN"},
	{"nome" : "Zeca Baleiro",  "palestra" : "Angular"},
	{"nome" : "Tião Galinha",  "palestra" : "Mongo"}
];
module.exports = function(app) {
	
	app.route('/palestrantes')
		.get(function(req, res) {
			res.json(palestrantes);
		});
};