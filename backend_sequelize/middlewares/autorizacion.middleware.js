const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario.models')

module.exports.verificarRol = (...rolesPermitidos) =>{
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({ 
                mensaje: "No autorizado - Usuario no autenticado" 
            });
        }
        
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ 
                mensaje: `Acceso denegado` 
            });
        }
        
        next();
    };
}