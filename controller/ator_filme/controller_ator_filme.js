'use strict'

/****************************************************************************************************************************
* Objetivo: Arquivo responsavel pela manipulacao de dado entre o app e a model para o CRUD na relação entre ator e filme
* Data: 06/12/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
*****************************************************************************************************************************/

const atorFilmeDAO = require('../../model/DAO/ator_filme.js')
const controller_filme = require('../../controller/filme/controller_filme.js')
const controller_ator = require('../../controller/ator/controller_ator.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarAtorFilmes = async () => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let atorFilme = await atorFilmeDAO.getSelectAllActorMovie()

        if (atorFilme) {
            if (atorFilme.length > 0) {
                messages.HEADER.status = messages.SUCCESS_REQUEST.status
                messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                messages.HEADER.message = messages.SUCCESS_REQUEST.message
                messages.HEADER.items.ator_filme = atorFilme

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

const selecionarAtorFilmeId = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (id == !null || id == !undefined || id == !'' || !isNaN(id)) {
            let atorFilme = await atorFilmeDAO.getSelectByIdActorMovie(id)

            if (atorFilme) {
                if (atorFilme.length > 0) {
                    messages.HEADER.status = messages.SUCCESS_REQUEST.status
                    messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                    messages.HEADER.message = messages.SUCCESS_REQUEST.message
                    messages.HEADER.items.ator_filme = atorFilme

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

const selecionarAtoresIdFilme = async (idFilme) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (idFilme == !null || idFilme == !undefined || idFilme == !'' || !isNaN(idFilme)) {
            let atorFilme = await atorFilmeDAO.getSelectActorByIdMovie(idFilme)

            if (atorFilme) {
                if (atorFilme.length > 0) {
                    messages.HEADER.status = messages.SUCCESS_REQUEST.status
                    messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                    messages.HEADER.message = messages.SUCCESS_REQUEST.message
                    messages.HEADER.items.elenco = atorFilme

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

const selecionarFilmesIdAtor = async (idAtor) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (idAtor == !null || idAtor == !undefined || idAtor == !'' || !isNaN(idGenero)) {
            let atorFilme = await atorFilmeDAO.getSelectMovieByIdActor(idAtor)

            if (atorFilme) {
                if (atorFilme.length > 0) {
                    messages.HEADER.status = messages.SUCCESS_REQUEST.status
                    messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                    messages.HEADER.message = messages.SUCCESS_REQUEST.message
                    messages.HEADER.items.filmes = atorFilme

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

const inserirAtorFilme = async (atorFilme, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if (atorFilme.id_filme == '' || atorFilme.id_filme == null || atorFilme.id_filme == undefined || atorFilme.id_ator == '' || atorFilme.id_ator == null || atorFilme.id_ator == undefined) {
                messages.ERROR_REQUIRED_FIELDS.message += '[ID inválido]'
                return messages.ERROR_REQUIRED_FIELDS

            } else {
                let resultAtorFilme = await atorFilmeDAO.setInsertActorMovie(atorFilme)
                if (resultAtorFilme) {
                    let id = await atorFilmeDAO.getSelectLastId()

                    if (id !== false) {

                        messages.HEADER.status = messages.SUCCESS_CREATED_ITEM.status
                        messages.HEADER.status_code = messages.SUCCESS_CREATED_ITEM.status_code
                        messages.HEADER.message = messages.SUCCESS_CREATED_ITEM.message
                        messages.HEADER.items.ator_filme = resultAtorFilme

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

const atualizarAtorFilme = async (id_filme, id_ator, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if (id_filme == '' || id_filme == null || id_filme == undefined || id_ator == '' || id_ator == null || id_ator == undefined) {
                return messages.ERROR_REQUIRED_FIELDS += '[ID inválido]'

            } else {
                let resultId = await controller_ator.listarAtorId(id_ator)

                if (resultId.status_code == 200) {
                    let atorFilme = {
                        id_filme: id_filme,
                        id_ator: id_ator
                    }
                    let atorFilmeAtualizadoInsert = await atorFilmeDAO.setInsertActorMovie(atorFilme)

                    if (atorFilmeAtualizadoInsert.status_code == 200) {
                        messages.HEADER.status = messages.SUCCESS_UPDATED_ITEM.status
                        messages.HEADER.status_code = messages.SUCCESS_UPDATED_ITEM.status_code
                        messages.HEADER.message = messages.SUCCESS_UPDATED_ITEM.message
                        messages.HEADER.items = filmeGenero

                        return messages.HEADER

                    } else {
                        return messages.ERROR_INTERNAL_SERVER_MODEL

                    }



                } else {
                    resultId.message += '[ID não encontrado]'
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

const deletarAtorFilme = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultId = await selecionarAtorFilmeId(id)

        if (resultId.status_code == 200) {
            let atorFilme = await atorFilmeDAO.setDeleteActorMovie(id)

            if (atorFilme) {
                messages.HEADER.status = messages.SUCCESS_DELETE_ITEM.status
                messages.HEADER.status_code = messages.SUCCESS_DELETE_ITEM.status_code
                messages.HEADER.message = messages.SUCCESS_DELETE_ITEM.message
                delete messages.HEADER.items

                return messages.HEADER

            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL

            }

        } else {
            resultId.message += '[ID não encontrado]'
            return resultId

        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

module.exports = {
    deletarAtorFilme,
    atualizarAtorFilme,
    inserirAtorFilme,
    selecionarFilmesIdAtor,
    selecionarAtoresIdFilme,
    selecionarAtorFilmeId,
    listarAtorFilmes
}