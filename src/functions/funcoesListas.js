const ListaDeCompraModel = require("../models/ListaDeCompraModel");
const CompartilhamentoDeListasModel = require("../models/CompartilhamentoDeListasModel");

module.exports = {
    
    async validaUsuarioTemAcessoLista(idLista, idUsuario){
        
        try {
            const idListaInt = parseInt(idLista), idUsuarioInt = parseInt(idUsuario);
            let temAcesso = false;

            const [ promiseListas, promiseCompartilhamentos ] = await Promise.all([
                
                ListaDeCompraModel.count({
                    where:{
                        idLista: idListaInt,
                        usuarioIdUsuario: idUsuarioInt
                    }
                }),

                CompartilhamentoDeListasModel.count({
                    where:{
                        listaIdLista: idListaInt,
                        usuarioIdUsuario: idUsuarioInt
                    }
                })
            ])
        
        return promiseListas > 0 || promiseCompartilhamentos > 0 ? true : false;
        
        } catch (error) {
            return false;
        }
        
    },
}