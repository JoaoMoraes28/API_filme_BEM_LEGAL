'use strict'

/****************************************************************************************************************
* Objetivo: Arquivo responsavel pela manipulacao de dado entre o app e a model para o CRUD de paises de origem
* Data: 22/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
*****************************************************************************************************************/

const paisOrigem = require('../../model/DAO/pais_origem.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Listar todos os paises
const listarPaises = async () => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultPais = await paisOrigem.getAllCountry()

        if (resultPais) {
            if (resultPais.length > 0) {
                messages.HEADER.status = messages.SUCCESS_REQUEST.status
                messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                messages.HEADER.message = messages.SUCCESS_REQUEST.message
                messages.HEADER.items.pais = resultPais

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

//Listar um pais por ID
const listarPaisId = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (id == undefined || id == '' || id == null || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS

        } else {
            let resultPais = await paisOrigem.getCountryId(id)

            if (resultPais) {
                if (resultPais.length > 0) {
                    messages.HEADER.status = messages.SUCCESS_REQUEST.status
                    messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                    messages.HEADER.message = messages.SUCCESS_REQUEST.message
                    messages.HEADER.items.pais = resultPais

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

//Inserir um novo pais
const inserirPais = async (pais, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if (pais.pais == null || pais.pais == '' || pais.pais == undefined || pais.pais.length > 50) {
                return messages.ERROR_REQUIRED_FIELDS

            } else {
                let resultPais = await paisOrigem.insertCountry(pais)

                if (resultPais) {
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

//Atualizar um pais
const atualizarPais = async (id, pais, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if (pais.pais == null || pais.pais == '' || pais.pais == undefined || pais.pais.length > 50 || id == null || id == '' || id == undefined || isNaN(id)) {
                return messages.ERROR_REQUIRED_FIELDS

            } else {
                let resultId = await paisOrigem.getCountryId(id)
                if (resultId) {
                    if (resultId.length > 0) {
                        let resultPais = await paisOrigem.updateCountry(pais, id)

                        if (resultPais) {
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

//Deletar um pais
const deletarPais = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (id == undefined || id == '' || id == null || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS

        } else {
            let resultId = await paisOrigem.getCountryId(id)
            if (resultId) {
                if (resultId.length > 0) {
                    let resultPais = await paisOrigem.deleteCountry(id)

                    if (resultPais) {
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
    listarPaises,
    listarPaisId,
    inserirPais,
    atualizarPais,
    deletarPais
}