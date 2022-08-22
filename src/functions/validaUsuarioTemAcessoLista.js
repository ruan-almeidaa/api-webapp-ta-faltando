const ListaDeCompraModel = require("../models/ListaDeCompraModel");
const CompartilhamentoDeListasModel = require("../models/CompartilhamentoDeListasModel");

module.exports = async function(idLista,idUsuario){

    try {
        const IdListaInt = parseInt(this.idLista);
        const idUsuarioInt = parseInt(this.idUsuario);

        ListaDeCompraModel.findOne({
            where:{
                idLista: IdListaInt,
                usuarioIdUsuario: idUsuarioInt
            }
        }).then((percenteAoUsuario) => 
            {
                if(percenteAoUsuario > 0){
                    return true;
                }else{
                    CompartilhamentoDeListasModel.findOne({
                        listaIdLista: IdListaInt,
                        usuarioIdUsuario: idUsuarioInt
                    }).then((compartilhadaComUsuario) =>
                        {
                            if(compartilhadaComUsuario > 0){
                                return true;
                            }else{
                                return false;
                            }
                    })
                }

            })
    } catch (error)
        {
            return false;
        }

 

}