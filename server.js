const express = require('express');
const app = express();
const conexao = require("./database/database");
const routes = require("./src/routes");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//conexao com banco de dados
conexao.authenticate().then(() =>{
    console.log("conexao feita");
}).catch((error) => {
    console.log(error);
});

app.use(routes);

app.listen(process.env.PORT || 8080);