const ListaDeCompraModel = require("../models/ListaDeCompraModel");

module.exports = async function(idLista,idUsuario){

    try {
        const IdListaInt = parseInt(this.idLista);
        const idUsuarioInt = parseInt(this.idUsuario);
        var listaPertenceAoUsuario = false;

        ListaDeCompraModel.findOne({
            where:{
                idLista: IdListaInt,
                usuarioIdUsuario: idUsuarioInt
            }
        }).then((listaEncontrada) => 
            {
                if(listaEncontrada > 0){
                    listaPertenceAoUsuario = true;
                }else{

                }

            })
    } catch (error)
        {
            return listaPertenceAoUsuario;
        }

 

}