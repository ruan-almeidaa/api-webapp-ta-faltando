require('dotenv/config');
const UsuarioModel = require("../models/UsuarioModel");
const LoginUsuarioModel = require("../models/LoginUsuarioModel");
const jwt = require("jsonwebtoken");

const bcrypt = require('bcryptjs');

module.exports = {

    async index(req, res){

        res.status(200);
        res.json({msg: "Bem vindo a pagina inicial!"});

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
                            idUsuario: loginUsuario.usuarioIdUsuario
                        }
                    }).then(infoUsuario =>{

                        jwt.sign({id:infoUsuario.idUsuario,nome:infoUsuario.nomeUsuario,sobrenome:infoUsuario.sobrenomeUsuario,email:loginUsuario.emailLogin}, process.env.JWTSECRET,{expiresIn:'168h'}, (err,token) =>{
                            if(err){
                                res.status(400);
                                res.json({err: "Erro na geração do token!"});

                            }else{
                                console.log("token");
                                console.log(token);
                                
                                
                                if (typeof window !== 'undefined') {
                                    // o usuário está utilizando um navegador e por isso pode armazenar o token no localStorage.
                                    localStorage.setItem("token", JSON.stringify(token));
                                    res.status(200);
                                    res.json({token: JSON.stringify(token)});
                                  } else {
                                        res.status(400);
                                        res.json({err: "o usuário não está utilizando um navegador e por isso não pode armazenar o token no localStorage"});
                                  }
                            }
                        })
                    }).catch((err) =>{
                        res.status(400);
                        res.json({err: "Erro na busca pelas informações do usuário!"});
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


        if(nome == undefined || nome.trim() == ""){
            res.status(400);
            res.json({err: "O nome deve ser preenchido!"});
        } else if (sobrenome == undefined || sobrenome.trim() == ""){
            res.status(400);
            res.json({err: "O sobrenome deve ser preenchido!"});
        } else if(email == undefined || email.trim() == "" ){
            res.status(400);
            res.json({err: "O e-mail deve ser preenchido!"});
        } else if (senha == undefined || senha.trim() == ""  || confSenha == undefined || confSenha.trim() == ""){
            res.status(400);
            res.json({err: "As senham devem ser preenchidas!"});
        } else if (senha != confSenha){
            res.status(400);
            res.json({err: "As senham devem ser iguais!"});
        }else{
            LoginUsuarioModel.count({
                where:{
                    emailLogin: email
                }
            }).then(emailCadastrado =>{
                if(emailCadastrado == 0){

                    const hash = bcrypt.hashSync(senha, 10);
                    UsuarioModel.create({
                        nomeUsuario: nome,
                        sobreNomeUsuario: sobrenome
                    }).then(usuarioCadastrado =>{
                        LoginUsuarioModel.create({
                            emailLogin: email.trim(),
                            senhaLogin: hash,
                            usuarioIdUsuario: usuarioCadastrado.idUsuario
                        }).then(() => {
                            res.status(200);
                            res.json({mensagem: "O usuário foi cadastrado com sucesso!"});
                        })
                    }).catch((err) =>{
                        res.status(400);
                        res.json({err: "Erro ao cadastrar o usuário!"});
                    })

                }else{
                    res.status(400);
                    res.json({err: "Este e-mail já está cadastrado!"});

                }
            }).catch((err) =>{
                res.status(401);
                res.json({err: "Houve um erro ao verificar se o e-mail já está cadastrado!"});
            })
        }

    },

    async editar(req,res){

    },

    async excluir(req,res){

    },


}