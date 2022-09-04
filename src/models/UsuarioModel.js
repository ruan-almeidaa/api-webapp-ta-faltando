const Sequelize = require ("sequelize");
const conexao = require("../../database/database");

const UsuarioModel = conexao.define('usuarios',{
    idUsuario:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    nomeUsuario:{
        type: Sequelize.STRING,
        allowNull: false
    },

    sobreNomeUsuario:{
        type: Sequelize.STRING,
        allowNull: false
    }

});

UsuarioModel.sync({force:false});


module.exports = UsuarioModel;