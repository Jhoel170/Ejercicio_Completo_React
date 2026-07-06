import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MateriaForm = (props) => {
    const navegar = useNavigate();
    const { id } = useParams();
    const { onAgregar, onEditar, modo, materias = [] } = props;
    const esEdicion = modo === "editar";
    const [nuevaMateria, setNuevaMateria] = useState({
        nombre: ""
    });
    const [errorNombre, setErrorNombre] = useState("");
    const [errorForm, setErrorForm] = useState("");

    useEffect(() => {
        if (esEdicion) {
            const materiaEncontrada = materias.find((m) => m.id == id);
            if (materiaEncontrada) {
                setNuevaMateria(materiaEncontrada);
            }
        }
    }, [id, esEdicion, materias]);

    const handlerSubmit = (e) => {
        e.preventDefault();

        if (nuevaMateria.nombre.length >= 3) {
            setErrorNombre("");
        } else {
            setErrorNombre("Nombre debe tener al menos 3 caracteres");
        }

        if (nuevaMateria.nombre.length >= 3) {
            setErrorForm("");

            const promesa = esEdicion
                ? onEditar(nuevaMateria.id, nuevaMateria)
                : onAgregar(nuevaMateria);

            promesa
                .then(() => {
                    navegar("/materias");
                })
                .catch((err) => {
                    setErrorForm(err.response?.data?.mensaje || err.response?.data?.message || "Ocurrió un error");
                });
        }
    };

    return (
        <form onSubmit={handlerSubmit}>
            {
                esEdicion &&
                <div>
                    <label htmlFor="mat_id">ID: </label>
                    <input
                        type="text"
                        value={nuevaMateria.id || ""}
                        disabled
                    />
                </div>
            }
            <div>
                <label htmlFor="mat_nombre">
                    Nombre:
                </label>
                <input
                    type="text"
                    id="mat_nombre"
                    name="nombre"
                    value={nuevaMateria.nombre}
                    onChange={(e) =>
                        setNuevaMateria(prev => ({
                            ...prev,
                            nombre: e.target.value
                        }))
                    }
                    required
                />
                <div style={{ color: "red" }}>{errorNombre}</div>
            </div>
            <div style={{ color: "red" }}>{errorForm}</div>
            <div>
                <input
                    type="submit"
                    value={esEdicion ? "Guardar cambios" : "Agregar"}
                />
            </div>
        </form>
    );
};

export default MateriaForm;