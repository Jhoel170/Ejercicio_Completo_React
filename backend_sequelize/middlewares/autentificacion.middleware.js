const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario.models')

const contraseña = "123";

module.exports.verificarToken = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization;
            //console.log('Token recibido con Bearer: ', token);
            token = token.split(' ')[1];
            //console.log('Token extraido: ', token);

            const decoded = jwt.verify(token, contraseña);
            const usuario = await Usuario.findById(decoded.id).select('-password');
            req.usuario = usuario
            next();
        } catch(err){
            res.status(401).json({mensaje: 'Token no valido'})
        }
    } else {
        res.status(401).json({mensaje: "No autorizado!!!"})
    
    }
}

