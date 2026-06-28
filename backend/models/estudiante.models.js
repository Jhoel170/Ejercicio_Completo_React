const mongoose = require('mongoose');

const EstudianteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Nombre es obligatorio"]
    },
    edad: {
        type: Number,
        required: [true, "Edad es obligatoria"]
    },
    url: {
        type: String,

    }
}, {
    timestamp: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            delete ret._id
        }
    }
})

const Estudiante = mongoose.model('Estudiante', EstudianteSchema);

module.exports = Estudiante;