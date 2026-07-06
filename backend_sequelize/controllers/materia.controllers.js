const { where } = require('sequelize')
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
    .catch((err)=>err)
}

module.exports.updateMateria = (req, res) => {
    const {materiaId} = req.params
    const { nombre } = req.body;
    
    Materia.findByPk(id)
        .then(materia => {
            if (!materia) {
                return res.status(404).json({
                    success: false,
                    message: `Materia con ID ${id} no encontrado`
                });
            }
            return materia.update({ nombre, edad, url });
        })
        .then(materiaActualizado => {
            res.status(200).json({
                success: true,
                message: 'Materia actualizada exitosamente',
                data: materiaActualizado
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar la materia',
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
                    success: false,
                    message: `Materia con ID ${id} no encontrado`
                });
            }
            return Materia.destroy({ where: { materiaId } });
        })
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Materia eliminada exitosamente'
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar la materia',
                error: err.message
            });
        });
}