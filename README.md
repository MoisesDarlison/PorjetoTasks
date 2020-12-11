# ProjetoTasks
Pequeno projeto de back-end utilizando javascript, API no modelo RESTfull, com conexão com banco de dados utilizando migrations

# Variáveis de ambiente
Antes de executar a API, você precisa configurar o arquivo .env. Use o exemplo disponível, fornecido neste projeto, para criar o seu.

Você pode copiá-lo executando o seguinte comando no diretório raiz deste projeto:

`$ cp .envExemples .env`

Depois de concluir, você precisará definir as chaves no seu arquivo .env


# Configuração
Antes de executar este projeto, você deve instalar todas as dependências necessárias listadas no arquivo package.json

# Executando migrations
Depois de instalar todas as dependências, antes de iniciar o servidor, é necessário executar algumas migrations para criar os esquemas do banco de dados.

Você pode fazer isso executando:

`$ npx sequelize db:migrate`

Se você precisar reverter as alterações, execute o seguinte comando:

`$ npx sequelize db:migrate:undo:all`

# Executando a API

Depois de concluir todas as etapas anteriores, você estará pronto para começar a usar a API. Inicie o aplicativo executando o seguinte comando:

`$ npm start`

Caso deseje realizar teste em ambiente de desenvolvedor utilizar o comando:

`$ npm run dev`

_A API usa a porta 3333 como padrão, podendo ser alterada nas variáveis de ambiente._

# Executando testes

Você pode executar os testes unitários por meio do Postman ou qualquer outra aplicação do gênero.

# Rotas

## URL Inicial

http://address:port

# USUARIOS

## Novo Usuário

`POST: /users`

## Listar Usuários

`GET: /users/?page=1` - (projeto apresenta paginacao por padrao page=1)

## Listar usuário específico

`GET: /users/ID` - (ID sendo o identificador do usuario desejado)

## Deletar Usuário

`DEL: /users/ID` -(ID sendo o identificador do usuario desejado)

## Auterar  Usuário

`PUT: /users/ID` - (ID sendo o identificador do usuario desejado)

# AUTENTICACAO
## Autenticação do Usuário

`POST: /login` - necessário enviar name e password por meio de JSON pelo Body 
#### Esta operacao retornara um token(Authorization) que sera utilizado parar acessar as tasks deste usuario

# TASKS
### _Qualquer operação com as tasks será necessário enviar a Authorization por meio de headers_

## Nova task
`POST: /task` (enviar os dados title, description e status por meio de JSON pelo Body)

## Listar task

`GET: /task/?page=1` - (projeto apresenta paginação por padrão page=1)

## Listar task especifica

`GET: /task/ID` - (ID sendo o identificador do usuário desejado)

## Deletar task

`DEL: /task/ID` -(ID sendo o identificador do usuário desejado)

## Alterar Usuário

`PUT: /task/ID` - (ID sendo o identificador do usuário desejado)
