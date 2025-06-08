// Importar las dependencias necesarias
import React, { useState } from 'react'; // Importar React y el hook useState
import { useNavigate } from 'react-router-dom'; // Importar el hook useNavigate para la navegación
import Header from '../components/Header'; // Importar el componente Header
import Footer from '../components/Footer'; // Importar el componente Footer
import Input from '../components/Input'; // Importar el componente Input
import Button from '../components/Button'; // Importar el componente Button
import { loginUser  } from '../services/authService'; // Importar la función para iniciar sesión
import '../styles/Login.css'; // Importar estilos para el componente

// Componente funcional Login
function Login() {
  const navigate = useNavigate(); // Hook para la navegación
  const [formData, setFormData] = useState({ // Estado para almacenar los datos del formulario
    Usuario: '',
    Contraseña: ''
  });

  const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga
  const [error, setError] = useState(''); // Estado para manejar mensajes de error
  const [success, setSuccess] = useState(''); // Estado para manejar mensajes de éxito

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setError(''); // Limpiar mensajes de error
    setSuccess(''); // Limpiar mensajes de éxito

    try {
      setLoading(true); // Activar el estado de carga
      const response = await loginUser (formData); // Llamar a la función de inicio de sesión

      // Verificar si se recibió un token en la respuesta
      if (response.token) {
        setSuccess('Inicio de sesión exitoso'); // Establecer mensaje de éxito
        // Redirigir automáticamente a la página de inicio después de 1 segundo
        setTimeout(() => {
          navigate('/'); // Navegar a la página de inicio
        }, 1000);
      }
    } catch (err) {
      // Manejar errores de inicio de sesión
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          "Error al iniciar sesión"; // Mensaje de error
      setError(errorMessage); // Establecer el mensaje de error
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value // Actualizar el estado del formulario
    });
  };

  // Renderizar el componente
  return (
    <div>
      <Header /> {/* Renderizar el componente Header */}
      <main>
        <div className="login-container"> {/* Contenedor principal del formulario de inicio de sesión */}
          <h2>INICIAR SESIÓN</h2> {/* Título del formulario */}

          {error && <div className="error-message">{error}</div>} {/* Mostrar mensaje de error si existe */}
          {success && <div className="success-message">{success}</div>} {/* Mostrar mensaje de éxito si existe */}

          <form onSubmit={handleSubmit}> {/* Formulario que maneja el envío */}
            <Input
              label="Usuario (Email o Documento)" // Etiqueta del campo
              name="Usuario" // Nombre del campo
              type="text" // Tipo de campo
              value={formData.Usuario} // Valor del campo
              onChange={handleChange} // Manejar cambios en el campo
              required // Campo obligatorio
            />
            <Input
              label="Contraseña" // Etiqueta del campo
              name="Contraseña" // Nombre del campo
              type="password" // Tipo de campo
              value={formData.Contraseña} // Valor del campo
              onChange={handleChange} // Manejar cambios en el campo
              required // Campo obligatorio
            />
            <div className="form-actions"> {/* Contenedor para las acciones del formulario */}
              <Button type="submit" disabled={loading}> {/* Botón de envío */}
                {loading ? 'Ingresando...' : 'Ingresar'} {/* Cambiar texto según el estado de c arga */}
              </Button>
              <div className="login-links"> {/* Enlaces de ayuda */}
                <a href="/request-reset" className="forgot-password-link"> {/* Enlace para recuperar contraseña */}
                  ¿Olvidaste tu contraseña?
                </a>
                <a href="/admin/login" className="admin-login-link"> {/* Enlace para acceso de administrador */}
                  Acceso Administrador
                </a>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer /> {/* Renderizar el componente Footer */}
    </div>
  );
}

export default Login; // Exportar el componente Login
