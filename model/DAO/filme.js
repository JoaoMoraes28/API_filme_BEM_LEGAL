'use strict'

/**************************************************************************************************
* Objetivo: Arquivo responsavel pelo CRUD de dados no MySQL referente ao filme
* Data: 01/10/2025
* Autor: Joao Victor Santos de Moraes
* Versao: 1.0 
***************************************************************************************************/

/*
    Exemplos de dependencias para conexao com banco de dados
       Banco de dados Relacionais
            Sequelize   -> Foi utilizado em muitos projetos desde o inicio do Node
            Prisma      -> E uma dependencia atual que trabalha com BD (SQL ou ORM)
                npm install prisma --save               -> instalar o prisma (Conexao com o DATABSE)
                npm install @prisma/client --save       -> instalar o cliente do prsima (Executar scripts SQL no banco)
                npx prisma init                         -> prompt de comando para inicializar o prisma
                npx prisma migrate dev                  -> realiza o sincronismo entre o prisma e o BD (CUIDADE, nesse processo voce podera perder dados reais do banco,
                                                           pois ele pega e cria as tabelas programadas no ORM schema.prisma)

                npx prisma generate                     -> apenas realiza o sicronismo entre o prisma e o BD, geralmente usamos para rodar o projeto em um PC novo

            Knex        -> E uma dependencia atual que trabalha com MySQL
    
        Banco de dados Nao Relacional
            Mongoose    -> E uma dependencia para o Mongo DB (Nao relacional)
*/

//$queryRawUnsafe e usado para executar um comando SQL que ira devolver um valor (SELECT)
//$executeRawUnsafe e usado para executar um comando SQL que nao devolve um valor (INSERT, UPDATE, DELETE)

//$executeRaw e usado para executar um comando SQL que nao devolve um valor e sem estar em uma variavel e faz tratamento de seguranca contra SQL Injection
//$queryRaw e usado para executar um comando SQL que devolve um valor e sem estar em uma variavel e faz tratamento de seguranca contra SQL Injection

//Import da dependencia do Prisma que permite a execucao de Script SQL no banco de dados
const { PrismaClient } = require('../../generated/prisma')

//Criando um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os filmes do banco de dados
async function getSelectAllMovies() {
    try {
        //Scrip SQL
        let sql = "select * from tbl_filme order by id desc"
        //Encaminha para o banco de dados o script SQL
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

//Retorna um filme filtrando pelo ID no banco de dados
async function getSelectByIdMovie(id) {
    try {
        //Scrip SQL
        let sql = `SELECT * FROM tbl_filme WHERE id=${id}`
        //Encaminha para o banco de dados o script SQL
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

//Insere um filme novo no banco de dados
async function setInsertMovie(filme) {
    try {
        let sql = `insert into tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
                    VALUES ('${filme.nome}',
                            '${filme.sinopse}',
                            '${filme.data_lancamento}',
                            '${filme.duracao}',
                            '${filme.orcamento}',
                            '${filme.trailer}',
                            '${filme.capa}'
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

//Retorna o ultimo ID da table de filmes
const getSelectLastId = async () => {
    try {
        let sql = 'select id from tbl_filme order by id desc limit 1'
        
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

//Altera um filme no banco de dados
async function setUpdateMovies(filme) {
    try {
        let sql = `update tbl_filme set 
        nome = '${filme.nome}',
        sinopse = '${filme.sinopse}',
        data_lancamento = '${filme.data_lancamento}',
        duracao = '${filme.duracao}',
        orcamento = '${filme.orcamento}',
        trailer = '${filme.trailer}',
        capa = '${filme.capa}'
        
        WHERE id = ${filme.id}`

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

//Exclui um filme pelo ID no banco de dados
async function setDeleteMovie(id) {
    try {
        let sql = `delete from tbl_filme WHERE id = ${id}`

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
    getSelectAllMovies,
    getSelectByIdMovie,
    setInsertMovie,
    setUpdateMovies,
    setDeleteMovie,
    getSelectLastId
}