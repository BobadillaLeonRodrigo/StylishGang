import react from 'react';
import { Routes, Route } from 'react-router';
/* Importacion de los componetes de las paginas a llamar */
import Ordenes from './components/paginas/Ordenes';
import Tienda from './components/paginas/Tienda';
import NuevoArticulo from './components/paginas/NuevoArticulo';
import Sidebar from './components/ui/Sidebar';

function App() {
  return (
    <div className="md:flex min-h-screen">
      <Sidebar />
      <div className="md:w-3/5 xl:w-4/5 p-6">
        <Routes>
          <Route path="/" element={<Ordenes />}/>
          <Route path="/Tienda" element={<Tienda />}/>
          <Route path="/nuevo-articulo" element={<NuevoArticulo />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
