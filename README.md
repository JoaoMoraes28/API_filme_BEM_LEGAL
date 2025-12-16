# API de Gerenciamento de Filmes
Esta API foi desenvolvida para facilitar o controle e a manipulação de dados relacionados a filmes, oferecendo endpoints organizados e intuitivos para operações CRUD (Create, Read, Update, Delete).

## Estrutura da API
A API é dividida em 5 módulos:
- Filme
- Gênero
- Classificação Indicativa
- Idioma
- País de Origem
- Ator
- Diretor

***

Cada módulo possui as seguintes funcionalidades:
- **GET / :** Lista todos os registros
- **GET /{id}:** Retorna um registro
- **POST / :** Insere um novo registro
- **PUT /{id}:** Atualiza um registro existente
- **DELETE /{id}:** Remove um registro

Exemplos de Endpoint:
* /v1/locadora/filme
* /v1/locadora/filme/{id}

**_Para utilizar o banco, entre na pasta DB_SQL copie o código do arquivo SQL_Script_Filmes e rode na ferramenta de modelagem de banco._**

**_ Para utilizar a API, clone o repositório localmente, crie um arquivo .env contendo DATABASE_URL com a url do banco local. No cmd rode os comandos: npm i, npx migrate dev, npx migrate reset e node .\app.js_**

## Documentação
A documentação completa da API pode ser visualizada via Swagger Editor. Nela se pode encontrar detalhes sobre os parâmetros, exemplos de requisição e respostas. **_Copie o arquivo e cole no Swagger Editor (Anexada na pasta 'documentacao')_**

## Tecnologias Utilizadas
* Node.js / Express e Prisma
* Swagger
* JSON como formato de troca de dados

### Contato
* joaovictor.moraes2728@gmail.com
* (11) 93203-1280
* [Linkedin](https://www.linkedin.com/in/jo%C3%A3o-victor-santos-de-moraes-0b6532270/)

---
_Projeto desenvolvido por João Victor Santos de Moraes_