require('dotenv/config');
const jwt = require("jsonwebtoken");

module.exports = async function(req, res){

    try {
        var token = " ";
        if(typeof window != 'undefined') {
            token = localStorage.getItem("token");
            
        }else{
            
            const header = req.headers['authorization'];
            const bearer = header.split(" ");
            token = bearer[1];
            console.log(token);
        }

        return token;
        
    } catch (error) {
        console.log(error);
    }

        

        
}