'use strict'

/*****************************************************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente a tabela de relacionamento ator_filme
* Data: 06/12/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
******************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

async function getSelectAllActorMovie() {
    try {
        let sql = "select * from tbl_ator_filme order by id desc"

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

async function getSelectByIdActorMovie(id) {
    try {
        let sql = `SELECT * FROM tbl_ator_filme WHERE id=${id}`

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

async function getSelectMovieByIdActor(idActor) {
    try {
        let sql = `SELECT tbl_genero.id, tbl_genero.genero 
                        from tbl_filme 
                            JOIN tbl_filme_genero 
                                on tbl_filme.id = tbl_filme_genero.id_filme
                            JOIN tbl_genero 
                                on tbl_genero.id = tbl_filme_genero.id_genero
                        WHERE tbl_filme.id = ${idMovie}`

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

async function getSelectActorByIdMovie(idMovie) {
    try {
        let sql = `SELECT tbl_filme.id, tbl_filme.nome 
                        from tbl_filme 
                            JOIN tbl_filme_genero 
                                on tbl_filme.id = tbl_filme_genero.id_filme
                            JOIN tbl_genero 
                                on tbl_genero.id = tbl_filme_genero.id_genero
                        WHERE tbl_genero.id = ${idGenre}`

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

async function setInsertActorMovie(atorFilme) {
    try {

        let sql = `insert into tbl_ator_filme (id_filme, id_ator)
                    VALUES (${atorFilme.id_filme},
                            ${atorFilme.id_ator}
                            );`

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
        let sql = 'select id from tbl_ator_filme order by id desc limit 1'

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

async function deleteActorIdMovie(id_filme) {
    try {
        let sql = `delete from tbl_ator_filme
        
        WHERE id_filme = ${id_filme}`

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

async function setDeleteActorMovie(id) {
    try {
        let sql = `delete from tbl_ator_filme WHERE id = ${id}`

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
    getSelectAllActorMovie,
    getSelectByIdActorMovie,
    getSelectLastId,
    setInsertActorMovie,
    deleteActorIdMovie,
    setDeleteActorMovie,
    getSelectActorByIdMovie,
    getSelectMovieByIdActor
}