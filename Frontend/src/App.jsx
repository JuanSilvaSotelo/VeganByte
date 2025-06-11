import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Login from './pages/Login';
import Register from './pages/Register';
import Inicio from './pages/Inicio';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './components/Admin/Dashboard';
import ProtectedAdminRoute from './components/Admin/ProtectedRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Calendar from './pages/Calendar.jsx';
import CreateEvent from './components/Calendar/CreateEvent';
import EventBooking from './components/Calendar/EventBooking';
import RequestReset from './pages/RequestReset';
import ResetPassword from './pages/ResetPassword';
import PCCocina from './pages/PCCocina';
import PCHuerta from './pages/PCHuerta';
import PCEntrenamiento from './pages/PCEntrenamiento';
import PCBlog from './pages/PCBlog';
import './styles/styles.css';

function App() {
    return (
      <ErrorBoundary>
        <Router>
            <Routes>
                <Route path="/pc-cocina" element={<PCCocina />} />
                <Route path="/pc-huerta" element={<PCHuerta />} />
                <Route path="/pc-entrenamiento" element={<PCEntrenamiento />} />
                <Route path="/pc-blog" element={<PCBlog />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/calendar/create" element={
                  <ProtectedAdminRoute>
                    <CreateEvent />
                  </ProtectedAdminRoute>
                } />
                <Route path="/calendar/book/:eventId" element={
                  <ProtectedRoute>
                    <EventBooking />
                  </ProtectedRoute>
                } />
                <Route path="/" element={<Inicio />} /> {/* Ruta por defecto */}
                
                {/* Rutas de administración */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard/*" element={
                  <ProtectedAdminRoute>
                    <Dashboard />
                  </ProtectedAdminRoute>
                } />
                
                {/* Rutas de restablecimiento de contraseña */}
                <Route path="/request-reset" element={<RequestReset />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
        </Router>
      </ErrorBoundary>
    );
}

export default App;
