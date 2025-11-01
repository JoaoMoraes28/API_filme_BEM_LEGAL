'use strict'

/**************************************************************************************************
* Objetivo: Arquivo responsavel pela manipulacao de dado entre o app e a model para o CRUD de generos
* Data: 30/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
***************************************************************************************************/

const idiomaDAO = require('../../model/DAO/idioma.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Listar todos os idiomas
const listarIdiomas = async () => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultIdioma = await idiomaDAO.getAllLanguage()

        if (resultIdioma) {
            if (resultIdioma.length > 0) {
                messages.HEADER.status = messages.SUCCESS_REQUEST.status
                messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                messages.HEADER.message = messages.SUCCESS_REQUEST.message
                messages.HEADER.items.idiomas = resultIdioma

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

//Obter um idioma pelo seu ID
const listarIdiomaId = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (id == undefined || id == '' || id == null || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS

        } else {
            let resultIdioma = await idiomaDAO.getLanguageId(id)

            if (resultIdioma) {
                if (resultIdioma.length > 0) {
                    messages.HEADER.status = messages.SUCCESS_REQUEST.status
                    messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                    messages.HEADER.message = messages.SUCCESS_REQUEST.message
                    messages.HEADER.items.idioma = resultIdioma

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

//Inserir um novo idioma
const inserirIdioma = async (idioma, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if (idioma.idioma == '' || idioma.idioma == undefined || idioma.idioma == null || idioma.idioma.length > 50) {
                return messages.ERROR_REQUIRED_FIELDS

            } else {
                let resultIdioma = await idiomaDAO.insertLanguage(idioma)

                if (resultIdioma) {
                    let id = await idiomaDAO.getLastId()

                    if (id) {
                        messages.HEADER.status = messages.SUCCESS_CREATED_ITEM.status
                        messages.HEADER.status_code = messages.SUCCESS_CREATED_ITEM.status_code
                        messages.HEADER.message = messages.SUCCESS_CREATED_ITEM.message
                        idioma.id = id
                        messages.HEADER.items.idioma = idioma

                        return messages.HEADER

                    } else {
                        return messages.ERROR_INTERNAL_SERVER_MODEL

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

//Atualizar um idioma existente
const atualizarIdioma = async (id, idioma, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if (idioma.idioma == '' || idioma.idioma == undefined || idioma.idioma == null || idioma.idioma.length > 50) {
                return messages.ERROR_REQUIRED_FIELDS += '[Idioma inválido]'

            } else {
                let resultId = await listarIdiomaId(id)

                if (resultId.status_code == 200) {
                    let resultIdioma = await idiomaDAO.updateLanguage(id, idioma)

                    if (resultIdioma) {
                        messages.HEADER.status = messages.SUCCESS_UPDATED_ITEM.status
                        messages.HEADER.status_code = messages.SUCCESS_UPDATED_ITEM.status_code
                        messages.HEADER.message = messages.SUCCESS_UPDATED_ITEM.message

                        return messages.HEADER

                    } else {
                        return messages.ERROR_INTERNAL_SERVER_MODEL

                    }

                } else {
                    return resultId

                }

            }

        } else {
            return messages.ERROR_CONTENT_TYPE

        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

//Deletar um idioma
const deletarIdioma = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultId = await listarIdiomaId(id)

        if (resultId.status_code == 200) {
            let resultIdioma = await idiomaDAO.deleteLanguage(id)

            if (resultIdioma) {
                messages.HEADER.status = messages.SUCCESS_DELETE_ITEM.status
                messages.HEADER.status_code = messages.SUCCESS_DELETE_ITEM.status_code
                messages.HEADER.message = messages.SUCCESS_DELETE_ITEM.message

                return messages.HEADER

            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL

            }

        } else {
            return resultId

        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

module.exports = {
    listarIdiomas,
    listarIdiomaId,
    inserirIdioma,
    atualizarIdioma,
    deletarIdioma
}