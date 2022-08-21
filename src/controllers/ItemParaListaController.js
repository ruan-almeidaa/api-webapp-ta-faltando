require('dotenv/config');
const jwt = require("jsonwebtoken");
const validaTokenERetornaUsuario = require("../functions/validaTokenRetornaInfo");

//models
const ListaDeCompraModel = require("../models/ListaDeCompraModel");
const CompartilhamentoDeListasModel = require("../models/CompartilhamentoDeListasModel");
const ItemParaListaModel = require("../models/ItemParaListaModel");


module.exports = {

    async retornaItensDaLista(req, res){
        try {
            const {idDaLista} = req.body;
        } catch (error) {
            
        }
    }
}