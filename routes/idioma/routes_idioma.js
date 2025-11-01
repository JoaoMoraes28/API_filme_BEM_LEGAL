'use strict'

/*****************************************************************************************************
* Objetivo: Arquivo responsavel pelas rotas da API da locadora de filmes para o arquivo pais_origem
* Data: 30/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
******************************************************************************************************/

const express = require('express')
const routerIdioma = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()
const controllerIdioma = require('../../controller/idioma/controller_idioma.js')

routerIdioma.get('/', cors(), async (request, response) => {
    let idioma = await controllerIdioma.listarIdiomas()

    response.status(idioma.status_code)
    response.json(idioma)
})

routerIdioma.get('/:id', cors(), async (request, response) => {
    let id = request.params.id

    let idioma = await controllerIdioma.listarIdiomaId(id)

    response.status(idioma.status_code)
    response.json(idioma)
})

routerIdioma.post('/', cors(), bodyParserJSON, async (request, response) => {
    let bodyContent = request.body
    let contentType = request.headers["content-type"]

    let idioma = await controllerIdioma.inserirIdioma(bodyContent, contentType)

    response.status(idioma.status_code)
    response.json(idioma)
})

routerIdioma.put('/:id', cors(), bodyParserJSON, async (request, response) => {
    let id = request.params.id
    let bodyContent = request.body
    let contentType = request.headers["content-type"]

    let idioma = await controllerIdioma(id, bodyContent, contentType)

    response.status(idioma.status_code)
    response.json(idioma)
})

routerIdioma.delete('/:id', cors(), async (request, response) => {
    let id = request.params.id

    let idioma = await controllerIdioma.deletarIdioma(id)

    response.status(idioma.status_code)
    response.json(idioma)
})

module.exports = routerIdioma