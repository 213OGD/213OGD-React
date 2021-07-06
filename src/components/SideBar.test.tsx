import React from 'react';
import { render, screen } from '@testing-library/react';
import SideBar from './SideBar';

describe('Sidebar', () => {
  it('renders sidebar & all link are displayed', () => {
    render(<SideBar />);
    expect(screen.getAllByRole('link')).toHaveLength(7);
  });
  it('renders sidebar & have the link with "Ressource" text with href value #', () => {
    render(<SideBar />);
    expect(screen.getByText('Ressources').closest('a')).toHaveAttribute(
      'href',
      '#'
    );
  });
  it('renders sidebar & "Ressource" has class "active"', () => {
    render(<SideBar />);
    expect(screen.getByText('Ressources')).toHaveClass('active');
  });
});
