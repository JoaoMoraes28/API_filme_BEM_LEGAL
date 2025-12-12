'use strict'

/**************************************************************************************************
* Objetivo: Arquivo responsavel pela manipulacao de dado entre o app e a model para o CRUD de atores
* Data: 06/12/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
***************************************************************************************************/

const diretorDAO = require('../../model/DAO/diretor.js')
const paisDAO = require('../pais_origem/controller_pais.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

const listarDiretores = async () => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultDiretor = await diretorDAO.getSelectAllDirector()

        if (resultDiretor) {
            if (resultDiretor.length > 0) {
                let resultDiretorFilter = resultDiretor.filter(diretor => diretor.ativo == 1)

                for (let diretor of resultDiretorFilter) {
                    let pais = await paisDAO.listarPaisId(diretor.nacionalidade)
                    
                    if (pais.status_code == 200) {
                        diretor.nacionalidade = pais.items.pais[0].pais

                    } else {
                        diretor.nacionalidade = 'País não cadastrado'

                    }
                }

                messages.HEADER.status = messages.SUCCESS_REQUEST.status
                messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                messages.HEADER.message = messages.SUCCESS_REQUEST.message
                messages.HEADER.items.diretores = resultDiretorFilter

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

const listarDiretorId = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (id == undefined || id == '' || id == null || isNaN(id)) {
            return messages.ERROR_REQUIRED_FIELDS

        } else {
            let resultDiretor = await diretorDAO.getSelectById(id)

            if (resultDiretor) {
                if (resultDiretor.length > 0 && resultDiretor[0].ativo == 1) {
                    let pais = await paisDAO.listarPaisId(resultDiretor[0].nacionalidade)

                    if (pais.status_code == 200) {
                        messages.HEADER.status = messages.SUCCESS_REQUEST.status
                        messages.HEADER.status_code = messages.SUCCESS_REQUEST.status_code
                        messages.HEADER.message = messages.SUCCESS_REQUEST.message
                        resultDiretor.nacionalidade = pais.items.pais[0].pais
                        messages.HEADER.items.diretor = resultDiretor

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

const inserirDiretor = async (diretor, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultValidar = await validarDadosDiretor(diretor)

            if (resultValidar != false) {
                return resultValidar

            } else {
                let resultDiretor = await diretorDAO.setInsertDirector(diretor)

                if (resultDiretor) {
                    let id = await diretorDAO.getSelectLastId()
                    if (id) {
                        let pais = await paisDAO.listarPaisId(diretor.nacionalidade)

                        if (pais.status_code == 200) {
                            messages.HEADER.status = messages.SUCCESS_CREATED_ITEM.status
                            messages.HEADER.status_code = messages.SUCCESS_CREATED_ITEM.status_code
                            messages.HEADER.message = messages.SUCCESS_CREATED_ITEM.message
                            diretor.nacionalidade = pais.items.pais[0].pais
                            diretor.id = id
                            messages.HEADER.items.diretor = diretor

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

const atualizarDiretor = async (id, diretor, contentType) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultValidar = validarDadosDiretor(diretor)

            if (!resultValidar) {
                return resultValidar

            } else {
                let resultId = await listarDiretorId(id)

                if (resultId.status_code == 200) {
                    let resultDiretor = await diretorDAO.updateDirector(id, diretor)

                    if (resultDiretor) {
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

const deletarDiretor = async (id) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let resultId = await listarDiretorId(id)

        if (resultId.status_code == 200) {
            let resultDiretor = await diretorDAO.deleteDirector(id)

            if (resultDiretor) {
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

const validarDadosDiretor = async (diretor) => {
    let messages = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (diretor.nome == '' || diretor.nome == undefined || diretor.nome == null || diretor.nome.length > 200 || !isNaN(diretor.nome)) {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return messages.ERROR_REQUIRED_FIELDS

    } else if (diretor.data_nascimento == '' || diretor.data_nascimento == undefined || diretor.data_nascimento == null || diretor.data_nascimento instanceof Date) {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Data Nascimento incorreta]'
        return messages.ERROR_REQUIRED_FIELDS

    } else if (diretor.idade == '' || diretor.idade == undefined || diretor.idade == null || diretor.idade.length > 3 || typeof (diretor.idade) != 'number') {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Idade incorreta]'
        return messages.ERROR_REQUIRED_FIELDS

    } else if (diretor.nacionalidade == '' || diretor.nacionalidade == undefined || diretor.nacionalidade == null || typeof (diretor.nacionalidade) != 'number') {
        messages.ERROR_REQUIRED_FIELDS.message += ' [Nacionalidade incorreta]'
        return messages.ERROR_REQUIRED_FIELDS

    } else {
        return false

    }
}

module.exports = {
    listarDiretores,
    listarDiretorId,
    inserirDiretor,
    atualizarDiretor,
    deletarDiretor
}