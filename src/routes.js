const Sequelize = require ("sequelize");
const express = require("express");
const routes = express.Router();
const middleware = require("./middleware/auth");

const Usuario = require("../src/controllers/usuarioController");
const ListaDeCompra = require("../src/controllers/listaDeCompraController");
const ItensParaLista = require("../src/controllers/ItemParaListaController");
const Erros = require("./controllers/errosController");

try {

    //Principal rota da aplicação
    routes.get('/', Usuario.index);
    //routes.get('/',middleware, Usuario.index);
    
    //Rotas de usuário
    routes.get('/logar', Usuario.logar);
    routes.post('/logar', Usuario.logando);
    routes.get('/cadastrar', Usuario.cadastrar);
    routes.post('/cadastrar', Usuario.cadastrando);
    
    //Rotas para listas de compras
    routes.get('/home', ListaDeCompra.retornaListasDoUsuario);
    routes.get('/lista', ListaDeCompra.criar);
    routes.post('/lista', ListaDeCompra.criando);
    routes.delete('/lista', ListaDeCompra.deletando);
    routes.get("/lista/:id", ItensParaLista.retornaItensDaLista);
    
    //Rotas para os itens das listas
    routes.post("/lista/itens", ItensParaLista.criaItemNaLista);

    //Rotas para compartilhamento de listas
    routes.post('/lista/compartilhar/:id', ListaDeCompra.compartilhandoLista);
    
} catch (error) {
    
}





module.exports = routes;