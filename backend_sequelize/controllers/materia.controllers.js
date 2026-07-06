const Materia = require('../models/materia.models')

module.exports.getAllMaterias = (_, res) => {
    Materia.findAll()
    .then((materias)=> res.json(materias))
    .catch((err)=> res.status(500).json(err))
}

module.exports.getMateriaById = (req, res) => {
    const {materiaId} = req.params
    Materia.findByPk(materiaId)
    .then((materia) => res.json(materia))
    .catch((err)=> res.status(500).json(err))
}

module.exports.createMateria = (req, res) => {
    const {nombre} = req.body
    Materia.create({nombre})
    .then((materiaNueva)=>res.json(materiaNueva))
    .catch((err)=> res.status(500).json({ mensaje: 'Error al crear la materia', error: err.message }))
}

module.exports.updateMateria = (req, res) => {
    const { materiaId } = req.params
    const { nombre } = req.body;

    Materia.findByPk(materiaId)
        .then(materia => {
            if (!materia) {
                return res.status(404).json({
                    mensaje: `Materia con ID ${materiaId} no encontrada`
                });
            }
            return materia.update({ nombre });
        })
        .then(materiaActualizada => {
            res.json(materiaActualizada);
        })
        .catch(err => {
            res.status(500).json({
                mensaje: 'Error al actualizar la materia',
                error: err.message
            });
        });
}

module.exports.deleteMateria = (req, res) => {
    const { materiaId } = req.params;

    Materia.findByPk(materiaId)
        .then(materia => {
            if (!materia) {
                return res.status(404).json({
                    mensaje: `Materia con ID ${materiaId} no encontrada`
                });
            }
            return Materia.destroy({ where: { id: materiaId } });
        })
        .then(() => {
            res.json({
                mensaje: 'Materia eliminada exitosamente'
            });
        })
        .catch(err => {
            res.status(500).json({
                mensaje: 'Error al eliminar la materia',
                error: err.message
            });
        });
}