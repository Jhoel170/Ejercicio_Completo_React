const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const Estudiante = require('../models/estudiante.models');
const Materia = require('../models/materia.models');
const Usuario = require('./usuario.models');

const Matricula = sequelize.define('Matricula', {
    fecha:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
},
{
    timestamps: false
});

Estudiante.belongsToMany(Materia, {through: Matricula, foreignKey: 'EstudianteId'});
Materia.belongsToMany(Estudiante, {through:Matricula, foreignKey: 'MateriaId'});
Matricula.belongsTo(Estudiante, {foreignKey: 'EstudianteId'});
Matricula.belongsTo(Materia, {foreignKey: 'MateriaId'})

module.exports = Matricula;
