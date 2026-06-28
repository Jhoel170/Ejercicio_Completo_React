import { useState, useEffect } from "react";
import { api } from "../utils/api";

const token = localStorage.getItem('token')
export const useEstudiante = () => {
    
    const [estudiantes, setEstudiantes] = useState([]);
     useEffect(() => {
        const token = localStorage.getItem('token')
        api.get("/estudiantes", {headers: {Authorization: `Bearer ${token}`}})
            .then((res) => {
                setEstudiantes(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [token])

    const agregarEstudiante = (nuevoEstudiante) => {
        const token = localStorage.getItem('token')
        console.log(token);
        return api.post("/estudiantes", nuevoEstudiante, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setEstudiantes(prev => [...prev, res.data]);
                return res.data;
            })
            .catch((err) => {
                console.log("Error al agregar un estudiante");
                throw err;
            })
    }
    const eliminarEstudiante = (id) => {
        const token = localStorage.getItem('token')
        api.delete(`/estudiantes/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => setEstudiantes(prev => prev.filter(e => e.id != id)))
            .catch((err) => {
                console.log(err);
            })
    }
    const editarEstudiante = (id, estudianteActualizado) => {
        const token = localStorage.getItem('token')
        return api.put(`/estudiantes/${id}`, estudianteActualizado, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setEstudiantes(prev =>
                    prev.map(est =>
                        est.id == id ? res.data : est
                    )
                );
                return res.data;
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }

    return { estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante }

}