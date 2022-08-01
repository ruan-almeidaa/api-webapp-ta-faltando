const Usuario = require("../models/UsuarioModel");
const LoginUsuarioModel = require("../models/LoginUsuarioModel");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;
const bcrypt = require('bcryptjs');

module.exports = {

    async index(req, res){

        return res.status(200);

    },

    async logar(req,res){

        return res.status(200);
        
    },

    async logando(req,res){

        var {email, senha} = req.body;

        await LoginUsuarioModel.findOne({
            where:{
                emailLogin: email
            }
        }).then(loginUsuario =>{

            if(loginUsuario != undefined){

                let loginCorreto = bcrypt.compareSync(senha,loginUsuario.senhaLogin);

            }else{
                res.status(401);
                res.json({err: "O e-mail não está cadastrado!"});
            }

        })

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