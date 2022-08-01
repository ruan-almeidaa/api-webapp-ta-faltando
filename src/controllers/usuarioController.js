const UsuarioModel = require("../models/UsuarioModel");
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

                let senhaCorreta = bcrypt.compareSync(senha,loginUsuario.senhaLogin);

                if(senhaCorreta){

                    UsuarioModel.findOne({
                        where:{
                            idUsuario: loginUsuario.usuario_id_usuario
                        }
                    }).then(infoUsuario =>{

                        jwt.sign({
                            id: infoUsuario.idUsuario,
                            nome: infoUsuario.nomeUsuario,
                            sobrenome: infoUsuario.sobrenomeUsuario,
                            email: loginUsuario.emailLogin
                        }, jwtSecret,{expiresIn:'168h'}, (err,token) =>{
                            if(err){
                                res.status(400);
                                res.json({err: "Erro na geração do token!"});
                            }else{
                                res.status(200);
                                localStorage.setItem("token", token);
                                res.json({token: token});
                            }
                        }).catch((err) =>{
                            res.status(400);
                            res.json({err: "Erro na busca pelas informações do usuário!"});
                        })
                    })

                }else{
                    res.status(401);
                    res.json({err: "A senha não está correta!"});
                }

            }else{
                res.status(401);
                res.json({err: "O e-mail não está cadastrado!"});
            }

        }).catch((err) =>{
            res.status(401);
            res.json({err: "erro na busca pelo e-mail do usuário!"});
        })

    },

    async sair(req,res){

    },

    async criar(req,res){

        var {nome, sobrenome, email, senha, confSenha} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(senha,salt);

        if(nome.trim() == "" || nome == undefined){
            res.status(400);
            res.json({err: "O nome deve ser preenchido!"});
        } else if (sobrenome.trim() == "" || sobrenome != undefined){
            res.status(400);
            res.json({err: "O sobrenome deve ser preenchido!"});
        } else if(email.trim() == "" || email != undefined){
            res.status(400);
            res.json({err: "O e-mail deve ser preenchido!"});
        } else if (senha.trim() == "" || senha == undefined || confSenha.trim() == "" || confSenha == undefined){
            res.status(400);
            res.json({err: "As senham devem ser preenchidas!"});
        } else if (senha != confSenha){
            res.status(400);
            res.json({err: "As senham devem ser iguais!"});
        }else{
            UsuarioModel.create({
                nomeUsuario: nome,
                sobreNomeUsuario: sobrenome
            }).then(() =>{
                LoginUsuarioModel.create({
                    emailLogin: email.trim(),
                    senhaLogin: hash

                })
            })
        }


        await Usuario.create()

    },

    async editar(req,res){

    },

    async excluir(req,res){

    },


}