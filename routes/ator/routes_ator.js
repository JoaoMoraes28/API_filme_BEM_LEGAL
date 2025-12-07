'use strict'

/*****************************************************************************************************
* Objetivo: Arquivo responsavel pelas rotas da API da locadora de filmes para o arquivo ator
* Data: 06/12/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
******************************************************************************************************/

const express = require('express')
const routerAtor = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()
const controllerAtor = require('../../controller/ator/controller_ator.js')

routerAtor.get('/', cors(), async (request, response) => {
    let ator = await controllerAtor.listarAtores()

    response.status(ator.status_code)
    response.json(ator)
})

routerAtor.get('/:id', cors(), async (request, response) => {
    let id = request.params.id

    let ator = await controllerAtor.listarAtorId(id)

    response.status(ator.status_code)
    response.json(ator)
})

routerAtor.post('/', cors(), bodyParserJSON, async (request, response) => {
    let bodyContent = request.body
    let contentType = request.headers["content-type"]

    let ator = await controllerAtor.inserirAtor(bodyContent, contentType)
    
    response.status(ator.status_code)
    response.json(ator)
})

routerAtor.put('/:id', cors(), bodyParserJSON, async (request, response) => {
    let id = request.params.id
    let bodyContent = request.body
    let contentType = request.headers["content-type"]

    let ator = await controllerAtor.atualizarAtor(id, bodyContent, contentType)

    response.status(ator.status_code)
    response.json(ator)
})

routerAtor.delete('/:id', cors(), async (request, response) => {
    let id = request.params.id

    let ator = await controllerAtor.deletarAtor(id)

    response.status(ator.status_code)
    response.json(ator)
})

module.exports = routerAtor