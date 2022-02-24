const mongoose =  require("mongoose")
const Schema = mongoose.Schema;

const Usuario = new Schema({
    email: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    filial: {
        type: String,
        required: true
    },
    admin: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("usuarios", Usuario)