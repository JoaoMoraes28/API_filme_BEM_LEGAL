CREATE DATABASE db_locadora_filme_ds2m_25_2;

USE db_locadora_filme_ds2m_25_2;

CREATE TABLE tbl_filme (
	id int PRIMARY KEY auto_increment not null,
	nome varchar(100) not null,
	sinopse text null,
	data_lancamento date null,
	duracao time not null,
	orcamento DECIMAL(11,2) not null,
	trailer varchar(200) null,
	capa varchar(200) not null
);

CREATE TABLE tbl_pais_origem (
    id int PRIMARY KEY auto_increment not null,
    pais varchar(50) not null
)

CREATE TABLE tbl_idoma (
    id int PRIMARY KEY auto_increment not null,
    idioma varchar(50) not null
)

CREATE TABLE tbl_genero (
    id int PRIMARY KEY auto_increment not null,
    genero varchar(50) not null
)

CREATE TABLE tbl_classificacao_indicativa (
    id int PRIMARY KEY auto_increment not null,
    classificacao varchar(50) not null
)

CREATE TABLE tbl_ator (
    id int PRIMARY KEY auto_increment not null,
    nome varchar(200) not null,
    data_nascimento date not null,
    nacionalidade int not null,
    idade int not null,

    CONSTRAINT fk_ator_pais
    FOREIGN KEY (nacionalidade) REFERENCES tbl_pais_origem(id)
)

CREATE TABLE tbl_diretor (
    id int PRIMARY KEY auto_increment not null,
    nome varchar(200) not null,
    data_nascimento date not null,
    nacionalidade int not null,
    idade int not null,

    CONSTRAINT fk_diretor_pais
    FOREIGN KEY (nacionalidade) REFERENCES tbl_pais_origem(id)
)

CREATE TABLE tbl_filme_genero (
    id int PRIMARY KEY auto_increment not null,
    id_filme int not null,
    id_genero int not null,

    CONSTRAINT fk_filme_genero
    FOREIGN KEY (id_filme) REFERENCES tbl_filme(id),

    CONSTRAINT fk_genero_filme
    FOREIGN KEY (id_genero) REFERENCES tbl_genero(id)
)

CREATE TABLE tbl_ator_filme (
    id int PRIMARY KEY auto_increment not null,
    id_filme int not null,
    id_ator int not null,

    CONSTRAINT fk_filme_ator
    FOREIGN KEY (id_filme) REFERENCES tbl_filme(id),

    CONSTRAINT fk_ator_filme
    FOREIGN KEY (id_ator) REFERENCES tbl_ator(id)
)