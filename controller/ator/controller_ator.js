'use strict'

/**************************************************************************************************
* Objetivo: Arquivo responsavel pela manipulacao de dado entre o app e a model para o CRUD de atores
* Data: 06/12/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
***************************************************************************************************/

const atorDAO = require('../../model/DAO/ator.js')
const paisDAO = require('../pais_origem/controller_pais.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarAtores = async () => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultAtor = await atorDAO.getSelectAllActor()

        if (resultAtor) {
            if (resultAtor.length > 0) {
                let resultAtorFilter = resultAtor.filter(ator => ator.ativo == 1)

                for (let ator of resultAtorFilter) {
                    let pais = await paisDAO.listarPaisId(ator.nacionalidade)

                    if (pais.status_code == 200) {
                        ator.nacionalidade = pais.items.pais[0].pais

                    } else {
                        ator.nacionalidade = 'País não cadastrado'

                    }
                }

                console.log(resultAtor)
                messages.HEADER.status = messages.SUCCESS_REQUEST.status
                messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                messages.HEADER.message = messages.SUCCESS_REQUEST.message
                messages.HEADER.items.atores = resultAtorFilter

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

const listarAtorId = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (id == undefined || id == '' || id == null || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS

        } else {
            let resultAtor = await atorDAO.getSelectById(id)

            if (resultAtor) {
                let resultAtorFilter = resultAtor.filter(ator => ator.ativo == 1)
                if (resultAtorFilter.length > 0) {
                    let pais = await paisDAO.listarPaisId(resultAtor[0].nacionalidade)
                    if (pais.status_code == 200) {
                        messages.HEADER.status = messages.SUCCESS_REQUEST.status
                        messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                        messages.HEADER.message = messages.SUCCESS_REQUEST.message
                        resultAtor.nacionalidade = pais.items.pais[0].pais
                        messages.HEADER.items.ator = resultAtor

                        return messages.HEADER
                    } else {
                        messages.ERROR_NOT_FOUND.message += '[País não encontrado]'
                        return messages.ERROR_NOT_FOUND

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

const inserirAtor = async (ator, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultValidar = await validarDadosAtor(ator)

            if (!resultValidar) {
                return resultValidar

            } else {
                let resultAtor = await atorDAO.setInsertActor(ator)

                if (resultAtor) {
                    let id = await atorDAO.getSelectLastId()
                    if (id) {
                        let pais = await paisDAO.listarPaisId(ator.nacionalidade)

                        if (pais.status_code == 200) {
                            messages.HEADER.status = messages.SUCCESS_CREATED_ITEM.status
                            messages.HEADER.status_code = messages.SUCCESS_CREATED_ITEM.status_code
                            messages.HEADER.message = messages.SUCCESS_CREATED_ITEM.message
                            ator.nacionalidade = pais.items.pais[0].pais
                            ator.id = id
                            messages.HEADER.items.ator = ator

                            return messages.HEADER
                        } else {
                            messages.ERROR_NOT_FOUND.message += '[País não encontrado]'
                            return messages.ERROR_NOT_FOUND
                        }

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

const atualizarAtor = async (id, ator, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultValidar = validarDadosAtor(ator)

            if (!resultValidar) {
                return resultValidar

            } else {
                let resultId = await listarAtorId(id)
                if (resultId.status_code == 200) {
                    let resultAtor = await atorDAO.updateActor(id, ator)

                    if (resultAtor) {
                        messages.HEADER.status = messages.SUCCESS_UPDATED_ITEM.status
                        messages.HEADER.status_code = messages.SUCCESS_UPDATED_ITEM.status_code
                        messages.HEADER.message = messages.SUCCESS_UPDATED_ITEM.message
                        delete messages.HEADER.items

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

const deletarAtor = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultId = await listarAtorId(id)

        if (resultId.status_code == 200) {
            let resultAtor = await atorDAO.deleteActor(id)

            if (resultAtor) {
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

const validarDadosAtor = async (ator) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (ator.nome == '' || ator.nome == undefined || ator.nome == null || ator.nome.length > 200) {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return messages.ERROR_REQUIRED_FIELDS

    } else if (ator.data_nascimento == '' || ator.data_nascimento == undefined || ator.data_nascimento == null || ator.data_nascimento instanceof Date) {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Data Nascimento incorreta]'
        return messages.ERROR_REQUIRED_FIELDS

    } else if (ator.idade == '' || ator.idade == undefined || ator.idade == null || ator.idade.length > 3 || typeof (ator.idade) != 'number') {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Idade incorreta]'
        return messages.ERROR_REQUIRED_FIELDS

    } else if (ator.nacionalidade == '' || ator.nacionalidade == undefined || ator.nacionalidade == null || typeof (ator.nacionalidade) != 'number') {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Nacionalidade incorreta]'
        return messages.ERROR_REQUIRED_FIELDS

    } else {
        return true

    }
}

module.exports = {
    listarAtores,
    listarAtorId,
    inserirAtor,
    atualizarAtor,
    deletarAtor
}