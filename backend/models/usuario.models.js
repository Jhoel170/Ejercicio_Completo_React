const mongoose = require('mongoose')

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Nombre es obligatorio"]
    },
    email:{
        type: String,
        required: [true, "Email es obligatorio"]
    },
    password: {
        type: String,
        required: [true, "Contraseña es obligatoria"]
    }
},
{
    timestamp: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id.toString(); // ObjectId → string plano
            delete ret._id;
        }
    }
})


const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;