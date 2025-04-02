import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Login from './pages/Login';
import Register from './pages/Register';
import Inicio from './pages/Inicio';
import './styles/styles.css';

function App() {
    return (
      <ErrorBoundary>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Inicio />} /> {/* Ruta por defecto */}
            </Routes>
        </Router>
      </ErrorBoundary>
    );
}
<script src="http://localhost:5173"></script>
export default App;
