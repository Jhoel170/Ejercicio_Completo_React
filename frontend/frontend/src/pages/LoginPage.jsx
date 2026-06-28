import LoginForm from "../components/LoginForm";
import { useUsuario } from "../hooks/useUsuario";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const { loginUsuario, errorLogin } = useUsuario();
    const navegar = useNavigate();
    

    const manejarLogin = (email, password) => {
        
        loginUsuario(email, password)
            .then((exito) => {
                
                if (exito) {
                    
                    navegar("/estudiantes")
                }
            })
    }
    return (
        <div>
            <LoginForm onLogin={manejarLogin} />
            {errorLogin && <p style={{ color: "red" }}>{errorLogin}</p>}
            <div>

            </div>
        </div>

    );
};

export default LoginPage;