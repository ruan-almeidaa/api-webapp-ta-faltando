const Sequelize = require ("sequelize");
const conexao = require("../../database/database");

const listaDeCompraModel = conexao.define('listas',{
    idLista:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    tituloLista:{
        type: Sequelize.STRING,
        allowNull: false
    },
    idProprietarioLista:{
        type: Sequelize.INTEGER,
    }

});

listaDeCompraModel.sync({force:false});
module.exports = listaDeCompraModel;