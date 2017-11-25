var mongoose     = require('mongoose');
var mongoose_validator = require('mongoose-id-validator');

var receitaSchema   = mongoose.Schema({
    medico: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    paciente: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    data: Date,
    prescricoes: [{ 
        numero: Number,
        apresentacaoID: String,
        apresentacao: String,
        posologiaPrescrita: String,
        posologiaID: String,
        farmaco: String,
        quantidade: Number,
        validade: Date,
        aviamentos: [{
            farmaceutico: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            data: Date,
            quantidade: Number
        }]
    }]
});

receitaSchema.plugin(mongoose_validator);

module.exports = mongoose.model('Receita', receitaSchema);