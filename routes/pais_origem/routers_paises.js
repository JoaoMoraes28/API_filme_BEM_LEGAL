'use strict'

/*****************************************************************************************************
* Objetivo: Arquivo responsavel pelas rotas da API da locadora de filmes para o arquivo pais_origem
* Data: 30/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
******************************************************************************************************/

const express = require('express')
const routerPais = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()
const controllerPais = require('../../controller/pais_origem/controller_pais.js')

//Endpoint para listar todos os países
routerPais.get('/', cors(), async (request, response) => {
    let pais = await controllerPais.listarPaises()

    response.status(pais.status_code)
    response.json(pais)
})

//Endpoint para listar um país buscando pelo seu ID
routerPais.get('/:id', cors(), async (request, response) => {
    let id = request.params.id

    let pais = await controllerPais.listarPaisId(id)

    response.status(pais.status_code)
    response.json(pais)
})

//Endpoint para inserir um novo país
routerPais.post('/', cors(), bodyParserJSON, async (request, response) => {
    let bodyContent = request.body
    let contentType = request.headers["content-type"]

    let pais = await controllerPais.inserirPais(bodyContent, contentType)

    response.status(pais.status_code)
    response.json(pais)
})

//Endpoint para atualizar um país
routerPais.put('/:id', cors(), bodyParserJSON, async (request, response) => {
    let id = request.params.id
    let bodyContent = request.body
    let contentType = request.headers["content-type"]

    let pais = await controllerPais.atualizarPais(id, bodyContent, contentType)

    response.status(pais.status_code)
    response.json(pais)
})

//Endpoint para deletar um país
routerPais.delete('/:id', cors(), async (request, response) => {
    let id = request.params.id

    let pais = await controllerPais.deletarPais(id)

    response.status(pais.status_code)
    response.json(pais)
})

module.exports = routerPais