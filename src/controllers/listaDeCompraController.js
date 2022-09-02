require('dotenv/config');
const jwt = require("jsonwebtoken");
const validaTokenERetornaUsuario = require("../functions/validaTokenRetornaInfo");
const pegaToken = require("../functions/pegaToken");

//functions
const funcoesListas = require("../functions/funcoesListas");

//models
const UsuarioModel = require("../models/UsuarioModel");
const LoginUsuarioModel = require("../models/LoginUsuarioModel");
const ListaDeCompraModel = require("../models/ListaDeCompraModel");
const CompartilhamentoDeListasModel = require("../models/CompartilhamentoDeListasModel");


module.exports = {

    async retornaListasDoUsuario(req, res){

            try{

                token = await pegaToken(req,res);

                const {id,nome,sobrenome,email} = await validaTokenERetornaUsuario(token);

                const [ promiseListasDoUsuario, promiseListasCompartilhadas ] = await Promise.all([
                    ListaDeCompraModel.findAll({
                        where: {
                            usuario_id_usuario: parseInt(id)
                        }
                    }),

                    CompartilhamentoDeListasModel.findAll({
                        where: {
                            emailLogin: email
                        }
                    })

                ])

                res.status(200);
                res.send(Object.assign({}, promiseListasDoUsuario,promiseListasCompartilhadas));
   
            }catch (error) {
                res.status(403);
                res.json({err: "Aconteceu um erro ao validar o token do usuário e suas listas de compras!"});

            }
                
    },

    async criar(req, res){
        res.status(200);
        res.json({msg: "Bem vindo a página de cadastro de lista de compra!"});
    },

    async criando(req, res){
        const tituloLista = req.body.tituloLista;

        try {

            const token = await pegaToken(req,res);

            const {id,nome,sobrenome,email} = await validaTokenERetornaUsuario(token);
            const usuario = parseInt(id);

            if(tituloLista == undefined || tituloLista.trim() == ""){
                res.status(400);
                res.json({err: "O nome título da lista deve ser preenchido!"});
            }else{
                await ListaDeCompraModel.create({
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

        try {
            const {idListaDeCompra} = req.body;
            const idListaInt = parseInt(idListaDeCompra);
            
            token = await pegaToken(req,res);

            const {id,nome,sobrenome,email} = await validaTokenERetornaUsuario(token);

            await ListaDeCompraModel.destroy({
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

            })
            
        } catch (error) {
            res.status(400);
            res.json({err: "Não foi possível excluir a lista!"});
        }

    },

    async compartilhandoLista(req,res){
        try {
            const {emailUsuarioCompartilhamento} = req.body;
            const idLista = parseInt(req.params.id);

            if(emailUsuarioCompartilhamento == undefined || emailUsuarioCompartilhamento.trim() == "" ){
                res.status(400);
                res.json({err: "O e-mail deve ser preenchido!"});
            }else{
                const token = await pegaToken(req,res);
                const {id} = await validaTokenERetornaUsuario(token);
                const listaPertenceAoUsuario = await funcoesListas.validaProprietarioDaLista(idLista, id);
                if(listaPertenceAoUsuario){
                    
                    await CompartilhamentoDeListasModel.create({
                        listaIdLista: idLista,
                        emailLogin: emailUsuarioCompartilhamento
                    }).then((result) =>{
                        res.status(200);
                        res.json({mensagem: "A lista foi compartilhada com sucesso!"});
                    })
                }


            }



        } catch (error) {
            console.log(error);
        }
    }

}