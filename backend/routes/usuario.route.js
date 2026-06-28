const UsuarioControllador = require('../controllers/usuario.controllers')
const {verificarToken} = require('../middlewares/autentificacion.middleware')

module.exports = function(app){
    app.get('/usuarios', verificarToken, UsuarioControllador.getAllUsuarios);
    app.get('/usuarios/:id', verificarToken,  UsuarioControllador.getUsuarioById);
    app.post('/usuarios', UsuarioControllador.createUsuario)
    app.put('/usuarios/:id', verificarToken, UsuarioControllador.updateUsuario)
    app.delete('/usuarios/:id', verificarToken, UsuarioControllador.deleteUsuario)
    app.post('/usuarios/login', UsuarioControllador.loginUsuario)
}