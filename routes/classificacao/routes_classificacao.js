'use strict'

/********************************************************************************************************
* Objetivo: Arquivo responsavel pelas rotas da API da locadora de filmes para o arquivo classificacao_ind
* Data: 29/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
*********************************************************************************************************/

const express = require('express')
const routerClas = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()
const controllerClas = require('../../controller/classificacao_ind/controller_classificacao.js')

routerClas.get('/', cors(), async (request, response) => {
    let clas = await controllerClas.listarClas()
    
    
    response.json(clas)
})

routerClas.get('/:id', cors(), async (request, response) => {
    let id = request.params.id

    let clas = await controllerClas.listarClasId(id)

    response.status(clas.status_code)
    response.json(clas)
})

routerClas.post('/', cors(), bodyParserJSON, async (request, response) => {
    let bodyContent = request.body
    let contentType = request.headers["content-type"]

    let clas = await controllerClas.inserirClas(bodyContent, contentType)

    response.status(clas.status_code)
    response.json(clas)
})

routerClas.put('/:id', cors(), bodyParserJSON, async (request, response) => {
    let id = request.params.id
    let bodyContent = request.body
    let contentType = request.headers["content-type"]

    let clas = await controllerClas.atualizarClas(id, bodyContent, contentType)

    response.status(clas.status_code)
    response.json(clas)
})

routerClas.delete('/:id', cors(), async (request, response) => {
    let id = request.params.id
    
    let clas = await controllerClas.deletarClas(id)

    response.status(clas.status_code)
    response.json(clas)
})

module.exports = routerClas