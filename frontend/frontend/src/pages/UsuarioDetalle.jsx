import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/api";
import { Navigate } from "react-router-dom";

const token = localStorage.getItem('token')
const UsuarioDetalle = (props) => {
    const [usuario, setUsuario] = useState({});
    const { id } = useParams();
    const navegar = useNavigate();

    const {onEliminar} = props;

    useEffect(() => {
        api.get(`/usuarios/${id}`, {headers: {Authorization: `Bearer ${token}`}})
            .then(res => setUsuario(res.data))
            .catch(err => console.log(err))
    }, []);

    return(
        <div>
            <h2>{usuario.nombre}</h2>
            <h4>Correo: {usuario.email}</h4>
            <div>
                <button onClick={() => navegar(`/usuarios/editar/${id}`)}>Editar</button>
                <button onClick={() => {onEliminar(usuario.id); navegar("/usuarios")}} >Eliminar</button>
            </div>
            
        </div>
    )
}

export default UsuarioDetalle;