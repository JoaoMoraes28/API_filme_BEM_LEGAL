'use strict'

/****************************************************************************************************************************
* Objetivo: Arquivo responsavel pela manipulacao de dado entre o app e a model para o CRUD na relação entre filme e gênero
* Data: 05/11/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
*****************************************************************************************************************************/

const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')
const controller_genero = require('../../controller/genero/controller.genero.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os filme_genero
const listarFilmeGeneros = async () => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let filmeGenero = await filmeGeneroDAO.getSelectAllMovieGenres()

        if (filmeGenero) {
            if (filmeGenero.length > 0) {
                messages.HEADER.status = messages.SUCCESS_REQUEST.status
                messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                messages.HEADER.message = messages.SUCCESS_REQUEST.message
                messages.HEADER.items.filmes_generos = filmeGenero

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

//Retorna um filme_genero buscando pelo seu ID
const selecionarFilmeGenerosId = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (id == !null || id == !undefined || id == !'' || !isNaN(id)) {
            let filmeGenero = await filmeGeneroDAO.getSelectByIdMovieGenres(id)

            if (filmeGenero) {
                if (filmeGenero.length > 0) {
                    messages.HEADER.status = messages.SUCCESS_REQUEST.status
                    messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                    messages.HEADER.message = messages.SUCCESS_REQUEST.message
                    messages.HEADER.items.genero = filmeGenero

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

//Retorna uma lista de generos buscando pelo ID do filme
const selecionarGenerosIdFilme = async (idFilme) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (idFilme == !null || idFilme == !undefined || idFilme == !'' || !isNaN(idFilme)) {
            let filmeGenero = await filmeGeneroDAO.getSelectGenresByIdMovie(idFilme)

            if (filmeGenero) {
                if (filmeGenero.length > 0) {
                    messages.HEADER.status = messages.SUCCESS_REQUEST.status
                    messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                    messages.HEADER.message = messages.SUCCESS_REQUEST.message
                    messages.HEADER.items.genero = filmeGenero

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

//Retorna um alista de filmes buscando pelo ID do genero
const selecionarFilmesIdGenero = async (idGenero) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (idGenero == !null || idGenero == !undefined || idGenero == !'' || !isNaN(idGenero)) {
            let filmeGenero = await filmeGeneroDAO.getSelectMoviesByIdGenre(idGenero)

            if (filmeGenero) {
                if (filmeGenero.length > 0) {
                    messages.HEADER.status = messages.SUCCESS_REQUEST.status
                    messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                    messages.HEADER.message = messages.SUCCESS_REQUEST.message
                    messages.HEADER.items.genero = filmeGenero

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

//Inseri um novo filme_genero na tabela
const inserirFilmeGeneros = async (filmeGenero, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if (filmeGenero.id_filme == '' || filmeGenero.id_filme == null || filmeGenero.id_filme == undefined || filmeGenero.id == '' || filmeGenero.id == null || filmeGenero.id == undefined) {
                messages.ERROR_REQUIRED_FIELDS.message += '[ID inválido]'
                return messages.ERROR_REQUIRED_FIELDS

            } else {
                let resultFilmeGenero = await filmeGeneroDAO.setInsertMovieGenres(filmeGenero)

                if (resultFilmeGenero) {
                    let id = await filmeGeneroDAO.getSelectLastId()

                    if (id) {
                        messages.HEADER.status = messages.SUCCESS_CREATED_ITEM.status
                        messages.HEADER.status_code = messages.SUCCESS_CREATED_ITEM.status_code
                        messages.HEADER.message = messages.SUCCESS_CREATED_ITEM.message
                        filmeGenero.id = id
                        messages.HEADER.items.genero = resultFilmeGenero

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

//Função para atualizar um filme_genero
const atualizarFilmeGeneros = async (id, filmeGenero, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if (id == '' || id == null || id == undefined || filmeGenero.id == '' || filmeGenero.id == null || filmeGenero.id == undefined) {
                return messages.ERROR_REQUIRED_FIELDS += '[ID inválido]'

            } else {
                let resultId = await controller_genero.selecionarGeneroId(filmeGenero.id)

                if (resultId.status_code == 200) {
                    filmeGenero.id_filme = id
                    let filmeGeneroAtualizadoInsert = await filmeGeneroDAO.setInsertMovieGenres(filmeGenero)

                    if (filmeGeneroAtualizadoInsert.status_code == 200) {
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

//Função para deletar filme_genero
const deletarFilmeGeneros = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultId = await selecionarFilmeGenerosId(id)

        if (resultId.status_code == 200) {
            let filmeGenero = await filmeGeneroDAO.setDeleteMovieGenres(id)

            if (filmeGenero) {
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
    listarFilmeGeneros,
    selecionarFilmeGenerosId,
    inserirFilmeGeneros,
    atualizarFilmeGeneros,
    deletarFilmeGeneros,
    selecionarGenerosIdFilme,
    selecionarFilmesIdGenero
}