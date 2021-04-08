/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function SideBar(): JSX.Element {
  return (
    <div className="fullbarV">
      <nav className="sidebar">
        <a href="#">Dashboard</a>
        <a href="#">Agenda</a>
        <a href="#">Quêtes</a>
        <a href="#">Corrections</a>
        <a href="#">Ma Promo</a>
        <a href="#" className="active">
          Ressources
        </a>
        <a href="#" style={{ color: 'purple', cursor: 'not-allowed' }}>
          Coming Soon !
        </a>
      </nav>
    </div>
  );
}

export default SideBar;
