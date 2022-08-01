const Sequelize = require("sequelize");
let conexao = 'string de conexão';

if (process.env.DATABASE_URL) {
    conexao = new Sequelize(process.env.DATABASE_URL,{
        dialect:'postgres',
        protocol:'postgres',
        timezone:"-03:00",
        dialectOptions:{
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
}else {
    conexao = new Sequelize('tafaltando', 'postgres', 'postgres',{
        host:'localhost',
        dialect:'postgres',
        timezone:"-03:00",
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
          },
    });
  }

module.exports = conexao;
  