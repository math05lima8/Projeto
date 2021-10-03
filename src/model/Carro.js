const mongoose = require('mongoose')

const CarroSchema = mongoose.Schema({
    modelo: {type: String},
    ano: {type: Number},
    cor: {type: String},
    fabricante: {type: String},
    preco: {type: Number}
})  
module.exports = mongoose.model('carros', CarroSchema)

