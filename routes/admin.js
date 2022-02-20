//config - definir arquivo como rotas
    const express = require("express")
    const router = express.Router()

    router.get('/', (req, res) =>{
        res.send("Pagina de ADM")
    })
     

    module.exports = router