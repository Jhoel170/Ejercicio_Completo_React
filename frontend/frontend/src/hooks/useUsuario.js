import { useEffect, useState } from "react";
import { api } from "../utils/api"


export const useUsuario = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const [usuarios, setUsuarios] = useState([])
     useEffect(() => {
        const handleStorageChange = () => {
            const nuevoToken = localStorage.getItem('token');
            setToken(nuevoToken);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        if(token){
            api.get("/Usuarios", { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    setUsuarios(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [token]);

    const agregarUsuario = (nuevoUsuario) => {

        return api.post("/usuarios", nuevoUsuario, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setUsuarios(prev => [...prev, res.data]);
                return res.data;
            })
            .catch((err) => {
                console.log("Error al agregar un usuario");
                throw err;
            })
    }

    const eliminarUsuario = (id) => {
        api.delete(`/usuarios/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => setUsuarios(prev => prev.filter(e => e.id != id)))
            .catch((err) => {
                console.log(err);
            })
    }

    const editarUsuario = (id, usuarioActualizado) => {
        return api.put(`/usuarios/${id}`, usuarioActualizado, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                setUsuarios(prev =>
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

    const loginUsuario = (email, password) => {
        return api.post("/usuarios/login", { email, password })
            .then((res) => {
                
                const tokenNuevo = res.data.token
                localStorage.setItem('token', tokenNuevo)
                
                return true;

            })
            .catch(() => { 
                
                return false; 
                console.log("Login Fallido"); return false; })
    }
    return {usuarios, agregarUsuario, eliminarUsuario, editarUsuario, loginUsuario}
}