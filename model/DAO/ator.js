'use strict'

/*****************************************************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente a tabela de ator
* Data: 06/12/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
******************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

async function getSelectAllActor() {
    try {
        let sql = "select * from tbl_ator order by id desc"

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
        let sql = `SELECT * FROM tbl_ator WHERE id=${id}`

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

async function setInsertActor(ator) {
    try {

        let sql = `INSERT INTO tbl_ator(nome, data_nascimento, nacionalidade, idade)
                    VALUES('${ator.nome}',
                            '${ator.data_nascimento}',
                            ${ator.nacionalidade},
                            ${ator.idade}
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
        let sql = 'select id from tbl_ator order by id desc limit 1'

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

const updateActor = async (id, ator) => {
    try {
        let sql = `update tbl_ator set
        nome = '${ator.nome}',
        data_nascimento = '${ator.data_nascimento}',
        nacionalidade = ${ator.nacionalidade},
        idade = ${ator.idade}
        
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

async function deleteActor(id_ator) {
    try {
        let sql = `update tbl_ator set
                    ativo = false
                    WHERE id = ${id_ator}`

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
    getSelectAllActor,
    getSelectById,
    setInsertActor,
    getSelectLastId,
    deleteActor,
    updateActor
}