import React from 'react';
import { MdDoorSliding } from 'react-icons/md';

function Header() {
  return (
    <div className="header-container">
      <div className="header-icon-container">
        <MdDoorSliding className="header-icon" />
        <h1 className="header-icon-text">Door</h1>
      </div>
    </div>
  );
}

export default Header;
