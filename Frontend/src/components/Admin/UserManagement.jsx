import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../services/apiConfig';
import '../../styles/UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        Nombre: '',
        Apellido: '',
        Correo: '',
        fecha_Nacimiento: '',
        Direccion: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`${API_BASE_URL}/admin/usuarios-activos`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar usuarios.');
            setLoading(false);
            console.error('Error fetching users:', err);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user.Id_Cliente);
        setFormData({
            Nombre: user.Nombre,
            Apellido: user.Apellido,
            Correo: user.Correo,
            fecha_Nacimiento: user.fecha_Nacimiento ? user.fecha_Nacimiento.split('T')[0] : '',
            Direccion: user.Direccion
        });
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        setFormData({
            Nombre: '',
            Apellido: '',
            Correo: '',
            fecha_Nacimiento: '',
            Direccion: ''
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${API_BASE_URL}/admin/usuarios/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Usuario actualizado exitosamente.');
            fetchUsers();
            setEditingUser(null);
        } catch (err) {
            alert('Error al actualizar usuario.');
            console.error('Error updating user:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                const token = localStorage.getItem('adminToken');
                await axios.delete(`${API_BASE_URL}/admin/usuarios/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('Usuario eliminado exitosamente.');
                fetchUsers();
            } catch (err) {
                alert('Error al eliminar usuario.');
                console.error('Error deleting user:', err);
            }
        }
    };

    const handleResetPassword = async (id) => {
        const newPassword = prompt('Introduce la nueva contraseña para el usuario:');
        if (newPassword) {
            try {
                const token = localStorage.getItem('adminToken');
                await axios.put(`${API_BASE_URL}/admin/usuarios/${id}`, { Contraseña: newPassword }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('Contraseña restablecida exitosamente.');
            } catch (err) {
                alert('Error al restablecer la contraseña.');
                console.error('Error resetting password:', err);
            }
        }
    };

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="user-management-container">
            <h2>Gestión de Usuarios</h2>
            {users.length === 0 ? (
                <p>No hay usuarios registrados.</p>
            ) : (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Dirección</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.Id_Cliente}>
                                {editingUser === user.Id_Cliente ? (
                                    <>
                                        <td><input type="text" name="Nombre" value={formData.Nombre} onChange={handleChange} /></td>
                                        <td><input type="text" name="Apellido" value={formData.Apellido} onChange={handleChange} /></td>
                                        <td><input type="email" name="Correo" value={formData.Correo} onChange={handleChange} /></td>
                                        <td><input type="date" name="fecha_Nacimiento" value={formData.fecha_Nacimiento} onChange={handleChange} /></td>
                                        <td><input type="text" name="Direccion" value={formData.Direccion} onChange={handleChange} /></td>
                                        <td className="actions">
                                            <button onClick={() => handleUpdate(user.Id_Cliente)} className="save-btn">Guardar</button>
                                            <button onClick={handleCancelEdit} className="cancel-btn">Cancelar</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{user.Nombre}</td>
                                        <td>{user.Apellido}</td>
                                        <td>{user.Correo}</td>
                                        <td>{user.fecha_Nacimiento ? new Date(user.fecha_Nacimiento).toLocaleDateString() : 'N/A'}</td>
                                        <td>{user.Direccion || 'N/A'}</td>
                                        <td className="actions">
                                            <button onClick={() => handleEdit(user)} className="edit-btn">Editar</button>
                                            <button onClick={() => handleResetPassword(user.Id_Cliente)} className="reset-password-btn">Restablecer Contraseña</button>
                                            <button onClick={() => handleDelete(user.Id_Cliente)} className="delete-btn">Eliminar</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserManagement;