import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '' });
  const [error, setError] = useState(null); // Añadimos estado para errores

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
      setError(error); // Establece el estado de error
    } finally {
      // Opcional: Limpiar cualquier estado temporal relacionado al error
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/usuarios', nuevoUsuario);
      fetchUsuarios();
      setNuevoUsuario({ nombre: '', email: '' });
    } catch (error) {
      console.error('Error creando usuario:', error);
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Usuarios</h1>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={(e) => setNuevoUsuario({
            ...nuevoUsuario, 
            nombre: e.target.value
          })}
        />
        <input 
          type="email" 
          placeholder="Email"
          value={nuevoUsuario.email}
          onChange={(e) => setNuevoUsuario({
            ...nuevoUsuario, 
            email: e.target.value
          })}
        />
        <button type="submit">Crear Usuario</button>
      </form>

      <div>
        <h2>Usuarios</h2>
        <ul>
          {usuarios.map(usuario => (
            <li key={usuario.id}>
              {usuario.nombre} - {usuario.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;