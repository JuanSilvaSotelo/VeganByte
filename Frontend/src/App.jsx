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
import Calendar from './pages/Calendar';
import CreateEvent from './pages/Calendar/CreateEvent';
import EventBooking from './pages/Calendar/EventBooking';
import './styles/styles.css';

function App() {
    return (
      <ErrorBoundary>
        <Router>
            <Routes>
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
            </Routes>
        </Router>
      </ErrorBoundary>
    );
}

export default App;
