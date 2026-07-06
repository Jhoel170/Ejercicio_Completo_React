const UsuarioControllador = require('../controllers/usuario.controllers')
const { verificarToken } = require('../middlewares/autentificacion.middleware')
const router = require("express").Router();

router.get('/usuarios', UsuarioControllador.getAllUsuarios);
router.get('/usuarios/:id', UsuarioControllador.getUsuarioById);
router.post('/usuarios', UsuarioControllador.createUsuario)
router.put('/usuarios/:id', UsuarioControllador.updateUsuario)
router.delete('/usuarios/:id', UsuarioControllador.deleteUsuario)
router.post('/usuarios/login', UsuarioControllador.loginUsuario)

module.exports = router;