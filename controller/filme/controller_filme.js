'use strict'

/**************************************************************************************************
* Objetivo: Arquivo responsavel pela manipulacao de dado entre o app e a model para o CRUD de filmes
* Data: 07/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
***************************************************************************************************/

const filmeDAO = require('../../model/DAO/filme.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os filmes
const listarFilmes = async () => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Chama a função do DAO para retornar a lista de filmes do banco de dados
        let resultFilmes = await filmeDAO.getSelectAllMovies()

        if (resultFilmes) {
            if (resultFilmes.length > 0) {
                messages.HEADER.status = messages.SUCCESS_REQUEST.status
                messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                messages.HEADER.items.filmes = resultFilmes

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

//Retorna um filme filtrando pelo ID
const buscarFilmeId = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != "" && id != null && id > 0) {
            //Chama a função do DAO para retornar um filmes pelo ID
            let resultFilme = await filmeDAO.getSelectByIdMovie(Number(id))

            if (resultFilme) {
                if (resultFilme.length > 0) {
                    messages.HEADER.status = messages.SUCCESS_REQUEST.status
                    messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                    messages.HEADER.items.filme = resultFilme

                    return messages.HEADER
                } else {
                    return messages.ERROR_NOT_FOUND

                }

            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL

            }

        } else {
            messages.ERROR_REQUIRED_FIELDS.message += "[ID incorreto]"
            return messages.ERROR_REQUIRED_FIELDS

        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

//Inseri um filme
const inserirFilme = async (filme, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            // Chama a função de validação dos dados do filme
            let validar = await validarDadosFilme(filme)

            if (!validar) {
                //Processamento
                //Inserir um novo filme no banco de dados
                let resultFilme = await filmeDAO.setInsertMovie(filme)

                if (resultFilme) {
                    let id = await filmeDAO.getSelectLastId()

                    if (id) {
                        filme.id = id
                        messages.HEADER.items.filme = filme
                        messages.HEADER.status = messages.SUCCESS_CREATED_ITEM.status
                        messages.HEADER.status_code = messages.SUCCESS_CREATED_ITEM.status_code
                        messages.HEADER.message = messages.SUCCESS_CREATED_ITEM.message
                        return messages.HEADER

                    } else {
                        return messages.ERROR_INTERNAL_SERVER_MODEL
                    }


                } else {
                    return messages.ERROR_INTERNAL_SERVER_MODEL

                }

            } else {
                return validar

            }

        } else {
            return messages.ERROR_CONTENT_TYPE

        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Atualiza um filme buscando pelo ID
const atualizarFilme = async (filme, id, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            // Chama a função de validação dos dados do filme
            let validar = await validarDadosFilme(filme)

            if (!validar) {
                // Validação de ID, chama função da controller que verifica no banco de dados se o ID existe, e valida o ID
                let validarId = await buscarFilmeId(id)

                if (validarId.status_code == 200) {
                    // Adiciona o ID do filme no JSON de dados para ser encaminhado ao DAO
                    filme.id = Number(id)

                    //Atualiza um novo filme no banco de dados
                    let resultFilme = await filmeDAO.setUpdateMovies(filme)

                    if (resultFilme) {
                        messages.HEADER.status = messages.SUCCESS_UPDATED_ITEM.status
                        messages.HEADER.status_code = messages.SUCCESS_UPDATED_ITEM.status_code
                        messages.HEADER.message = messages.SUCCESS_UPDATED_ITEM.message
                        messages.HEADER.items.filme = filme
                        return messages.HEADER

                    } else {
                        return messages.ERROR_INTERNAL_SERVER_MODEL

                    }

                } else {
                    return validarId //Função buscar filme ID

                }
            } else {
                return validar

            }

        } else {
            return messages.ERROR_CONTENT_TYPE

        }

    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Exclui um filme buscando pelo ID
const excluirFilme = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação de ID, chama função da controller que verifica no banco de dados se o ID existe, e valida o ID
        let validarId = await buscarFilmeId(id)

        if (validarId.status_code == 200) {
            //Atualiza um novo filme no banco de dados
            let resultFilme = await filmeDAO.setDeleteMovie(id)

            if (resultFilme) {
                messages.HEADER.status = messages.SUCCESS_DELETE_ITEM.status
                messages.HEADER.status_code = messages.SUCCESS_DELETE_ITEM.status_code
                messages.HEADER.message = messages.SUCCESS_DELETE_ITEM.message
                delete messages.HEADER.items
                return messages.HEADER

            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL

            }

        } else {
            return validarId //Função buscar filme ID

        }



    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER
    }


}

// Validação dos dados de cadastro e atualização de um filme
const validarDadosFilme = async (filme) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return messages.ERROR_REQUIRED_FIELDS

    } else if (filme.sinopse == undefined) {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Sinopse incorreta]'
        return messages.ERROR_REQUIRED_FIELDS

    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Data Lançamento incorreta]'
        return messages.ERROR_REQUIRED_FIELDS

    } else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 8) {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Duração incorreta]'
        return messages.ERROR_REQUIRED_FIELDS

    } else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.orcamento.length > 14 || typeof (filme.orcamento) != 'number') {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Orçamento incorreto]'
        return messages.ERROR_REQUIRED_FIELDS

    } else if (filme.trailer == undefined || filme.trailer > 200) {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Trailer incorreto]'
        return messages.ERROR_REQUIRED_FIELDS

    } else if (filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 200) {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Capa incorreta]'
        return messages.ERROR_REQUIRED_FIELDS

    } else {
        return false

    }
}

module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}