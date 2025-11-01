'use strict'

/**************************************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente ao genero do filme
* Data: 22/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
***************************************************************************************************/

//Import da dependencia do Prisma que permite a execucao de Script SQL no banco de dados
const { PrismaClient } = require('../../generated/prisma')

//Criando um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()


//Função que retorna todos os generos
const getAllGeneros = async () => {
    try {
        let sql = 'select * from tbl_genero order by id desc'

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

//Função que retorna um genero pelo ID
const getGeneroById = async (id) => {
    try {
        let sql = `select * from tbl_genero where id = ${id}`
        
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

//Função que inseri um novo genero
const insertGenero = async (genero) => {
    try {
        let sql = `insert into tbl_genero(genero)
        values('${genero.genero}')`
    
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

//Função que atualiza os dados de um genero pelo ID
const updateGenero = async (id, genero) => {
    try {
        let sql = `update tbl_genero set 
        genero = '${genero.genero}'
        
        where id = ${id}`
    
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

//Função que deleta um genero pelo ID
const deleteGenero = async (id) => {
    try {
        let sql = `delete from tbl_genero where id = ${id}`

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

//Função para obter o último ID de generos
const getLastId = async () => {
    try {
        let sql = 'select id from tbl_genero order by desc limit 1'

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
    getAllGeneros,
    getGeneroById,
    insertGenero,
    updateGenero,
    deleteGenero,
    getLastId
}