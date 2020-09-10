import React from 'react';
import logoPath from "../images/logo.svg";

function Header () {
  return (
    <header className="header">
      <a href="/" title="Место" className="logo">
        <img src={logoPath} alt="Место" className="logo__image"/>
      </a>
    </header>
  )
}

export default Header;
