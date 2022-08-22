const ItemParaListaModel = require("../models/ItemParaListaModel");

module.exports = async function(idLista){

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

