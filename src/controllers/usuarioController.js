const Usuario = require("../models/UsuarioModel");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = {

    async index(req, res){

        return res.status(200);

    },

    async logar(req,res){

        return res.status(200);
        
    },

    async logando(req,res){

    },

    async sair(req,res){

    },

    async criar(req,res){

    },

    async editar(req,res){

    },

    async excluir(req,res){

    },


}