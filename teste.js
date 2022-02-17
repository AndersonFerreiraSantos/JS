

const Postagem = sequelize.define('usuarios',{
    nome: {
        type: Sequelize.STRING
    },
    senha:{
        type: Sequelize.STRING
    } 
})

sequelize.authenticate().then(function(){
    console.log("Conectado com suscesso");
}).catch(function(erro){
    console.log("Falha ao se conectar" +erro);
})

Postagem.sync()