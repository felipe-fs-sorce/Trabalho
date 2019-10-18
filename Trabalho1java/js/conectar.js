const sequenlize = require('sequelize')
const sequelize = new sequelize('banco', 'root', '123456', {
    HOST: "localhost",
    dialect: 'mysql'
})

sequelize.authenticate().then(function() {
    console.log("Conectado com Sucesso!")
}).catch(function(erro) {
    console.log("Falha ao se conectar: " + erro)
})