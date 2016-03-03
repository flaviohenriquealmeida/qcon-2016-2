var mongoose = require('mongoose');

module.exports = function(app) {
    
    // models é a pasta e palestrante é o nome do arquivo js
    var Palestrante = mongoose.model('Palestrante');
    
    app.route('/palestrantes')
        .get(function(req, res) {
            Palestrante
                .find()
                .then(function(palestrantes) {
                    res.json(palestrantes);     
                });
        });
};