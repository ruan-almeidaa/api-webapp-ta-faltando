const Sequelize = require ("sequelize");
const conexao = require("../../database/database");
const listaDeCompraModel = require("./ListaDeCompraModel");
const UsuarioModel = require("./UsuarioModel");

const ItemParaListaModel = conexao.define('itens',{
    idItem:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    nomeItem:{
        type: Sequelize.STRING,
        allowNull: false
    },

});


ItemParaListaModel.belongsTo(listaDeCompraModel); //um item tem uma lista de compras.
listaDeCompraModel.hasMany(ItemParaListaModel); //uma lista de compras tem vários itens.

ItemParaListaModel.sync({force:false});

module.exports = ItemParaListaModel;