const EstudianteControllador = require('../controllers/estudiante.controllers')

const {verificarToken} = require('../middlewares/autentificacion.middleware')

module.exports = function (app) {
    app.get('/estudiantes',verificarToken, EstudianteControllador.getAllEstudiantes);
    app.get('/estudiantes/:id',verificarToken, EstudianteControllador.getEstudianteById);
    app.post('/estudiantes', verificarToken, EstudianteControllador.createEstudiante);
    app.put('/estudiantes/:id', verificarToken, EstudianteControllador.updateEstudiante);
    app.delete('/estudiantes/:id', verificarToken, EstudianteControllador.deleteEstudiante)
}