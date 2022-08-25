const ListaDeCompraModel = require("../models/ListaDeCompraModel");
const CompartilhamentoDeListasModel = require("../models/CompartilhamentoDeListasModel");

module.exports = {
    
    async validaUsuarioTemAcessoLista(idLista, idUsuario){
        
        try {
            const idListaInt = parseInt(idLista), idUsuarioInt = parseInt(idUsuario);
            let temAcesso = false;

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

                    if(numeroDeListas > 0 || numeroDeCompartilhamentos > 0){
                        temAcesso = true;
                    }
                })
            })
        
        return temAcesso = true ? true : false;
        
        } catch (error) {
            return false;
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