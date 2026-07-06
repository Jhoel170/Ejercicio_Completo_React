const express = require("express");
const app = express();
const puerto = 8000;
const cors = require("cors")

const sequelize = require("./config/sequelize.config");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes/estudiante.route"));
app.use(require("./routes/usuario.route"));
app.use(require('./routes/materia.route'))
app.use(require('./routes/matricula.route'))

sequelize.sync({alter:true})
    .then(() => {
        console.log("BDD sincronizada correctamente");
    })
    .catch(err => {
        console.log("Error al sincronizar la BDD:", err);
    });

app.listen(puerto, () => {
    console.log("Servidor escuchando en puerto ", puerto);
});