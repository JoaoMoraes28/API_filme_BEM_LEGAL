'use strict'

/*****************************************************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente a tabela de relacionamento filme_genero
* Data: 05/11/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
******************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

//Retorna todos os filme_genero
async function getSelectAllMovieGenres() {
    try {
        let sql = "select * from tbl_filme_genero order by id desc"

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

//Retorna um filme_genero filtrando pelo ID no banco de dados
async function getSelectByIdMovieGenres(id) {
    try {
        let sql = `SELECT * FROM tbl_filme_genero WHERE id=${id}`

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

//Retorna os generos de um filme filtrando pelo ID no banco de dados
async function getSelectGenresByIdMovie(idMovie) {
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

//Retorna os generos de um filme filtrando pelo ID no banco de dados
async function getSelectMoviesByIdGenre(idGenre) {
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

//Insere um filme_genero novo no banco de dados
async function setInsertMovieGenres(filmeGenero) {
    try {

        let sql = `insert into tbl_filme_genero (id_filme, id_genero)
                    VALUES (${filmeGenero.id_filme},
                            ${filmeGenero.id}
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

//Retorna o ultimo ID da table de filme_genero
const getSelectLastId = async () => {
    try {
        let sql = 'select id from tbl_filme_genero order by id desc limit 1'

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

//Altera um filme_genero no banco de dados
async function deleteGenresIdFilme(id_filme) {
    try {
        let sql = `delete from tbl_filme_genero
        
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

//Exclui um filme_genero pelo ID no banco de dados
async function setDeleteMovieGenres(id) {
    try {
        let sql = `delete from tbl_filme_genero WHERE id = ${id}`

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
    getSelectAllMovieGenres,
    getSelectByIdMovieGenres,
    getSelectLastId,
    setInsertMovieGenres,
    deleteGenresIdFilme,
    setDeleteMovieGenres,
    getSelectMoviesByIdGenre,
    getSelectGenresByIdMovie
}