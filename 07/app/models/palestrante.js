var mongoose = require('mongoose');

// cria o esquema
var schema = mongoose.Schema({
  nome: { 
    type: String, 
    required: true
  }, 
  palestra: {
    type: String, 
    required: true
  }
});

mongoose.model('Palestrante', schema);