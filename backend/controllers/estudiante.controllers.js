const Estudiante = require('../models/estudiante.models');

module.exports.getAllEstudiantes = (_, res) => {
    Estudiante.find({})
        .then(estudiantes => res.json(estudiantes))
        .catch(err => res.json(err))
}

module.exports.getEstudianteById = (req, res) => {
    const { id } = req.params
    Estudiante.findById(id)
        .then(estudiante => res.json(estudiante))
        .catch(err => res.json(err))
}

module.exports.createEstudiante = (req, res) => {
    const { nombre, edad, url } = req.body
    Estudiante.create({ nombre, edad, url })
        .then(estudiante => res.json(estudiante))
        .catch(err => res.json(err))
}

module.exports.updateEstudiante = (req, res) => {
    const { id } = req.params;
    const { nombre, edad, url } = req.body;
    Estudiante.findOneAndUpdate({ _id: id }, { nombre, edad, url }, { new: true })
        .then(estudianteActualizado => res.json(estudianteActualizado))
        .catch(err => res.json(err))
}

module.exports.deleteEstudiante = (req, res) => {
    const { id } = req.params;
    Estudiante.deleteOne({ _id: id })
        .then(() => res.json({ mensaje: "Estudiante eliminado" }))
        .catch(err => res.json(err))
}