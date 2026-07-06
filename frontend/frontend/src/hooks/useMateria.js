import { useState, useEffect } from "react";
import { api } from "../utils/api";

export const useMateria = () => {
    const [materias, setMaterias] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        api.get("/materias", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setMaterias(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const agregarMateria = (nuevaMateria) => {
        const token = localStorage.getItem('token');
        return api.post("/materia", nuevaMateria, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setMaterias(prev => [...prev, res.data]);
                return res.data;
            })
            .catch((err) => {
                console.log("Error al agregar una materia");
                throw err;
            });
    };

    const eliminarMateria = (id) => {
        const token = localStorage.getItem('token');
        api.delete(`/materia/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => setMaterias(prev => prev.filter(m => m.id != id)))
            .catch((err) => {
                console.log(err);
            });
    };

    const editarMateria = (id, materiaActualizada) => {
        const token = localStorage.getItem('token');
        return api.put(`/materia/${id}`, materiaActualizada, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setMaterias(prev =>
                    prev.map(m => m.id == id ? res.data : m)
                );
                return res.data;
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    };

    return { materias, agregarMateria, eliminarMateria, editarMateria };
};