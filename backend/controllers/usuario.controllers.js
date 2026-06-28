const Usuario = require('../models/usuario.models');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')

const contraseña = "123";

module.exports.getAllUsuarios = (_, res) => {
    Usuario.find({})
        .then(usuarios => res.json(usuarios))
        .catch(err => res.json(err))
}
module.exports.getUsuarioById = (req, res) => {
    const { id } = req.params
    Usuario.findById(id)
        .then(usuario => res.json(usuario))
        .catch(err => res.json(err))
}
module.exports.createUsuario = async (req, res) => {
    const { nombre, password, email } = req.body;

    if (!nombre || !password || !email) {
        res.status(400).json({ mensaje: "Campos vacios, son mandatorios!" })
    } else {
        const emailEncontrado = await Usuario.findOne({ email })

        if (emailEncontrado) {
            res.status(400).json({ mensaje: "Email ya usado" })
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt)
            Usuario.create({ nombre, email, password: hashedPass })
                .then(usuario => res.json(usuario))
                .catch(err => res.json(err))
        }
    }

}

module.exports.updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body

    const emailEncontrado = await Usuario.findOne({ email })

    if (emailEncontrado) {
        res.status(400).json({ mensaje: "Email ya usado" })
    } else {
        Usuario.findOneAndUpdate({ _id: id }, { nombre, email }, { new: true })
        .then(usuarioNuevo => res.json(usuarioNuevo))
        .catch(err => res.json(err))
    }
}

module.exports.deleteUsuario = (req, res) => {
    const {id} = req.params;

    Usuario.deleteOne({_id: id})
    .then(()=> res.json({mensaje: "Usuario eliminado"}))
    .catch(err=> res.json(err))
} 

module.exports.loginUsuario = async (req, res) =>{
    const { email, password } = req.body;
    const emailEncontrado = await Usuario.findOne({email})
    if (emailEncontrado && (await bcrypt.compare(password, emailEncontrado.password))){
        res.json({mensaja: "Login correcto", email: emailEncontrado.email, token: generarToken(emailEncontrado.id)})
    }else{
        res.status(400).json({mensaje: 'No valido, intente otra vez'})
    }
}

const generarToken = (id) => {
    return jwt.sign({id}, contraseña, {expiresIn: '1d'})
}