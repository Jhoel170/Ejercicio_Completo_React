import EstudianteForm from "./components/EstudianteForm";
import EstudiantesPage from "./pages/EstudiantePage";
import HomePage from "./pages/HomePage";
import DetalleEstudiante from "./pages/DetalleEstudiante";
import UsuarioDetalle from "./pages/UsuarioDetalle";
import UsuarioPage from "./pages/UsuarioPage";
import UsuarioForm from "./components/UsuarioForm";
import RutaProtegida from "./components/RutaProtegida";
import MateriaPage from "./pages/MateriaPage";
import MateriaForm from "./components/MateriaForm";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEstudiante } from "./hooks/useEstudiante"; 
import { useUsuario } from "./hooks/useUsuario";
import { useMateria } from "./hooks/useMateria";
import LoginPage from "./pages/LoginPage";

const App = () => {

  const { estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante} = useEstudiante();
  const { usuarios, agregarUsuario, eliminarUsuario, editarUsuario, loginUsuario} = useUsuario();
  const { materias, agregarMateria, eliminarMateria, editarMateria } = useMateria();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/usuarios/login" element={<LoginPage onLogin={loginUsuario}/>} />

        {/* Rutas protegidas */}
        <Route path="/estudiantes" element={<RutaProtegida><EstudiantesPage estudiantes={estudiantes} onEliminar={eliminarEstudiante}/></RutaProtegida>} />
        <Route path="/estudiantes/nuevo" element={<RutaProtegida><EstudianteForm onAgregar={agregarEstudiante}/></RutaProtegida>} />
        <Route path="/estudiantes/detalle/:id" element={<RutaProtegida><DetalleEstudiante onEliminar={eliminarEstudiante} onEditar={editarEstudiante} materias={materias}/></RutaProtegida>} />
        <Route path="/estudiantes/editar/:id" element={<RutaProtegida><EstudianteForm modo="editar" onEditar={editarEstudiante}/></RutaProtegida>} />
        
        <Route path="/usuarios" element={<RutaProtegida><UsuarioPage usuarios={usuarios} onEliminar={eliminarUsuario}/></RutaProtegida>} />
        <Route path="/usuarios/nuevo" element={<RutaProtegida><UsuarioForm onAgregar={agregarUsuario}/></RutaProtegida>} />
        <Route path="/usuarios/detalle/:id" element={<RutaProtegida><UsuarioDetalle onEliminar={eliminarUsuario} onEditar={editarUsuario}/></RutaProtegida>} />
        <Route path="/usuarios/editar/:id" element={<RutaProtegida><UsuarioForm modo="editar" onEditar={editarUsuario}/></RutaProtegida>} />

        {/* Rutas de Materias */}
        <Route path="/materias" element={<RutaProtegida><MateriaPage materias={materias} onEliminar={eliminarMateria}/></RutaProtegida>} />
        <Route path="/materias/nuevo" element={<RutaProtegida><MateriaForm onAgregar={agregarMateria}/></RutaProtegida>} />
        <Route path="/materias/editar/:id" element={<RutaProtegida><MateriaForm modo="editar" onEditar={editarMateria} materias={materias}/></RutaProtegida>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;