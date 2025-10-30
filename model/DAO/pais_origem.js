'use strict'

/**************************************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente ao pais de origem
* Data: 22/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
***************************************************************************************************/

// Import da dependencia do Prisma que permite a execucao de Script SQL no banco de dados
const { PrismaClient } = require('../../generated/prisma')

//Criando um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Função para obter todos os paises de origem
const getAllCountry = async () => {
    try {
        let sql = 'select * from tbl_pais_origem order by id desc'

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

//Função para obter um pais pelo seu ID
const getCountryId = async (id) => {
    try {
        let sql = `select * from tbl_pais_origem where id = ${id}`

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

//Função para inserir um novo pais
const insertCountry = async (pais) => {
    try {
        let sql = `insert into tbl_pais_origem(pais)
        values('${pais.pais}')`

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

//Função para atualizar os dados de um pais existente
const updateCountry = async (pais, id) => {
    try {
        let sql = `update tbl_pais_origem set
        pais = '${pais.pais}'
        
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

//Função para deletar um pais do banco
const deleteCountry = async (id) => {
    try {
        let sql = `delete from tbl_pais_origem where id = ${id}`

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

module.exports = {
    getAllCountry,
    getCountryId,
    insertCountry,
    updateCountry,
    deleteCountry
}