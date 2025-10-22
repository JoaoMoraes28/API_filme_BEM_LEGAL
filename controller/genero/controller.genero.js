'use strict'

const { json } = require('body-parser')
/**************************************************************************************************
* Objetivo: Arquivo responsavel pela manipulacao de dado entre o app e a model para o CRUD de generos
* Data: 22/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
***************************************************************************************************/

const generoDAO = require('../../model/DAO/genero.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os filmes
const listarGeneros = async () => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let generos = await generoDAO.getAllGeneros()

        if (generos) {
            if (generos.length > 0) {
                messages.HEADER.status = messages.SUCCESS_REQUEST.status
                messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                messages.HEADER.message = messages.SUCCESS_REQUEST.message
                messages.HEADER.items.generos = generos

                return messages.HEADER

            } else {
                return messages.ERROR_NOT_FOUND

            }
        } else {
            return messages.ERROR_INTERNAL_SERVER_MODEL

        }

    } catch (error) {
        console.log(error)
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const selecionarGeneroId = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (id == !null || id == !undefined || id == !'' || !isNaN(id)) {
            let genero = await generoDAO.getGeneroById(id)

            if (genero) {
                if (genero.length > 0) {
                    messages.HEADER.status = messages.SUCCESS_REQUEST.status
                    messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                    messages.HEADER.message = messages.SUCCESS_REQUEST.message
                    messages.HEADER.items.genero = genero

                    return messages.HEADER
                } else {
                    return messages.ERROR_NOT_FOUND
                }

            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL

            }

        } else {
            return messages.ERROR_REQUIRED_FIELDS
        }


    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Inseri um novo genero na tabela
const inserirGenero = async (genero) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (genero.genero == '' || genero.genero == null || genero.genero == undefined || genero.length > 50) {
            return messages.ERROR_REQUIRED_FIELDS

        } else {
            let resultGenero = generoDAO.insertGenero(genero)

            if (resultGenero) {
                messages.HEADER.status = messages.SUCCESS_CREATED_ITEM.status
                messages.HEADER.status_code = messages.SUCCESS_CREATED_ITEM.status_code
                messages.HEADER.message = messages.SUCCESS_CREATED_ITEM.message

                return messages.HEADER
            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL
            }
        }


    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER

    }

}

//Função para atualizar um genero
const atualizarGenero = async (id, genero) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (genero.genero == '' || genero.genero == null || genero.genero == undefined || genero.length > 50 || id == null || id == undefined || id == '' || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS

        } else {
            let resultId = await generoDAO.getGeneroById(id)

            if (resultId) {
                if (resultId.length > 0) {
                    let generoAtualizado = generoDAO.updateGenero(id, genero)

                    if (generoAtualizado) {
                        messages.HEADER.status = messages.SUCCESS_UPDATED_ITEM.status
                        messages.HEADER.status_code = messages.SUCCESS_UPDATED_ITEM.status_code
                        messages.HEADER.message = messages.SUCCESS_UPDATED_ITEM.message

                        return messages.HEADER
                    } else {
                        return messages.ERROR_INTERNAL_SERVER_MODEL

                    }


                } else {
                    return messages.ERROR_NOT_FOUND

                }

            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL

            }

        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

//Função para deletar Generos
const deletarGenero = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (id == null || id == undefined || id == '' || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS

        } else {
            let genero = await generoDAO.deleteGenero(id)

            if (genero) {
                messages.HEADER.status = messages.SUCCESS_DELETE_ITEM.status
                messages.HEADER.status_code = messages.SUCCESS_DELETE_ITEM.status_code
                messages.HEADER.message = messages.SUCCESS_DELETE_ITEM.message


                return messages.HEADER
            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL

            }

        }


    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

module.exports = {
    listarGeneros,
    inserirGenero,
    selecionarGeneroId,
    atualizarGenero,
    deletarGenero
}