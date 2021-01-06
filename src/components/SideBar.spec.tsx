import React from 'react';
import { render, screen } from '@testing-library/react';
import SideBar from './SideBar';

describe('Sidebar', () => {
  it('renders sidebar & display text', () => {
    render(<SideBar />);
    expect(screen.getByText('Ressources')).toHaveClass('active');
  });
});
