//config - definir arquivo como rotas
    const express = require("express")
const res = require("express/lib/response")
    const router = express.Router()

//Define as rotas
    //Painel
    router.get('/', (req, res) =>{
        res.send("Deshbord")
    })

    router.get('/impressoras', (req, res) =>{
        res.send("pagina de Cadastro")
    })
    
    router.get('/toners', (req, res) =>{
        res.send("Painel")
    })
     
    module.exports = router