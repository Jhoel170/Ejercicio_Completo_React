import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/api";
import { useMatricula } from "../hooks/useMatricula";

const DetalleEstudiante = (props) => {
    const [estudiante, setEstudiante] = useState({});
    const { id } = useParams();
    const navegar = useNavigate();

    const token = localStorage.getItem('token')

    const { onEliminar, materias = [] } = props;
    const { matriculas, matricularMateria, eliminarMatricula } = useMatricula(id);

    const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
    const [errorMatricula, setErrorMatricula] = useState("");

    useEffect(() => {
        api.get(`/estudiantes/${id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then(res => setEstudiante(res.data))
            .catch(err => console.log(err))
    }, []);

    const idsMatriculados = matriculas.map(m => m.MateriaId);
    const materiasDisponibles = materias.filter(m => !idsMatriculados.includes(m.id));

    const handlerMatricular = () => {
        if (!materiaSeleccionada) {
            setErrorMatricula("Selecciona una materia");
            return;
        }
        matricularMateria(materiaSeleccionada)
            .then(() => {
                setErrorMatricula("");
                setMateriaSeleccionada("");
            })
            .catch((err) => {
                setErrorMatricula(err.response?.data?.mensaje || err.response?.data?.message || "Ocurrió un error al matricular");
            });
    };

    return(
        <div>
            <h2>{estudiante.nombre}</h2>
            <h4>Edad: {estudiante.edad}</h4>
            {estudiante.url?<a href={estudiante.url}>Home Page</a>:<span>Home page no disponible</span>}
            <div>
                <button onClick={() => navegar(`/estudiantes/editar/${id}`)}>Editar</button>
                <button onClick={() => {onEliminar(estudiante.id); navegar("/estudiantes")}} >Eliminar</button>
            </div>

            <h3>Materias matriculadas</h3>
            {
                matriculas.length === 0
                    ? <p>Este estudiante no tiene materias matriculadas</p>
                    : (
                        <ul>
                            {matriculas.map((matricula) => (
                                <li key={matricula.id}>
                                    {matricula.Materia?.nombre || `Materia ${matricula.MateriaId}`}
                                    {" "}
                                    <button onClick={() => eliminarMatricula(matricula.MateriaId)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>
                    )
            }

            <h4>Matricular en una nueva materia</h4>
            <select
                value={materiaSeleccionada}
                onChange={(e) => setMateriaSeleccionada(e.target.value)}
            >
                <option value="">-- Selecciona una materia --</option>
                {materiasDisponibles.map((materia) => (
                    <option key={materia.id} value={materia.id}>
                        {materia.nombre}
                    </option>
                ))}
            </select>
            <button onClick={handlerMatricular}>Matricular</button>
            <div style={{ color: "red" }}>{errorMatricula}</div>

            <div>
                <button onClick={() => navegar("/estudiantes")}>Volver</button>
            </div>
        </div>
    )
}

export default DetalleEstudiante;