'use strict'

/*****************************************************************************************************
* Objetivo: Arquivo responsavel pelas rotas da API da locadora de filmes para o arquivo diretor
* Data: 11/12/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
******************************************************************************************************/

const express = require('express')
const routerDiretor = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()
const controllerDiretor = require('../../controller/diretor/controller_diretor.js')

routerDiretor.get('/', cors(), async (request, response) => {
    let diretor = await controllerDiretor.listarDiretores()

    response.status(diretor.status_code)
    response.json(diretor)
})

routerDiretor.get('/:id', cors(), async (request, response) => {
    let id = request.params.id

    let diretor = await controllerDiretor.listarDiretorId(id)

    response.status(diretor.status_code)
    response.json(diretor)
})

routerDiretor.post('/', cors(), bodyParserJSON, async (request, response) => {
    let bodyContent = request.body
    let contentType = request.headers["content-type"]

    let diretor = await controllerDiretor.inserirDiretor(bodyContent, contentType)

    response.status(diretor.status_code)
    response.json(diretor)
})

routerDiretor.put('/:id', cors(), bodyParserJSON, async (request, response) => {
    let id = request.params.id
    let bodyContent = request.body
    let contentType = request.headers["content-type"]

    let diretor = await controllerDiretor.atualizarDiretor(id, bodyContent, contentType)

    response.status(diretor.status_code)
    response.json(diretor)
})

routerDiretor.delete('/:id', cors(), async (request, response) => {
    let id = request.params.id

    let diretor = await controllerDiretor.deletarDiretor(id)

    response.status(diretor.status_code)
    response.json(diretor)
})

module.exports = routerDiretor