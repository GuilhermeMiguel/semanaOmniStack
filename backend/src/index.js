const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // ./ ---> Pra dizer que esta na mesma pasta 
//e nao é uma dependencia de algo externo


const app = express();

app.use(cors()); // -> se eu estiver em produção eu posso dizer qual front pode acessar essa api
app.use(express.json());
app.use(routes);


app.listen(3333);

/* 

Tipos de parâmetros

*Query Params: Parâmetros nomeados enviados na rota após "?" (servem para filtros, paginação)
*Route Params: Parâmetros utilizados para identificar recursos
*Request Body: Corpo da requisição utilizado para criar ou alterar recursos
*/

/* 

Bancos de Dados
*Posso instalar o Driver para fazer as manipulações no bd:
*Query Builder (uma especie de orm para js): table('users').select('*').where()
*/