const Estudiante = require('../models/estudiante.models');

module.exports.getAllEstudiantes = (req, res) => {
    Estudiante.findAll()
        .then(estudiantes => {
            res.status(200).json({
                success: true,
                data: estudiantes
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error al obtener estudiantes',
                error: err.message
            });
        });
};

module.exports.getEstudianteById = (req, res) => {
    const { id } = req.params;
    
    Estudiante.findByPk(id)
        .then(estudiante => {
            if (!estudiante) {
                return res.status(404).json({
                    success: false,
                    message: `Estudiante con ID ${id} no encontrado`
                });
            }
            res.status(200).json({
                success: true,
                data: estudiante
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error al obtener el estudiante',
                error: err.message
            });
        });
};

module.exports.createEstudiante = (req, res) => {
    const { nombre, edad, url } = req.body;
    
    if (!nombre || !edad) {
        return res.status(400).json({
            success: false,
            message: 'Nombre y edad son obligatorios'
        });
    }
    
    Estudiante.create({ nombre, edad, url })
        .then(estudiante => {
            res.status(201).json({
                success: true,
                message: 'Estudiante creado exitosamente',
                data: estudiante
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error al crear el estudiante',
                error: err.message
            });
        });
};

module.exports.updateEstudiante = (req, res) => {
    const { id } = req.params;
    const { nombre, edad, url } = req.body;
    
    Estudiante.findByPk(id)
        .then(estudiante => {
            if (!estudiante) {
                return res.status(404).json({
                    success: false,
                    message: `Estudiante con ID ${id} no encontrado`
                });
            }
            return estudiante.update({ nombre, edad, url });
        })
        .then(estudianteActualizado => {
            res.status(200).json({
                success: true,
                message: 'Estudiante actualizado exitosamente',
                data: estudianteActualizado
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar el estudiante',
                error: err.message
            });
        });
};

module.exports.deleteEstudiante = (req, res) => {
    const { id } = req.params;
    
    Estudiante.findByPk(id)
        .then(estudiante => {
            if (!estudiante) {
                return res.status(404).json({
                    success: false,
                    message: `Estudiante con ID ${id} no encontrado`
                });
            }
            return Estudiante.destroy({ where: { id } });
        })
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Estudiante eliminado exitosamente'
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar el estudiante',
                error: err.message
            });
        });
};