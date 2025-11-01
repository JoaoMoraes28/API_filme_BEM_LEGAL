'use strict'

/**************************************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente ao idioma do filme
* Data: 22/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
***************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

//Função para listar todos os idiomas
const getAllLanguage = async () => {
    try {
        let sql = 'select * from tbl_idioma order by desc'

        let result = await prisma.$queryRawUnsafe(sql)
        if (result) {
            return result

        } else {
            return false

        }

    } catch (error) {
        return false

    }
}

//Função para listar um idioma pelo ID
const getLanguageId = async (id) => {
    try {
        let sql = `select * from tbl_idioma where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)
        if (result) {
            return result

        } else {
            return false

        }

    } catch (error) {
        return false

    }
}

//Função para inserir um novo idioma
const insertLanguage = async (idioma) => {
    try {
        let sql = `insert into tbl_idioma(idioma)
        values('${idioma.idioma}')`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return result

        } else {
            return false

        }

    } catch (error) {
        return false

    }
}

//Função para atualizar um idioma
const updateLanguage = async (id, idioma) => {
    try {
        let sql = `update tbl_idioma set
        idioma = '${idioma.idioma}'
        
        where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return result

        } else {
            return false

        }

    } catch (error) {
        return false

    }
}

//Função para deletar um idioma
const deleteLanguage = async (id) => {
    try {
        let sql = `delete from tbl_idioma where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return result

        } else {
            return false

        }

    } catch (error) {
        return false

    }
}

//Função para obter o último ID de idiomas
const getLastId = async () => {
    try {
        let sql = 'select id from tbl_idioma order by desc limit 1'

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            return Number(result[0].id)

        } else {
            return false

        }

    } catch (error) {
        return false

    }

}

module.exports = {
    getAllLanguage,
    getLanguageId,
    insertLanguage,
    updateLanguage,
    deleteLanguage,
    getLastId
}