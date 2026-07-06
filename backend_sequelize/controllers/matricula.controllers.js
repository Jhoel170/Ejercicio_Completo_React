const Matricula = require('../models/matricula.model')
const Estudiante = require('../models/estudiante.models')
const Materia = require('../models/materia.models')

module.exports.matricularEstudiante = async (req, res) => {
    try {
        const { EstudianteId, MateriaId } = req.body
        const matriculaNueva = await Matricula.create({ EstudianteId, MateriaId });
        res.json(matriculaNueva);
    } catch (err) {
        res.status(500).json({ mensaje: 'Ocurrio un error al registrar la matricula' })
    }
}



module.exports.getEstudianteMatriculado = async (req, res) => {
    const { EstudianteId } = req.params
    try {
        const matriculas = await Matricula.findAll({
            where: { EstudianteId },
            include: [Materia]
        });
        res.json(matriculas)
    } catch (err) {
        res.status(500).json({ mensaje: 'Ocurrio un problema al obtener asignaturas matriculadas' })
    }
}

module.exports.deleteEstudianteMatriculado = async (req, res) => {
    const { EstudianteId, MateriaId } = req.params
    try {
        const matriculaEliminada = await Matricula.destroy({
            where: { EstudianteId, MateriaId }
        });

        if (!matriculaEliminada) {
            return res.status(404).json({ mensaje: 'No se encontró la matrícula' });
        }

        res.json({ mensaje: 'Matrícula eliminada' });
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al eliminar la matrícula' });
    }
}