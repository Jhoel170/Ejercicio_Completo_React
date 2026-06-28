const EstudianteControllador = require('../controllers/estudiante.controllers')
const { verificarToken, verificarRol } = require('../middlewares/autentificacion.middleware')

module.exports = function (app) {
    // Admin y Visualizador pueden ver
    app.get('/estudiantes', verificarToken, verificarRol("admin", "visualizador"), EstudianteControllador.getAllEstudiantes);
    app.get('/estudiantes/:id', verificarToken, verificarRol("admin", "visualizador"), EstudianteControllador.getEstudianteById);
    
    // Solo Admin puede crear, editar y eliminar
    app.post('/estudiantes', verificarToken, verificarRol("admin"), EstudianteControllador.createEstudiante);
    app.put('/estudiantes/:id', verificarToken, verificarRol("admin"), EstudianteControllador.updateEstudiante);
    app.delete('/estudiantes/:id', verificarToken, verificarRol("admin"), EstudianteControllador.deleteEstudiante);
}