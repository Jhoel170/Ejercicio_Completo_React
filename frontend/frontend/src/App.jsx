import EstudianteForm from "./components/EstudianteForm";
import EstudiantesPage from "./pages/EstudiantePage";
import HomePage from "./pages/HomePage";
import DetalleEstudiante from "./pages/DetalleEstudiante";
import UsuarioDetalle from "./pages/UsuarioDetalle";
import UsuarioPage from "./pages/UsuarioPage";
import UsuarioForm from "./components/UsuarioForm";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEstudiante } from "./hooks/useEstudiante"; 
import { useUsuario } from "./hooks/useUsuario";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/LoginForm";




const App = () => {

  const { estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante} = useEstudiante();
  const { usuarios, agregarUsuario, eliminarUsuario, editarUsuario, loginUsuario} = useUsuario();

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/estudiantes" element= {<EstudiantesPage estudiantes = {estudiantes} onEliminar = {eliminarEstudiante}/>}></Route> {/* 3 */ }
        <Route path="/estudiantes/nuevo" element= {<EstudianteForm onAgregar = {agregarEstudiante} />}></Route>
        <Route path= "/estudiantes/detalle/:id" element= {<DetalleEstudiante onEliminar = {eliminarEstudiante} onEditar = {editarEstudiante} />}></Route>
        <Route path = "/estudiantes/editar/:id" element = {<EstudianteForm modo="editar" onEditar ={editarEstudiante}/>}></Route>
        
        <Route path="/" element= {<HomePage/>}></Route>
        <Route path="/usuarios" element= {<UsuarioPage usuarios = {usuarios} onEliminar ={eliminarUsuario}></UsuarioPage>}></Route>
        <Route path="/usuarios/nuevo" element={<UsuarioForm onAgregar = {agregarUsuario}></UsuarioForm>}></Route>
        <Route path= "/usuarios/detalle/:id" element={<UsuarioDetalle onEliminar={eliminarUsuario} onEditar={editarUsuario}></UsuarioDetalle>}></Route>
        <Route path="/usuarios/editar/:id" element={<UsuarioForm modo="editar" onEditar={editarUsuario}></UsuarioForm>}></Route>
        <Route path="/usuarios/login" element = {<LoginPage onLogin={loginUsuario}></LoginPage>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;