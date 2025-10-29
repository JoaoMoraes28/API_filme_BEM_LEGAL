'use strict'

/********************************************************************************************
* Objetivo: Arquivo responsavel pelas rotas da API da locadora de filmes para o arquivo filme
* Data: 29/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
*********************************************************************************************/

const express = require('express')
const routerFilme = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()
const controllerFilme = require('../../controller/filme/controller_filme.js')

routerFilme.get('/', async (request, response) => {
    let filmes = await controllerFilme.listarFilmes()

    response.status(filmes.status_code)
    response.json(filmes)
})

routerFilme.get('/:id', cors(), async (request, response) => {
    let id = request.params.id

    let filme = await controllerFilme.buscarFilmeId(id)
    response.status(filme.status_code)
    response.json(filme)
})

routerFilme.post('/', cors(), bodyParserJSON, async (request, response) => {
    //Recebendo os dados da requisições (Se você utilizar o body parser, é obrigatório ter no endpoint)
    let dadosBody = request.body

    // Recebendo o tipo de conteudo da requisição
    let contentType = request.headers["content-type"]

    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

routerFilme.put('/:id', cors(), bodyParserJSON, async (request, response) => {
    // ID do filme via parametro
    let id = request.params.id

    // Dados e ContentType via Body
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let filme = await controllerFilme.atualizarFilme(dadosBody, id, contentType)

    response.status(filme.status_code)
    response.json(filme)

})

routerFilme.delete('/:id', cors(), async (request, response) => {
    let id = request.params.id

    let filme = await controllerFilme.excluirFilme(id)

    response.status(filme.status_code)
    response.json(filme)
})

module.exports = routerFilme