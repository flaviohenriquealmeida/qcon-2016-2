var mongoose = require('mongoose');

module.exports = function(app) {
    
    var Palestrante = mongoose.model('Palestrante');
    
    app.route('/palestrantes')
        .get(function(req, res) {
            Palestrante
                .find()
                .then(function(palestrantes) {
                    res.json(palestrantes);     
                });
        })
        .post(function(req, res) {
            Palestrante
                .create(req.body)
                .then(function(palestrante) {
                    res.status(200).send(palestrante);
                });
        });

        app.route('/palestrantes/:id')
            .delete(function(req, res) {
                var id = req.params.id;
                Palestrante.remove({"_id" : id})
                .then(
                function() {
                     res.status(204).end(); 
                }, 
                function(err) {
                    return console.error(erro);
                });
            })
            .get(function(req, res) {
                var id = req.params.id;
                Palestrante.findById(id)
                    .then(function(palestrante) {
                       res.json(palestrante); 
                    }, function(err) {
                        console.log(err);
                    });
            })
            .put(function(req, res) {
                Palestrante
                    .findByIdAndUpdate(req.params.id, req.body)
                    .then(function(foto) {
                        res.json(foto);
                    }, function(err) {
                        console.log(err);
                        res.sendStatus(500);
                    });
            });
};
