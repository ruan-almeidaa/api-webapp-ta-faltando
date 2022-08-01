const Sequelize = require ("sequelize");
const connection = require("../database/database");

const UsuarioModel = connection.define('usuarios',{
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
    },

    emailUsuario:{
        type: Sequelize.STRING,
        allowNull: false
    },

    senhaUsuario:{
        type: Sequelize.STRING,
        allowNull: false
    }

});

UsuarioModel.sync({force:false});
module.exports = UsuarioModel;