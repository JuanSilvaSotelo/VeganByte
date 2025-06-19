import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Login from './pages/Login';
import Register from './pages/Register';
import Inicio from './pages/Inicio';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './components/Admin/Dashboard';
import Admin from './pages/Admin';
import ProtectedAdminRoute from './components/Admin/ProtectedRoute';
import ProtectedRoute from './components/ProtectedRoute';
import UserManagement from './components/Admin/UserManagement';
import Calendar from './pages/Calendar.jsx';
import CreateEvent from './components/Calendar/CreateEvent';
import EventBooking from './components/Calendar/EventBooking';
import RequestReset from './pages/RequestReset';
import ResetPassword from './pages/ResetPassword';
import VerificationSent from './pages/VerificationSent';
import VerifyEmail from './pages/VerifyEmail';

import AboutUs from './pages/AboutUs';
import Cocina from './pages/Cocina';
import PCHuerta from './pages/PCHuerta';
import PCEntrenamiento from './pages/PCEntrenamiento';
import PCSenderismoInfo from './pages/PCSenderismoInfo';
import PCBlog from './pages/PCBlog';
import Galeria from './pages/Galeria';
import WhatsAppButton from './components/WhatsAppButton';
import './styles/styles.css';

function App() {
    return (
      <ErrorBoundary>
        <Router>
            <Routes>
                <Route path="/servicios/cocina" element={<Cocina />} />
                <Route path="/servicios/huerta" element={<PCHuerta />} />
                <Route path="/servicios/senderismo" element={<PCSenderismoInfo />} />
                <Route path="/servicios/entrenamiento" element={<PCEntrenamiento />} />
                <Route path="/social/galeria" element={<Galeria />} />
                <Route path="/social/blog" element={<PCBlog />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verification-sent" element={<VerificationSent />} />
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
                <Route path="/admin/eventos" element={
                  <ProtectedAdminRoute>
                    <Admin />
                  </ProtectedAdminRoute>
                } />
                <Route path="/admin/user-management" element={
                  <ProtectedAdminRoute>
                    <UserManagement />
                  </ProtectedAdminRoute>
                } />
                
                {/* Rutas de restablecimiento de contraseña */}
                <Route path="/request-reset" element={<RequestReset />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/about-us" element={<AboutUs />} />
            </Routes>
            <WhatsAppButton />
        </Router>
      </ErrorBoundary>
    );
}

export default App;
