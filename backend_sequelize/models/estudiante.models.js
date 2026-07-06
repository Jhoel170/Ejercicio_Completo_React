const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const Estudiante = sequelize.define("Estudiante", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

module.exports = Estudiante;