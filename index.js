const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const res = require('express/lib/response');
app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions:{allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: false,},}));
app.set('view engine', 'handlebars');
const bodyParser = require('sequelize');
const usuario = require('./models/cadastro');


//config
    //Body Parser
        app.use(express.urlencoded({extended: false}));
        app.use(express.json());


    //Template Engine 
        // const hbs = handlebars.create({
        //     defaultLayout: "main"
        // })
        // app.engine("handlebars", () => hbs)
        // app.set("view engine", "handlebars")
        
//Rotas
    //Login
        app.get('/', function(req, res){
            usuario.findAll().then(function(usuarios){
                res.render('index', {usuarios: usuarios})
            })
        });
    //Cadastro
        app.get('/cadastro', function(req, res){
            res.render('cadastro');
        });
        //config-cadastro
            app.post('/cadastrar', function(req, res){
                usuario.create({
                    nome: req.body.nome,
                    senha: req.body.senha
                }).then(function(){
                    res.redirect('/')
                }).catch(function(erro){
                    res.send("houve um erro: "+ erro)
                })

            });


    




app.listen(80, function(){
    console.log("servidor rodando!");
});



// LIXO---------------


//  app.get("/", function(req,res){
//      res.sendFile(__dirname + "/Site/index.html");
//  });
