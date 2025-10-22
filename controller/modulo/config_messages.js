'use strict'

/**************************************************************************************************************************************************
* Objetivo: Arquivo responsavel pelos padroes de mensagens que o projeto ira realizar, sepre no formato JSON (Mensagens de erro e sucesso)
* Data: 07/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
**************************************************************************************************************************************************/

/* MENSAGENS PADRONIZADAS */
const data = new Date()

const HEADER = {
    development: "João Victor Santos de Moraes",
    api_description: "API para manipular dados de filmes",
    request_date: data.toLocaleString(),
    status: null,
    status_code: null,
    items: {}
}


/* MENSAGENS DE SUCESSO */
const SUCCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: "Requisição bem sucedida!"
}

const SUCCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: "Item criado com sucesso!"
}

const SUCCESS_UPDATED_ITEM = {
    status: true,
    status_code: 200,
    message: "Item atualizado com sucessos"
}

const SUCCESS_DELETE_ITEM = {
    status: true,
    status_code: 200,
    message: "Item deletado com sucessos"
}

/* MENSAGENS DE ERRO */
const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: "Não foram encontrados dados de retorno"
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: "Não foi possível processar a requisição devido a erros internos no servidor (CONTROLLER!)"
}

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: "Não foi possível processar a requisição devido a erros internos no servidor (MODEL!)"
}

const ERROR_REQUIRED_FIELDS = {
    status: false,
    status_code: 400,
    message: "Não foi possível processar a requisição pois existem campos obrigatórios que devem ser encaminhados e atendidos confome a documentação"
}

const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: "Não foi possível processar a requisição pois o tipo de dados enviados no corpo deve ser JSON"
}


module.exports = {
    HEADER,
    SUCCESS_REQUEST,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    SUCCESS_UPDATED_ITEM,
    SUCCESS_DELETE_ITEM
}