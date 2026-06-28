const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/epn_bdd", {})
    .then(()=>{console.log('Conexion exitosa')})
    .catch(()=>{console.log('Error al conectarse')})