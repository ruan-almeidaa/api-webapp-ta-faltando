require('dotenv/config');
const jwt = require("jsonwebtoken");

//models
const ListaDeCompraModel = require("../models/ListaDeCompraModel");
const CompartilhamentoDeListasModel = require("../models/CompartilhamentoDeListasModel");
const ItemParaListaModel = require("../models/ItemParaListaModel");

//Funções
const validaTokenERetornaUsuario = require("../functions/validaTokenRetornaInfo");
const pegaToken = require("../functions/pegaToken");
const funcoesItens = require("../functions/funcoesItens");
const funcoesListas = require("../functions/funcoesListas");

module.exports = {

    async retornaItensDaLista(req, res){
        try {
            const idDaLista = parseInt(req.params.id);
            const token = await pegaToken(req,res);
            const usuario = await validaTokenERetornaUsuario(token);

            const usuarioTemAcesso = await funcoesListas.validaUsuarioTemAcessoLista(idDaLista, usuario.id);

            console.log("usuarioTemAcesso");
            console.log(usuarioTemAcesso);

            if(usuarioTemAcesso){
                let itensDalista = await funcoesItens.buscaItensDaLista(idDaLista);

                if(itensDalista != null){
                    res.status(200);
                    res.send(itensDalista);
                }else{
                    res.status(400);
                    res.json({err: "Não foi possível buscar os itens da lista!"});
                }
            }else{
                res.status(400);
                res.json({err: "O usuário não tem acesso a lista!"});
            }
        } catch (error) {
            res.status(400);
            res.json({err: "Não foi possível buscar os itens da lista!"});
        }
    },

    async criaItemNaLista(req,res){
        try
        {
            const {nomeItem, idLista} = req.body;

            if(nomeItem == undefined || nomeItem.trim() == ""){
                res.status(400);
                res.json({err: "Deve ser informado um nome válido para o item!"});
            }else if((idLista == undefined || idLista.trim() == "")){
                res.status(400);
                res.json({err: "Deve ser informada uma lista válida para adicionar o item!"});
            }else{
                const token = await pegaToken(req,res);
                const usuario = await validaTokenERetornaUsuario(token);
                const usuarioTemAcesso = await funcoesListas.validaUsuarioTemAcessoLista(idLista, usuario.id);
                
                if(usuarioTemAcesso){
                    ItemParaListaModel.create({
                        nomeItem: nomeItem,
                        listaIdLista: parseInt(idLista)
                    }).then((itemInserido) =>
                        {
                            res.status(200);
                            res.json({mensagem: "O item foi adicionado com sucesso!"});
                        }).catch((err) =>
                        {
                            res.status(401);
                            res.json({err: "O registro não pode ser inserido!"});
                        })
                }else{
                    res.status(401);
                    res.json({err: "O usuário não tem acesso a lista!"});
                }
            }


        } catch(error) {
            res.status(400);
            console.log(error);
            res.json({err: "O registro não pode ser inserido!"});
        }
    }
}