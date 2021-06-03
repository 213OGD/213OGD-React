/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

function SideBar(): JSX.Element {
  return (
    <div className="flex flex-no-wrap">
      <nav className="absolute border-r border-gray-100 h-full bg-gray-100 z-20 p-4">
        <div className="flex w-full">
          <div className="w-1/4 flex justify-center flex-col ">
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
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
