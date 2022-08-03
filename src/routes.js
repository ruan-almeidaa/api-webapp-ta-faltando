const express = require("express");
const routes = express.Router();
const middleware = require("./middleware/auth");

const Usuario = require("../src/controllers/usuarioController");

// Principal rota da aplicação
routes.get('/',Usuario.index);

// Rotas de usuário
routes.get('/logar', Usuario.logar);
routes.post('/logar', Usuario.logando);
routes.get('/criar', Usuario.criar);
routes.post('/criar', Usuario.criando);

module.exports = routes;