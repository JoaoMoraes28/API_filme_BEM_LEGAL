'use strict'


/**********************************************************************************************************************
* Objetivo: Arquivo responsavel pela manipulacao de dado entre o app e a model para o CRUD da classificacao indicativa
* Data: 29/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
***********************************************************************************************************************/

const classificacao = require('../../model/DAO/classificacao_ind.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista com todas as classificações
const listarClas = async () => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultClas = await classificacao.getAllClas()
        if (resultClas) {
            if (resultClas.length > 0) {
                messages.HEADER.status = messages.SUCCESS_REQUEST.status
                messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                messages.HEADER.message = messages.SUCCESS_REQUEST.message
                messages.HEADER.items.classificacao = resultClas

                return messages.HEADER

            } else {
                return messages.ERROR_NOT_FOUND

            }
        } else {
            return messages.ERROR_INTERNAL_SERVER_MODEL

        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

//Retorna uma classificação pelo seu ID
const listarClasId = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (id == undefined || id == '' || id == null || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS

        } else {
            let resultClas = await classificacao.getClasById(id)

            if (resultClas) {
                if (resultClas.length > 0) {
                    messages.HEADER.status = messages.SUCCESS_REQUEST.status
                    messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                    messages.HEADER.message = messages.SUCCESS_REQUEST.message
                    messages.HEADER.items.classificacao = resultClas

                    return messages.HEADER

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

//Inseri uma nova classificação
const inserirClas = async (clas, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if (clas.classificacao == null || clas.classificacao == '' || clas.classificacao == undefined) {
                return messages.ERROR_REQUIRED_FIELDS

            } else {
                let resultClas = await classificacao.insertClas(clas)

                if (resultClas) {
                    messages.HEADER.status = messages.SUCCESS_CREATED_ITEM.status
                    messages.HEADER.status_code = messages.SUCCESS_CREATED_ITEM.status_code
                    messages.HEADER.message = messages.SUCCESS_CREATED_ITEM.message

                    return messages.HEADER

                } else {
                    return messages.ERROR_INTERNAL_SERVER_MODEL

                }

            }

        } else {
            return messages.ERROR_CONTENT_TYPE

        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

//Atualiza uma classificação existente
const atualizarClas = async (id, clas, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if (clas.classificacao == null || clas.classificacao == '' || clas.classificacao == undefined || id == undefined || id == '' || id == null || isNaN(id)) {
                return messages.ERROR_REQUIRED_FIELDS

            } else {
                let resultId = await classificacao.getClasById(id)
                if (resultId) {
                    if (resultId.length > 0) {
                        let resultClas = await classificacao.updateClas(id, clas)

                        if (resultClas) {
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

        } else {
            return messages.ERROR_CONTENT_TYPE

        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

//Deleta uma classificação do banco
const deletarClas = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (id == undefined || id == '' || id == null || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS

        } else {
            let resultId = await classificacao.getClasById(id)

            if (resultId) {
                if (resultId.length > 0) {
                    let resultClas = await classificacao.deleteClas(id)

                    if (resultClas) {
                        messages.HEADER.status = messages.SUCCESS_DELETE_ITEM.status
                        messages.HEADER.status_code = messages.SUCCESS_DELETE_ITEM.status_code
                        messages.HEADER.message = messages.SUCCESS_DELETE_ITEM.message

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

module.exports = {
    listarClas,
    listarClasId,
    inserirClas,
    atualizarClas,
    deletarClas
}