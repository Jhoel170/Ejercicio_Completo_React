const MateriaController = require('../controllers/materia.controllers')
const router = require("express").Router();

router.get('/materias', MateriaController.getAllMaterias);
router.post('/materia', MateriaController.createMateria);
router.put('/materia/:materiaId', MateriaController.updateMateria);
router.delete('materia/:materiaId', MateriaController.deleteMateria);

module.exports = router;