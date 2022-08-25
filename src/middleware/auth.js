const validaTokenERetornaUsuario = require("../functions/validaTokenRetornaInfo");

async function auth(req, res, next){
    const header = req.headers['authorization'];

    if(header != undefined){
        const bearer = header.split(" ");
        const token = bearer[1];

        const infoUsuario = await validaTokenERetornaUsuario(token);

        if (infoUsuario != null) {

            if (typeof window !== 'undefined') {
                localStorage.setItem("token", token);
                console.log(token);
                next();
            } else {
                res.status(403);
                res.json({err: "O usuário não tem acesso ao LocalStorage!"});
              }
              
        } else {
            res.status(403);
            res.json({err: "O usuário não está autorizado!"});
        }

    }else{
        res.status(403);
        res.json({err: "O usuário não está autorizado!"});
    }
}

module.exports = auth;