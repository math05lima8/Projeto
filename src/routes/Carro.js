const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const carro = require('../model/Carro')

const Carro = require('../model/Carro')
const validaCarro  = [
    check("modelo", "É necessário informar o modelo do veículo!").not().isEmpty(),
    check("cor", "É necessário informar a cor do veículo!").not().isEmpty(),
    check("fabricante", "É necessário informar a fabricante do veículo!").not().isEmpty(),
    check("preco", "É necessário informar o preço do veículo!").not().isEmpty(),
    check("preco", "Preço é um número!").isNumeric(),
    check("ano", "É necessário informar o ano do veículo").not().isEmpty(),
    check("ano", "Ano é um número.").isNumeric(),
]

/***
 * Listar todos os carros
 * GET/carros
 **/
router.get('/', async(req, res) => {
    try{
        const carros = await Carro.find()
        res.json(carros)
    } catch (err){
        res.status(500).send({
            errors: [{message: 'Não foi possível obter os Carros'}]
        })
    }
})

/**
 * Listar um único carro - ID
 * GET/carros/id
 ***/
router.get('/:id', async(req, res) => {
    try{
        const carro = await Carro.find({"_id" : req.params.id})
        res.json(carro)
    } catch (err){
        res.status(400).send({
            errors: [{message: `Não foi possível obter o carro com o id ${req.params.id}`}]
        })
    }
})

/***
 * Inclui um novo carro
 * POST/carros
 **/
 router.post('/', validaCarro, async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try{
        let carro = new Carro(req.body)
        await carro.save()
        res.send(carro)
    } catch (err){
        return res.status(400).json({
            errors: [{message: `Erro ao cadastrar o carro: ${err.message}`}]
        })
    }
})

/**
 * Apaga um carro pelo id
 * DELETE/carro/id
 ***/
router.delete('/:id', async(req, res) => {
    await Carro.findByIdAndRemove(req.params.id)
    .then(carro => {
        res.send({message: `Carro ${carro.modelo} removido com sucesso`})
    }) .catch(err => {
        return res.status(400).send({
            errors: [{message: 'Não foi possível excluir o carro'}]
        })
    })
})

/**
 * Altera um carro já existente
 * DELETE/carros/id
 **/
router.put('/', validaCarro, async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    let dados = req.body
    await Carro.findByIdAndUpdate(req.body._id, {$set: dados})
    .then(carro => {
        res.send({ message: `Carro ${carro.modelo} alterado com sucesso`})
    }) .catch(err => {
        return res.status(404).send({
            errors: [{message: 'Não foi possível alterar o carro informado'}]
        })
    })
})

module.exports = router
