require('dotenv/config');
const jwt = require("jsonwebtoken");

//models
const ListaDeCompraModel = require("../models/ListaDeCompraModel");
const CompartilhamentoDeListasModel = require("../models/CompartilhamentoDeListasModel");
const ItemParaListaModel = require("../models/ItemParaListaModel");

//Funções
const validaTokenERetornaUsuario = require("../functions/validaTokenRetornaInfo");
const pegaToken = require("../functions/pegaToken");
const validaUsuarioTemAcessoLista = require("../functions/validaUsuarioTemAcessoLista");
const buscaItensDalista = require("../functions/buscaItensDaLista");

module.exports = {

    async retornaItensDaLista(req, res){
        try {
            const {idDaLista} = req.body;
            const token = await pegaToken();
            const usuario = await validaTokenERetornaUsuario(token);

            const usuarioTemAcesso = await validaUsuarioTemAcessoLista(idDaLista, usuario.id);

            if(usuarioTemAcesso){
                var itensDalista = await buscaItensDalista(idDaLista);

                if(itensDalista != null){
                    res.status(200);
                    res.send(itensDalista);
                }else{
                    res.status(400);
                    res.json({err: "Não foi possível buscar os itens da lista!"});
                }
            }



        } catch (error) {
            res.status(400);
            res.json({err: "Não foi possível buscar os itens da lista!"});
        }
    }
}