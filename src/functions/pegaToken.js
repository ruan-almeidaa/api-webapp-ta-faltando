require('dotenv/config');
const jwt = require("jsonwebtoken");

module.exports = async function(req){
        var token = " ";
        if(typeof window != 'undefined') {
            console.log("entrou no if");
            token = localStorage.getItem("token");
        }else{
            const header = req.headers['authorization'];
            const bearer = header.split(" ");
            token = bearer[1];
        }
        return token;
        
}