const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const res = require('express/lib/response');
app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions:{allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: false,},}));
app.set('view engine', 'handlebars');
const bodyParser = require('sequelize');
const mongoose = require("mongoose")
require("./models/Usuarios")
const Usuario = mongoose.model("usuarios")
const session = require("express-session")
const flash = require("connect-flash")
const bcrypt = require("bcryptjs")
const passport = require("passport")
require("./config/auth")(passport)





//config
//sessão
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
//Middleware
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})
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
const path = require("path");
const { redirect } = require('express/lib/response');
const router = require('./routes/painel');

//Public
    app.use(express.static(path.join(__dirname, "public")))
    
    //Middleware serve para fazer sistema de validação
    app.use((req, res, next) => {
        console.log("Middleware On")

        //next serve para o sistema n parar no Middleware
        next()
    })

//Body Parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());
    
//mongoose
    //Em breve

//------------------------------------------Rotas --------------------------------------
//Rotas principais


//Rota - Autenticação
app.post('/login', (req, res, next) =>{
    passport.authenticate("local", {
        successRedirect: "/painel",
        failureRedirect:"/Falha_entrar_em_painel",
        failureFlash: true
    })(req, res, next)
})



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

    var erros = []

    if(!req.body.email){
        erros.push({texto:"email invalido"})
   }

    if(!req.body.senha){
        erros.push({texto:"Senha invalida"})
   }

    if(!req.body.nome){
         erros.push({texto:"Nome invalido"})
    }

    if(!req.body.filial){
        erros.push({texto:"Selecione uma filial"})
    }
    
    if(erros.length > 0){
        res.render("site/cadastrar", {erros: erros})
    }else{
        Usuario.findOne({nome: req.body.nome}).then((nome) =>{
            if(nome){
                req.flash("error_msg", "Erro, login já foi cadastrado")
                res.redirect("/cadastrar4")
            }else{
                const novoUsuario = new Usuario({
                    email: req.body.email,
                    nome: req.body.nome,
                    senha: req.body.senha,
                    filial: req.body.nome
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) =>{
                        if(erro){
                            req.flash("erro_msg", "Erro ao cadastrar")
                            res.redirect("/cadastrar1")
                        }
                        novoUsuario.senha = hash
                        novoUsuario.save().then(() =>{
                            req.flash("sucess_msg", "Usuário cadastrado com sucesso")
                            res.redirect("/cadastrar")
                        }).catch((err) => {
                            req.flash("error_msg", "Erro ao se cadastrar")
                            res.redirect("/cadastrar3")
                        })
                    })
                })
               
            }
        }).catch((err) =>{
            req.flash("error_msg", "Erro")
            console.log("erro" + err)
            res.redirect("/cadastrar1")
        })
    }


})

//Painel
    app.use('/painel', painel)

app.listen(80, function(){
    console.log("servidor rodando!");
});
