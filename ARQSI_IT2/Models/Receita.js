var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReceitaSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Receita', ReceitaSchema);