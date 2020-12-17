/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function SideBar() {
  return (
    <nav className="sidebar">
      <a href="#">Dashboard</a>
      <a href="#">Agenda</a>
      <a href="#">Quêtes</a>
      <a href="#">Corrections</a>
      <a href="#">Ma Promo</a>
      <a href="#" className="active">
        Ressources
      </a>
    </nav>
  );
}

export default SideBar;
