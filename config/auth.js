const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//Model de usuário
require("../models/Usuarios")
const Usuarios = mongoose.model("usuarios")

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'nome', passwordField:'senha'}, (nome, senha, done) => {
        Usuarios.findOne({nome: nome}).then((usuarios) =>{
            if(!usuarios){
                return done(null, false, {message: "Conta não cadastrada"})
            }

            bcrypt.compare(senha, usuarios.senha, (erro, batem) =>{
                
                if(batem){
                    return done(null, usuarios)
                }else{
                    return done(null, false,{massage:"Senha incorreta"})
                }
            })
        })
    }))

    passport.serializeUser((usuarios, done) =>{

        done(null, nome.id)
    })

    passport.deserializeUser((id, done) =>{
        usuario.findById(id, (err, usuarios) =>{
            done(err, usuarios)
        })
    })
}