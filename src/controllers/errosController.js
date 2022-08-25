module.exports = {
    async paginaDeErro(req,res){
        res.status(400);
        res.json({err: "Aconteceu um erro!"});
    }
}