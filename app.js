'use strict'

/*****************************************************************************
* Objetivo: Arquivo responsavel pelas requisições da API da locadora de filmes
* Data: 07/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
******************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerFilme = require('./controller/filme/controller_filme.js')
const controllerGenero = require('./controller/genero/controller.genero.js')

const PORT = process.PORT || 8080

// Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

const app = express()

//Configuração de permissões
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

//Endpoints para a rota de filme
app.get('/v1/locadora/filmes', cors(), async (request, response) => {
    //Chama a função para listar os filmes do banco de dados
    let filmes = await controllerFilme.listarFilmes()
    
    response.status(filmes.status_code)
    response.json(filmes)
})

app.get('/v1/locadora/filme/:id', cors(), async (request, response) => {
    let id = request.params.id

    let filme = await controllerFilme.buscarFilmeId(id)
    response.status(filme.status_code)
    response.json(filme)
})

app.post('/v1/locadora/filme', cors(), bodyParserJSON, async (request, response) => {
    // Recebendo os dados da requisições (Se você utilizar o body parser, é obrigatório ter no endpoint)
    let dadosBody = request.body

    // Recebendo o tipo de conteudo da requisição
    let contentType = request.headers["content-type"]

    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)

})

app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async (request, response) => {
    // ID do filme via parametro
    let id = request.params.id

    // Dados e ContentType via Body
    let dadosBody = request.body
    let contentType = request.headers["content-type"]

    let filme = await controllerFilme.atualizarFilme(dadosBody, id, contentType)
    
    response.status(filme.status_code)
    response.json(filme)
})

app.delete('/v1/locadora/filme/:id', cors(), bodyParserJSON, async (request, response) => {
    let id = request.params.id

    let filme = await controllerFilme.excluirFilme(id)

    response.status(filme.status_code)
    response.json(filme)
})


app.get('/v1/locadora/generos', cors(), async (request, response) => {
    let generos = await controllerGenero.listarGeneros()

    response.status(generos.status_code)
    response.json(generos)
})

app.get('/v1/locadora/genero/:id', cors(), async (request, response) => {
    let id = request.params.id
    let genero = await controllerGenero.selecionarGeneroId(id)

    response.status(genero.status_code)
    response.json(genero)
})

app.post('/v1/locadora/genero', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let genero = await controllerGenero.inserirGenero(dadosBody)

    response.status(genero.status_code)
    response.json(genero)

})

app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async (request, response) => {
    let id = request.params.id
    let dadosBody = request.body
    
    let genero = await controllerGenero.atualizarGenero(id, dadosBody)

    response.status(genero.status_code)
    response.json(genero)
})


app.delete('/v1/locadora/genero/:id', cors(), async (request, response) => {
    let id = request.params.id

    let genero = await controllerGenero.deletarGenero(id)
    
    response.status(genero.status_code)
    response.json(genero)
})
app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})