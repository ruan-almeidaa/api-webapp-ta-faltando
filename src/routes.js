const express = require("express");
const routes = express.Router();
const middleware = require("./middleware/auth");

const Usuario = require("../src/controllers/usuarioController");
const ListaDeCompra = require("../src/controllers/listaDeCompraController");
const ItensParaLista = require("../src/controllers/ItemParaListaController");

//Principal rota da aplicação
routes.get('/', Usuario.index);
//routes.get('/',middleware, Usuario.index);

//Rotas de usuário
routes.get('/logar', Usuario.logar);
routes.post('/logar', Usuario.logando);
routes.get('/criar', Usuario.criar);
routes.post('/criar', Usuario.criando);

//Rotas para listas de compras
routes.get('/home', ListaDeCompra.retornaListasDoUsuario);
routes.get('/listas', ListaDeCompra.criar);
routes.post('/listas', ListaDeCompra.criando);
routes.delete('/listas', ListaDeCompra.deletando);

//Rotas para os itens das listas
routes.get("/listas/:id", ItensParaLista.retornaItensDaLista);

module.exports = routes;