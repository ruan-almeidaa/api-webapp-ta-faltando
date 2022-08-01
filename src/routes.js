const express = require("express");
const routes = express.Router();

const Usuario = require("../src/controllers/usuarioController");

// Principal rota da aplicação
routes.get('/', Usuario.index);

// Rotas de usuário
routes.get('/logar', Usuario.logar);
routes.post('logar', Usuario.logando);

module.exports = routes;