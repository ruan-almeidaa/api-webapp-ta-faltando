const Sequelize = require ("sequelize");
const conexao = require("../../database/database");
const listaDeCompraModel = require("./ListaDeCompraModel");

const CompartilhamentoDeListasModel = conexao.define('compartilhamento',{
    idCompartilhamento:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    emailLogin:{
        type: Sequelize.STRING,
        allowNull: false
    },

});


CompartilhamentoDeListasModel.belongsTo(listaDeCompraModel); //um compartilhamento tem uma lista de compras.
listaDeCompraModel.hasMany(CompartilhamentoDeListasModel); //uma lista de compras tem vários compartilhamentos.

CompartilhamentoDeListasModel.sync({force:false});

module.exports = CompartilhamentoDeListasModel;