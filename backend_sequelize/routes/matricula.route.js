const MatriculaController = require('../controllers/matricula.controllers')
const router = require("express").Router();

router.post('/matricula/nueva', MatriculaController.matricularEstudiante);
router.get('/materia/:EstudianteId/matriculas', MatriculaController.getEstudianteMatriculado)
router.delete('/matricula/:EstudianteId/:MateriaId', MatriculaController.deleteEstudianteMatriculado)

module.exports = router;