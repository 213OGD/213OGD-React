import React from 'react';
import { render, screen } from '@testing-library/react';
import SideBar from './SideBar';

describe('Sidebar', () => {
  it('renders sidebar & all link are displayed', () => {
    render(<SideBar />);
    expect(screen.getAllByRole('link')).toHaveLength(6);
  });
  it('renders sidebar & have the link with "Ressource" text with href value #', () => {
    render(<SideBar />);
    expect(screen.getByText('Ressources').closest('a')).toHaveAttribute(
      'href',
      '#'
    );
  });
});
// expect(screen.getAllByRole('link')).toHaveTextContent('Ressources');

// expect(screen.getByText('Ressources').closest('a')).toHaveAttribute('href');
// .toHaveClass('active');
