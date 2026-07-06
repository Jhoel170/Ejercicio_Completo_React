const EstudianteControllador = require('../controllers/estudiante.controllers')
const router = require("express").Router();
const { verificarToken } = require('../middlewares/autentificacion.middleware')

const { verificarRol } = require('../middlewares/autorizacion.middleware')


router.get('/estudiantes', EstudianteControllador.getAllEstudiantes);
router.get('/estudiantes/:id', EstudianteControllador.getEstudianteById);
router.post('/estudiantes', EstudianteControllador.createEstudiante);
router.put('/estudiantes/:id', EstudianteControllador.updateEstudiante);
router.delete('/estudiantes/:id', EstudianteControllador.deleteEstudiante)

module.exports = router;