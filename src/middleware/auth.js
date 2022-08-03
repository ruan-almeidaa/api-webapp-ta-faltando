require('dotenv/config');
const jwt = require("jsonwebtoken");

function auth(req, res, next){
    const header = req.headers['authorization'];

    if(header != undefined){
        const bearer = header.split(" ");
        const token = bearer[1];

        try {
            var informacoesUsuario = jwt.verify(token, process.env.JWTSECRET);
            next();
        } catch (error) {
            res.status(403);
            res.json({err: "O usuário não está autorizado!"});
        }

    

    }else{
        res.status(403);
        res.json({err: "O usuário não está autorizado!"});
    }
}

module.exports = auth;