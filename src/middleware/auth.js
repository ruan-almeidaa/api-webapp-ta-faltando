require('dotenv/config');
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

function auth(req, res, next){
    const header = req.headers['authorization'];

    if(header != undefined){
        const bearer = header.split(" ");
        const token = bearer[1];

        var informacoesUsuario = jwt.verify(token, jwtSecret);
        console.log(informacoesUsuario);

        next();
    

    }else{
        res.status(403);
        res.json({err: "O usuário não está autorizado!"})
    }
}

module.exports = auth;