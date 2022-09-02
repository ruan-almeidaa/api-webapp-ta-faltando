const ListaDeCompraModel = require("../models/ListaDeCompraModel");
const CompartilhamentoDeListasModel = require("../models/CompartilhamentoDeListasModel");

module.exports = {
    
    async validaUsuarioTemAcessoLista(idLista, idUsuario, emailUsuario){
        
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
                        emailLogin: emailUsuario
                    }
                })
            ])
        
        return promiseListas > 0 || promiseCompartilhamentos > 0 ? true : false;
        
        } catch (error) {
            return false;
        }
        
    },

    async validaProprietarioDaLista(idLista, idUsuario){
        try {
            const idListaInt = parseInt(idLista), idUsuarioInt = parseInt(idUsuario);
            let proprietarioLista = false;

            await ListaDeCompraModel.count({
                where:{
                    idLista: idListaInt,
                    usuarioIdUsuario: idUsuarioInt
                }
            }).then(result =>{

               if(result > 0){
                proprietarioLista = true;
               }

            })

            return proprietarioLista;

        } catch (error) {
            return false;
        }
    }
}