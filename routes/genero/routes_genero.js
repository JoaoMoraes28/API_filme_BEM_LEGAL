'use strict'

/********************************************************************************************
* Objetivo: Arquivo responsavel pelas rotas da API da locadora de filmes para o arquivo genero
* Data: 29/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
*********************************************************************************************/

const express = require('express')
const routerGenero = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()
const controllerGenero = require('../../controller/genero/controller.genero.js')

//Endpoint para listar todos os gêneros
routerGenero.get('/', cors(), async (request, response) => {
    let generos = await controllerGenero.listarGeneros()

    response.status(generos.status_code)
    response.json(generos)
})

//Endpoint para listar um gênero buscando pelo seu ID
routerGenero.get('/:id', cors(), async (request, response) => {
    let id = request.params.id
    let genero = await controllerGenero.selecionarGeneroId(id)

    response.status(genero.status_code)
    response.json(genero)
})

//Endpoint para inserir um novo gênero
routerGenero.post('/', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)
})

//Endpoint para atualizar um gênero
routerGenero.put('/:id', cors(), bodyParserJSON, async (request, response) => {
    let id = request.params.id
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let genero = await controllerGenero.atualizarGenero(id, dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)
})

//Endpoint para deletar um gênero
routerGenero.delete('/:id', cors(), async (request, response) => {
    let id = request.params.id

    let genero = await controllerGenero.deletarGenero(id)

    response.status(genero.status_code)
    response.json(genero)
})

module.exports = routerGenero