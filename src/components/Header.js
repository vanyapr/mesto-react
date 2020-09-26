import React from 'react';
import logoPath from "../images/logo.svg";

const Header = React.memo(() => {
  return (
    <header className="header">
      <a href="/" title="Место" className="logo">
        <img src={logoPath} alt="Место" className="logo__image"/>
      </a>
    </header>
  )
})

export default Header;
