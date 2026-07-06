import { useState, useEffect } from "react";
import { api } from "../utils/api";

export const useMatricula = (estudianteId) => {
    const [matriculas, setMatriculas] = useState([]);

    // La sacamos aparte porque la reusamos después de matricular
    const cargarMatriculas = () => {
        if (!estudianteId) return;
        const token = localStorage.getItem('token');
        api.get(`/materia/${estudianteId}/matriculas`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setMatriculas(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        cargarMatriculas();
    }, [estudianteId]);

    const matricularMateria = (materiaId) => {
        const token = localStorage.getItem('token');
        return api.post("/matricula/nueva", { EstudianteId: estudianteId, MateriaId: materiaId }, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                // el backend no devuelve la materia anidada al crear,
                // así que recargamos la lista completa (esa sí trae el nombre)
                cargarMatriculas();
                return res.data;
            })
            .catch((err) => {
                console.log("Error al matricular la materia");
                throw err;
            });
    };

    const eliminarMatricula = (materiaId) => {
        const token = localStorage.getItem('token');
        return api.delete(`/matricula/${estudianteId}/${materiaId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                setMatriculas(prev => prev.filter(m => m.MateriaId != materiaId));
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    };

    return { matriculas, matricularMateria, eliminarMatricula };
};