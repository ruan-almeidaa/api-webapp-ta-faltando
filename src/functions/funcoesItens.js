const ListaDeCompraModel = require("../models/ListaDeCompraModel");
const CompartilhamentoDeListasModel = require("../models/CompartilhamentoDeListasModel");

module.exports = {
    async validaUsuarioTemAcessoLista(idLista, idUsuario){
        try {
            const idListaInt = parseInt(idLista), idUsuarioInt = parseInt(idUsuario);

            ListaDeCompraModel.count({
                where:{
                    idLista: idListaInt,
                    usuarioIdUsuario: idUsuarioInt
                }
            }).then(numeroDeListas =>{
                CompartilhamentoDeListasModel.count({
                    where:{
                        listaIdLista: idListaInt,
                        usuarioIdUsuario: idListaInt
                    }
                }).then(numeroDeCompartilhamentos =>{

                })
            })
            
        } catch (error) {
            
        }
    },

    async buscaItensDaLista(idLista){
        try {
            const idListaInt = parseInt(this.idLista);
    
            ItemParaListaModel.findAll({
                where:{
                    listaIdLista: idListaInt
                }
            }).then((itensDaLista) => 
                {
                    return itensDaLista;
            
                }).catch((err) =>
                {
                    return null;
                })
            
        } catch (error) {
            return null;
        }
    }
}