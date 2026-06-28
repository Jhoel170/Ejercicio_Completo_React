express = require('express');
app = express();
cors = require ('cors');
puerto = 8000;
require('./config/mongoose.config');

app.use(cors());
app.use(express.json());

const allEstudiantesRoutes = require('./routes/estudiante.route')
const allUsuariosRoutes = require('./routes/usuario.route')

allEstudiantesRoutes(app);
allUsuariosRoutes(app);

app.listen(puerto, ()=> console.log("El servidor esta escuchando por el puerto: ", puerto))