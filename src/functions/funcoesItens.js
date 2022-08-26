const ListaDeCompraModel = require("../models/ListaDeCompraModel");
const CompartilhamentoDeListasModel = require("../models/CompartilhamentoDeListasModel");
const ItemParaListaModel = require("../models/ItemParaListaModel");

module.exports = {

    async buscaItensDaLista(idLista){

        try {
            const idListaInt = parseInt(idLista);
            let itensDalista = null;

            ItemParaListaModel.findAll({
                where:{
                    listaIdLista: idListaInt
                },
                attributes:['idItem', 'nomeItem', 'lista_id_lista']
            }).then(resultItensDaLista => 
                {
                    itensDalista = resultItensDaLista;
                })
                
            return itensDalista != null ? itensDalista : null;

        } catch (error) {
            console.log("entrou no catch");
            return null;
        }
    }
}