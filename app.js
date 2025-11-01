'use strict'

/*****************************************************************************
* Objetivo: Arquivo responsavel pelas requisições da API da locadora de filmes
* Data: 07/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
******************************************************************************/

const express = require('express')
const cors = require('cors')
const routerFilmes = require('./routes/filme/routes_filme.js')
const routerGeneros = require('./routes/genero/routes_genero.js')
const routerClassificacao = require('./routes/classificacao/routes_classificacao.js')
const routerPaises = require('./routes/pais_origem/routers_paises.js')
const routerIdioma = require('./routes/idioma/routes_idioma.js')

const PORT = process.PORT || 8080

const app = express()

//Configuração de permissões
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

//Direcionamento para o arquivo Routes
app.use('/v1/locadora/filme', routerFilmes)

app.use('/v1/locadora/genero', routerGeneros)

app.use('/v1/locadora/classificacao_indicativa', routerClassificacao)

app.use('/v1/locadora/paises', routerPaises)

app.use('/v1/locadora/idioma', routerIdioma)

app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})