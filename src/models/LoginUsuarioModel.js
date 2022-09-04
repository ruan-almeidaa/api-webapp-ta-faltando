const Sequelize = require ("sequelize");
const conexao = require("../../database/database");
const UsuarioModel = require("../models/UsuarioModel");

const LoginUsuarioModel = conexao.define('logins',{
    idLogin:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },

    emailLogin:{
        type: Sequelize.STRING,
        allowNull: false
    },

    senhaLogin:{
        type: Sequelize.STRING,
        allowNull: false
    }

});


LoginUsuarioModel.belongsTo(UsuarioModel); //um login tem um usuário
UsuarioModel.hasOne(LoginUsuarioModel); //um usuario tem um login


LoginUsuarioModel.sync({force:false});

module.exports = LoginUsuarioModel;