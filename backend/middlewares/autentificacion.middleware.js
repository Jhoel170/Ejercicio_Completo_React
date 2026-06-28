const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario.models')

const contraseña = "123";

module.exports.verificarToken = async (req, res, next) => {
    let token;
    console.log("HEADER:", req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            console.log("TOKEN:", token);
            const decoded = jwt.verify(token, contraseña);
            console.log("DECODED:", decoded);
            req.usuario = await Usuario.findById(decoded.id).select('-password');
            console.log("USUARIO:", req.usuario);
            next();
        } catch(err){
            console.log("ERROR:", err.message);
            res.status(401).json({mensaje: 'Token no valido'})
        }
    } else {
        res.status(401).json({mensaje: "No autorizado!!!"})
    }
}

module.exports.verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({mensaje: "No autorizado"});
        }
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({mensaje: "Acceso denegado: no tienes permisos"});
        }
        next();
    }
}