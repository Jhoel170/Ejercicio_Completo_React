import Estudiante from "../components/Estudiante";
import { useNavigate } from "react-router-dom";

const EstudiantePage = (props) => {
    const { estudiantes } = props;
    const navegar = useNavigate();
    const rol = localStorage.getItem('rol');

    return (
        <div>
            {rol === "admin" && (
                <button onClick={() => navegar("/estudiantes/nuevo")}>+</button>
            )}
            <button onClick={() => {
                localStorage.clear()
                navegar("/Usuarios/login")
            }}>Cerrar sesión</button>
            {
                estudiantes.map((estudiante) =>
                    <div key={estudiante.id}>
                        <Estudiante
                            nombre={estudiante.nombre}
                            edad={estudiante.edad}
                            url={estudiante.url} />
                        <button onClick={() => navegar(`/estudiantes/detalle/${estudiante.id}`)}>Detalle</button>
                    </div>
                )
            }
            <button onClick={() => navegar('/materias')}>Ver Materias</button>
            {rol === "admin" && (
                <button onClick={() => navegar('/Usuarios')}>Ver Usuarios</button>
            )}
        </div>
    );
}
export default EstudiantePage;