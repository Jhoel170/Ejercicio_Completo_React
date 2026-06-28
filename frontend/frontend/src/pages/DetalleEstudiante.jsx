import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/api";
import { Navigate } from "react-router-dom";

const DetalleEstudiante = (props) => {
    const [estudiante, setEstudiante] = useState({});
    const { id } = useParams();
    const navegar = useNavigate();

    const token = localStorage.getItem('token')

    const {onEliminar} = props;

    useEffect(() => {
        api.get(`/estudiantes/${id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then(res => setEstudiante(res.data))
            .catch(err => console.log(err))
    }, []);

    return(
        <div>
            <h2>{estudiante.nombre}</h2>
            <h4>Edad: {estudiante.edad}</h4>
            {estudiante.url?<a href={estudiante.url}>Home Page</a>:<span>Home page no disponible</span>}
            <div>
                <button onClick={() => navegar(`/estudiantes/editar/${id}`)}>Editar</button>
                <button onClick={() => {onEliminar(estudiante.id); navegar("/estudiantes")}} >Eliminar</button>
            </div>
            <div>
                <button onClick={() => navegar("/estudiantes")}>Volver</button>
            </div>
            
        </div>
    )
}

export default DetalleEstudiante;