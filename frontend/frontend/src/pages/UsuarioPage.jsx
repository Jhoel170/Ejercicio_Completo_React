import Usuario from "../components/Usuario";
import { useNavigate } from "react-router-dom";
import UsuarioForm from "../components/UsuarioForm"
const UsuarioPage =(props)=> {
    const {usuarios} = props;
    const navegar = useNavigate();

    return(
      <div>
        <button 
        onClick={() => navegar("/usuarios/nuevo")}
        >+</button>
            <button onClick= {() =>{
                localStorage.clear('token')
                navegar("/usuarios/login")

            }}>Cerrar sesión</button>
            {
                usuarios.map((usuarios) => 
                    <div key={usuarios.id}> 
                        <Usuario
                        nombre={usuarios.nombre}
                        email={usuarios.email}
                        password={usuarios.password}/>
                        <button onClick={() => navegar(`/usuarios/detalle/${usuarios.id}`) }>Detalle</button>
                        
                    </div>
                    
                )
            }
            <div>
                <button onClick={()=> navegar('/estudiantes')}>Volver</button>
            </div>
      </div>  
    );
}

export default UsuarioPage;