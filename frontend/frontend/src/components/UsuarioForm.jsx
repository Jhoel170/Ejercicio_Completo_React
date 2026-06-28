import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/api"

const UsuarioForm = (props) => {
    const token = localStorage.getItem('token')
    const navegar = useNavigate();
    const { id } = useParams();
    const { onAgregar, onEditar, modo } = props;
    const esEdicion = modo === "editar"
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: "",
        email: ""
    });
    const [errorNombre, setErrorNombre] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorForm, setErrorForm] = useState("");
    const [errorPassword, setErrorPassword] = useState("")
    useEffect(() => {
        if (esEdicion) {
            api.get(`/usuarios/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    setNuevoUsuario(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id, esEdicion]);
    const handlerSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const nombreValido = nuevoUsuario.nombre.length >= 6;
        const emailValido = emailRegex.test(nuevoUsuario.email);
        const passwordValido = esEdicion || (nuevoUsuario.password && nuevoUsuario.password.length >= 6);

        setErrorNombre(nombreValido ? "" : "Nombre debe tener al menos 6 caracteres");
        setErrorEmail(emailValido ? "" : "Email inválido");
        setErrorPassword(passwordValido ? "" : "Password debe tener al menos 6 caracteres");

        if (nombreValido && emailValido && passwordValido) {
            setErrorForm("");
            const promesa = esEdicion
                ? onEditar(nuevoUsuario.id, nuevoUsuario)
                : onAgregar(nuevoUsuario)
            promesa
                .then(() => {
                    navegar('/usuarios')
                })
                .catch((err) => {
                    setErrorForm(err.response?.data?.mensaje || "Ocurrió un error");
                })
        }
    }
    return (
        <form onSubmit={handlerSubmit}>
            {
                esEdicion &&
                <div>
                    <label htmlFor="ad_id">ID: </label>
                    <input
                        type="text"
                        value={nuevoUsuario.id || ""}
                        disabled
                    />
                </div>
            }
            <div>
                <label htmlFor="ad_nombre">
                    Nombre:
                </label>
                <input
                    type="text"
                    id="ad_nombre"
                    name="nombre"
                    value={nuevoUsuario.nombre}
                    onChange={(e) =>
                        setNuevoUsuario(prev => ({
                            ...prev,
                            nombre: e.target.value
                        }))
                    }
                    required
                />
                <div style={{ color: "red" }}>{errorNombre}</div>
                <div>
                    <label htmlFor="ad_email">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="ad_email"
                        name="email"
                        value={nuevoUsuario.email || ""}
                        onChange={(e) =>
                            setNuevoUsuario(prev => ({
                                ...prev,
                                email: e.target.value
                            }))
                        }
                        required
                    />
                    <div style={{ color: "red" }}>{errorEmail}</div>
                </div>
                <div>
                    <label htmlFor="ad_password">Password: </label>
                    <input
                        type="password"
                        id="ad_password"
                        name="password"
                        value={nuevoUsuario.password || ""}
                        onChange={(e) =>
                            setNuevoUsuario(prev => ({
                                ...prev,
                                password: e.target.value
                            }))
                        }
                        required={!esEdicion}
                        disabled={esEdicion}
                    />
                    <div style={{ color: "red" }}>{errorPassword}</div>
                </div>
                <div>
                    <input
                        type="submit"
                        value={esEdicion ? "Guardar cambios" : "Agregar"}
                    />
                </div>
            </div>
        </form>
    );
}

export default UsuarioForm