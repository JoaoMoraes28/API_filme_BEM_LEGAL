'use strict'

/**********************************************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente a classificacao indicativa do filme
* Data: 29/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
***********************************************************************************************************/

//Import da dependencia do Prisma que permite a execucao de Script SQL no banco de dados
const { PrismaClient } = require('../../generated/prisma')

//Criando um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Função que retorna todos as classificações
const getAllClas = async () => {
    try {
        let sql = 'select * from tbl_classificacao_indicativa order by id desc'

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

//Função que retorna uma classificação pelo ID
const getClasById = async (id) => {
    try {
        let sql = `select * from tbl_classificacao_indicativa where id = ${id}`

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

//Função que inseri uma nova classificação
const insertClas = async (clas) => {
    try {
        let sql = `insert into tbl_classificacao_indicativa (classificacao)
        values ('${clas.classificacao}')`

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

//Função que atualiza uma classificação
const updateClas = async (id, clas) => {
    try {
        let sql = `update tbl_classificacao_indicativa 
        set classificacao = '${clas.classificacao}' 
        
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

//Função que deleta uma classificação
const deleteClas = async (id) => {
    try {
        let sql = `delete from tbl_classificacao_indicativa where id = ${id}`
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
        let sql = 'select id from tbl_classificacao_indicativa order by desc limit 1'

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
    getAllClas,
    getClasById,
    insertClas,
    updateClas,
    deleteClas,
    getLastId
}