require('dotenv/config');
const jwt = require("jsonwebtoken");

module.exports = async function (token){
    try {
        const informacoesUsuario = jwt.verify(token, process.env.JWTSECRET);
        return informacoesUsuario;  
    } catch (error) {
        return null;
    }
}