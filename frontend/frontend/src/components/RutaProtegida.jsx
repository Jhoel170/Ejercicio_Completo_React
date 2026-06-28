import { Navigate } from "react-router-dom";

const RutaProtegida = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Navigate to="/usuarios/login" replace />;
    }

    return children;
}

export default RutaProtegida;