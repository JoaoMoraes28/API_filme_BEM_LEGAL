'use strict'

/*****************************************************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente a tabela de diretor
* Data: 07/12/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
******************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

async function getSelectAllDirector() {
    try {
        let sql = "select * from tbl_diretor order by id desc"

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

async function getSelectById(id) {
    try {
        let sql = `SELECT * FROM tbl_diretor WHERE id=${id}`

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

async function setInsertDirector(diretor) {
    try {

        let sql = `INSERT INTO tbl_diretor(nome, data_nascimento, nacionalidade, idade)
                    VALUES('${diretor.nome}'
                            '${diretor.data_nascimento}'
                            ${diretor.nacionalidade}
                            ${diretor.idade}
                    )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true

        } else {
            return false

        }

    } catch (error) {
        return false

    }

}

const getSelectLastId = async () => {
    try {
        let sql = 'select id from tbl_diretor order by id desc limit 1'

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

const updateDirector = async (id, diretor) => {
    try {
        let sql = `update tbl_diretor set
        nome = '${diretor.nome}'
        data_nascimento = '${diretor.data_nascimento}'
        nacionalidade = ${diretor.id_pais}
        idade = ${diretor.idade}
        
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

async function deleteDirector(id_ator) {
    try {
        let sql = `update from tbl_diretor set
                    ativo = false`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true

        } else {
            return false

        }

    } catch (error) {
        return false

    }

}

module.exports = {
    getSelectAllDirector,
    getSelectById,
    setInsertDirector,
    getSelectLastId,
    deleteDirector,
    updateDirector
}