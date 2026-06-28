import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../utils/api"
const token = localStorage.getItem('token')
const EstudianteForm = (props) => {
    const navegar = useNavigate();
    const { id } = useParams();
    const { onAgregar, onEditar, modo } = props;
    const esEdicion = modo === "editar";
    const [nuevoEstudiante, setNuevoEstudiante] = useState({
        nombre: "",
        edad: "",
        url: ""
    });
    const [errorNombre, setErrorNombre] = useState("");
    const [errorEdad, setErrorEdad] = useState("");
    const [errorForm, setErrorForm] = useState("");
    useEffect(() => {
        if (esEdicion) {
            api.get(`/estudiantes/${id}`, {headers: {Authorization: `Bearer ${token}`}})
                .then((res) => {
                    setNuevoEstudiante(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id, esEdicion]);
    const handlerSubmit = (e) => {
        e.preventDefault();

        if (nuevoEstudiante.nombre.length >= 6) {
            setErrorNombre("");
        } else {
            setErrorNombre("Nombre debe tener al menos 6 caracteres");
        }
        if (nuevoEstudiante.edad >= 18 && nuevoEstudiante.edad <= 100) {
            setErrorEdad("");
        } else {
            setErrorEdad("No menores de 18 ni mayores de 100");
        }

        if (nuevoEstudiante.nombre.length >= 6 &&
            nuevoEstudiante.edad >= 18 &&
            nuevoEstudiante.edad <= 100
        ) {
            setErrorForm("");

            const promesa = esEdicion
                ? onEditar(nuevoEstudiante.id, nuevoEstudiante)
                : onAgregar(nuevoEstudiante);

            promesa
                .then(() => {
                    navegar("/estudiantes");
                })
                .catch((err) => {
                    setErrorForm(err.response?.data?.mensaje || "Ocurrió un error");
                });
        }

    }

    return (
        <form onSubmit={handlerSubmit}>
            {
                esEdicion &&
                <div>
                    <label htmlFor="est_id">ID: </label>
                    <input
                        type="text"
                        value={nuevoEstudiante.id || ""}
                        disabled
                    />
                </div>
            }
            <div>
                <label htmlFor="est_nombre">
                    Nombre:
                </label>
                <input
                    type="text"
                    id="est_nombre"
                    name="nombre"
                    value={nuevoEstudiante.nombre}
                    onChange={(e) =>
                        setNuevoEstudiante(prev => ({
                            ...prev,
                            nombre: e.target.value
                        }))
                    }
                    required
                />
                <div style={{ color: "red" }}>{errorNombre}</div>
            </div>
            <div>
                <label htmlFor="est_edad">
                    Edad:
                </label>
                <input
                    type="number"
                    id="est_edad"
                    name="edad"
                    value={nuevoEstudiante.edad}
                    onChange={(e) =>
                        setNuevoEstudiante(prev => ({
                            ...prev,
                            edad: e.target.value
                        }))
                    }
                    required
                />
                <div style={{ color: "red" }}>{errorEdad}</div>
            </div>
            <div>
                <label htmlFor="est_url">
                    URL:
                </label>
                <input
                    type="text"
                    id="est_url"
                    name="url"
                    value={nuevoEstudiante.url}
                    onChange={(e) =>
                        setNuevoEstudiante(prev => ({
                            ...prev,
                            url: e.target.value
                        }))
                    }
                    required
                />
            </div>
            <div style={{ color: "red" }}>{errorForm}</div>
            <div>
                <input
                    type="submit"
                    value={esEdicion ? "Guardar cambios" : "Agregar"}
                />
            </div>
        </form>
    )
}

export default EstudianteForm;