import Estudiante from "../components/Estudiante";
import { useNavigate } from "react-router-dom";
import EstudianteForm from "../components/EstudianteForm";

const EstudiantePage = (props) => {
    const {estudiantes} = props;
    const navegar = useNavigate();

    


    return (
        <div>
            <button onClick={() => navegar("/estudiantes/nuevo")}>+</button>
            <button onClick= {() =>{
                localStorage.clear('token')
                navegar("/Usuarios/login")

            }}>Cerrar sesión</button>
            {
                estudiantes.map((estudiante)=>
                    <div key={estudiante.id}>
                    <Estudiante
                    nombre={estudiante.nombre}
                    edad={estudiante.edad}
                    url={estudiante.url}/>
                    <button onClick={()=>navegar(`/estudiantes/detalle/${estudiante.id}`)}>Detalle</button>
                    </div>
                    
                )
            }
            <button onClick={()=>navegar('/Usuarios')}>Ver Usuarios</button>
        </div>
    );
}
export default EstudiantePage;