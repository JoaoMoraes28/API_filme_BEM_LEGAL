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

show tables;

select * from tbl_filme;

insert into tbl_filme (
	nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa
)
VALUES (
	"O Senhor dos Anéis - O Retorno do Rei",
    "Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf (Ian McKellen) e Pippin (Billy Boyd) partam para o local na intenção de ajudar a resistência. Um exército é reunido por Theoden (Bernard Hill) em Rohan, em mais uma tentativa de deter as forças de Sauron. Enquanto isso Frodo (Elijah Wood), Sam (Sean Astin) e Gollum (Andy Serkins) seguem sua viagem rumo à Montanha da Perdição, para destruir o Um Anel.",
    "2003-12-25",
    "3:21",
    95000000, 
    "https://www.adorocinema.com/filmes/filme-39187/trailer-19390959/",
    "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/91/47/20224867.jpg"
);

insert into tbl_filme (
	nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa
)
VALUES (
	"Como treinar o seu Dragão",
    "Na ilha de Berk, os vikings dedicam a vida a combater e matar dragões. Soluço (Jay Baruchel), filho do chefe Stoico (Gerard Butler), não é diferente. Ele sonha em matar um dragão e provar seu valor ao pai, apesar da descrença geral. Um dia, por acaso, ele acerta um dragão que jamais foi visto, chamado Fúria da Noite. Ao procurá-lo, no dia seguinte, Soluço não consegue matá-lo e acaba soltando-o. Só que ele perdeu parte da cauda e, com isso, não consegue mais voar. Soluço passa a trabalhar em um artefato que possa substituir a parte perdida e, aos poucos, se aproxima do dragão. Só que, paralelamente, Stoico autoriza que o filho participe do treino para dragões, cuja prova final é justamente matar um dos animais.",
    "2010-03-26",
    "1:33",
    160000000, 
    "https://www.adorocinema.com/filmes/filme-123534/",
    "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/90/36/19962735.jpg"
);

insert into tbl_filme (
	nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa
)
VALUES (
	"Piratas do Caribe",
    "Em pleno século XVII, o pirata Jack Sparrow (Johnny Depp) tem seu navio saqueado e roubado pelo capitão Barbossa (Geoffrey Rush) e sua tripulação. Com o navio de Sparrow, Barbossa invade e saqueia a cidade de Port Royal, levando consigo Elizabeth Swann (Keira Knightley), a filha do governador (Jonathan Pryce). Decidido a recuperar sua embarcação, Sparrow recebe a ajuda de Will Turner (Orlando Bloom), um grande amigo de Elizabeth que parte em seu encalço. Porém, o que ambos não sabem é que o Pérola Negra, navio de Barbossa, foi atingido por uma terrível maldição que faz com que eles naveguem eternamente pelos oceanos e se transformem em esqueletos à noite.",
    "2003-08-29",
    "2:23",
    410600000, 
    "https://www.adorocinema.com/filmes/filme-46117/",
    "https://br.web.img3.acsta.net/c_310_420/pictures/14/02/06/15/11/493568.jpg"
);