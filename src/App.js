import react from 'react';
import { Routes, Route } from 'react-router';
/* Importacion de los componetes de las paginas a llamar */
import Ordenes from './components/paginas/Ordenes';
import Tienda from './components/paginas/Tienda';
import NuevoArticulo from './components/paginas/NuevoArticulo';
import Sidebar from './components/ui/Sidebar';

function App() {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Ordenes/>}/>
        <Route path="/Tienda" element={<Tienda/>}/>
        <Route path="/Nuevo-Articulo" element={<NuevoArticulo/>}/>
      </Routes>
    </div>
  );
}

export default App;
