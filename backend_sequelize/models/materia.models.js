const { DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize.config');
const Materia = sequelize.define('Materia', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "Nombre de materia es obligatorio" }
        }
    }
},
{
    timestamps: false
});
module.exports = Materia;