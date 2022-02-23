const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const res = require('express/lib/response');
app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions:{allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: false,},}));
app.set('view engine', 'handlebars');
const bodyParser = require('sequelize');

const mongoose = require("mongoose")

require("./models/Usuarios")
const Categoria = mongoose.model("usuarios")




//config
//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/usuarios").then(() => {
    console.log("conectado ao mongo")
}).catch((err) => {
    console.log("Erro ao se conectar: " +err)
})
//Config - Rotas:
const painel = require('./routes/painel');

//Arquivos estaticos
const path = require("path")

//Public
    app.use(express.static(path.join(__dirname, "public")))
    
    app.use((req, res, next) => {
        console.log("Middleware On")
        next()
    })

//Body Parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());
    
//mongoose
    //Em breve

//------------------------------------------Rotas --------------------------------------
//Rotas principais
//Pagina de Login:
app.get('/', (req, res) =>{
    res.render("site/index")
})

//Pagina de Cadastro:
app.get('/cadastrar', (req, res) =>{
    res.render("site/cadastrar")
})
//Post - Cadastro
app.post('/cadastrar/novo', (req, res) =>{
    const novoUsuario = {
        email: req.body.email,
        nome: req.body.nome,
        senha: req.body.senha,
        filial: req.body.nome
    }
    new Categoria(novoUsuario).save().then(() =>{
        console.log("Cadastrado com sucesso!")
    }).catch((err) =>{
        console.log("Erro ao se cadastrar" + err)
    })
})



//Painel
    app.use('/painel', painel)

app.listen(80, function(){
    console.log("servidor rodando!");
});
