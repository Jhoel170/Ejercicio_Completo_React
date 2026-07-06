import Materia from "../components/MateriaForm";
import { useNavigate } from "react-router-dom";

const MateriaPage = (props) => {
    const { materias, onEliminar } = props;
    const navegar = useNavigate();
    const rol = localStorage.getItem('rol');

    return (
        <div>
            {rol === "admin" && (
                <button onClick={() => navegar("/materias/nuevo")}>+</button>
            )}
            <button onClick={() => {
                localStorage.clear()
                navegar("/usuarios/login")
            }}>Cerrar sesión</button>
            {
                materias.map((materia) =>
                    <div key={materia.id}>
                        <Materia nombre={materia.nombre} />
                        <button onClick={() => navegar(`/materias/editar/${materia.id}`)}>Editar</button>
                        <button onClick={() => onEliminar(materia.id)}>Eliminar</button>
                    </div>
                )
            }
            <div>
                <button onClick={() => navegar('/estudiantes')}>Volver</button>
            </div>
        </div>
    );
};

export default MateriaPage;