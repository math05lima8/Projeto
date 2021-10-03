const express = require('express')
require('dotenv').config()
const InicializaMongoServer = require('./config/db')
const rotasCarros = require('./routes/Carro')

InicializaMongoServer() 

const app = express()

const PORT = process.env.PORT

app.use(express.json()) 


app.get('/', (req, res) => {
    res.json({
        mensagem: 'API 100% funcionando!',
        versao: '1.0.0'
    })
})


app.use('/carros',rotasCarros)

app.use(function(req, res){
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})


app.listen(PORT, (req, res) => {
    console.log(`Servidor web rodando na porta ${PORT}`)
})