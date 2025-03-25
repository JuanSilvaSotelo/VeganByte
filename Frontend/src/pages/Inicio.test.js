import React from 'react';
import { render, screen } from '@testing-library/react';
import Inicio from './Inicio';

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