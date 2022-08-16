require('dotenv/config');
const jwt = require("jsonwebtoken");
const validaTokenERetornaUsuario = require("../functions/validaTokenRetornaInfo");
const bcrypt = require('bcryptjs');

//models
const UsuarioModel = require("../models/UsuarioModel");
const LoginUsuarioModel = require("../models/LoginUsuarioModel");
const ListaDeCompraModel = require("../models/ListaDeCompraModel");
const CompartilhamentoDeListasModel = require("../models/CompartilhamentoDeListasModel");


module.exports = {

    async retornaListasDoUsuario(req, res){

        if (typeof window !== 'undefined') {

            try{
                const token = localStorage.getItem("token");
                const {id,nome,sobrenome,email} = await validaTokenERetornaUsuario(token);

                ListaDeCompraModel.findAll({
                    where: {
                        usuario_id_usuario: parseInt(id)
                    }
                }).then(listasDoUsuario =>{
                    CompartilhamentoDeListasModel.findAll({
                        where: {
                            usuario_id_usuario: parseInt(id)
                        }
                    }).then(listasCompartilhadasComUsuario =>{

                        const todasListasDoUsuario = Object.assign({}, listasDoUsuario,listasCompartilhadasComUsuario);
                        res.status(200);
                        res.json({listas: todasListasDoUsuario}); 

                    })

                })

            }catch (error) {
                res.status(403);
                res.json({err: "Aconteceu um erro ao validar o token do usuário e suas listas de compras!"});

            }
        } else {
            res.status(403);
            res.json({err: "O usuário não tem acesso ao LocalStorage!"});
          }
                
    },

    async criar(req, res){
        res.status(200);
        res.json({msg: "Bem vindo a página de cadastro de lista de compra!"});
    },

    async criando(req, res){
        const tituloLista = req.body.tituloLista;

        try {
            var token = " ";
            if(typeof window != 'undefined') {
                token = localStorage.getItem("token");
            }else{
                const header = req.headers['authorization'];
                const bearer = header.split(" ");
                token = bearer[1];
            }
            const {id,nome,sobrenome,email} = await validaTokenERetornaUsuario(token);
            const usuario = parseInt(id);

            if(tituloLista == undefined || tituloLista.trim() == ""){
                res.status(400);
                res.json({err: "O nome título da lista deve ser preenchido!"});
            }else{
                ListaDeCompraModel.create({
                    tituloLista: tituloLista,
                    usuarioIdUsuario: usuario
                }).then(() =>{
                    res.status(200);
                    res.json({mensagem: "A lista foi criada com sucesso!"});
                }).catch((err) =>{
                    res.status(400);
                    res.json({err: "Erro ao criar a lista!"});
                })
            }
        } catch (error) {
            console.log(error);
            res.status(400);
            res.json({err: "Houve um problema no envio do id do usuário"});
        }

    },

    async deletando(req, res){
        const {idListaDeCompra} = req.body;
        const idListaInt = parseInt(idListaDeCompra);
        
        var token = " ";
        if(typeof window != 'undefined') {
            token = localStorage.getItem("token");
        }else{
            const header = req.headers['authorization'];
            const bearer = header.split(" ");
            token = bearer[1];
        }
        const {id,nome,sobrenome,email} = await validaTokenERetornaUsuario(token);

        ListaDeCompraModel.destroy({
            where:{
                idLista: idListaInt,
                usuarioIdUsuario: id
            }
        }).then((result) =>{
            if(result > 0){
                res.status(200);
                res.json({mensagem: "A lista foi excluída com sucesso!"});
            }else{
                res.status(400);
                res.json({err: "Não foi possível excluir a lista!"});
            }

        }).catch((erro) =>{
            res.status(400);
            res.json({err: "Houve um erro ao tentar excluir a lista!"});
        })

    },
}