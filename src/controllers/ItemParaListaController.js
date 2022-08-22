require('dotenv/config');
const jwt = require("jsonwebtoken");

//models
const ListaDeCompraModel = require("../models/ListaDeCompraModel");
const CompartilhamentoDeListasModel = require("../models/CompartilhamentoDeListasModel");
const ItemParaListaModel = require("../models/ItemParaListaModel");

//Funções
const validaTokenERetornaUsuario = require("../functions/validaTokenRetornaInfo");
const pegaToken = require("../functions/pegaToken");
const listaPertenceAoUsuario = require("../functions/validaSeListaPertenceAoUsuario");

module.exports = {

    async retornaItensDaLista(req, res){
        try {
            const {idDaLista} = req.body;
            const token = await pegaToken();
            const usuario = await validaTokenERetornaUsuario(token);

                const temAcessoLista = await listaPertenceAoUsuario(idDaLista, usuario.id);
                ItemParaListaModel.findAll({
                    where:{
                        listaIdLista: listaEncontrada.idLista
                    }
                }).then((itensDaLista) => {
                    res.status(200);
                    res.json({token: JSON.stringify(token)}); 
                }).catch((err) =>{
                    res.status(400);
                    res.json({err: "Não foi possível encontrar os itens lista de compras!"});
                })

        } catch (error) {
            
        }
    }
}