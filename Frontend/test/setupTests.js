import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from './Login';

jest.mock('axios');

describe('Login Component', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test('renders login form with inputs and button', () => {
    render(<Login />);
    expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    render(<Login />);
    const userInput = screen.getByLabelText(/Usuario/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);

    fireEvent.change(userInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(userInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });

  test('submits form and handles success', async () => {
    axios.post.mockResolvedValue({ status: 200, data: { token: 'fake-token' } });

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }));

    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/api/auth/login', {
      Usuario: 'testuser',
      Contraseña: 'password123'
    }));

    expect(sessionStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
  });

  test('handles login error', async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'Invalid credentials' } } });

    render(<Login />);
    fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }));

    await waitFor(() => expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument());
  });
});
describe('Inicio Component', () => {
    test('renders Header component', () => {
      render(<Inicio />);
      const headerElement = screen.getByRole('banner');
      expect(headerElement).toBeInTheDocument();
    });
  
    test('renders Footer component', () => {
      render(<Inicio />);
      const footerElement = screen.getByRole('contentinfo');
      expect(footerElement).toBeInTheDocument();
    });
  
    test('renders hero section with image', () => {
      render(<Inicio />);
      const heroImage = screen.getByAltText('Paisaje Madre Raíz');
      expect(heroImage).toBeInTheDocument();
    });
  
    test('renders section one with title', () => {
      render(<Inicio />);
      const sectionOneTitle = screen.getByText('VOLVER A LA TIERRA CON LOS PIES Y LOS SENTIDOS EN EL PRESENTE');
      expect(sectionOneTitle).toBeInTheDocument();
    });
  
    test('renders section two with title', () => {
      render(<Inicio />);
      const sectionTwoTitle = screen.getByText('VIVIR A LA TIERRA RECONECTANDO LA VIDA DE TODOS LOS ANIMALES');
      expect(sectionTwoTitle).toBeInTheDocument();
    });
  
    test('renders section three with title', () => {
      render(<Inicio />);
      const sectionThreeTitle = screen.getByText('VOLVER A LA TIERRA CONECTANDO NUESTRA ALMA');
      expect(sectionThreeTitle).toBeInTheDocument();
    });
  });