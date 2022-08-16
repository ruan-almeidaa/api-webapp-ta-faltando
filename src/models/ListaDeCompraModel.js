const Sequelize = require ("sequelize");
const conexao = require("../../database/database");
const UsuarioModel = require("../models/UsuarioModel");

const listaDeCompraModel = conexao.define('listas',{
    idLista:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    tituloLista:{
        type: Sequelize.STRING,
        allowNull: false
    }

});

listaDeCompraModel.belongsTo(UsuarioModel); //uma lista de compras tem um usuário proprietário.
UsuarioModel.hasMany(listaDeCompraModel); //um usuario tem várias listas de compras.

listaDeCompraModel.sync({force:false});
module.exports = listaDeCompraModel;