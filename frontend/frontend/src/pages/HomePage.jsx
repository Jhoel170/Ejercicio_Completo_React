import { Link } from "react-router-dom"

function HomePage() {
 return(
    <div>
        <h1><em><strong>Bienvenidos</strong></em></h1>
        
        <Link to={"/usuarios/login"}>Iniciar Sesión</Link>

        
    </div>
 )
}

export default HomePage;