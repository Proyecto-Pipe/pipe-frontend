import React from "react";

import "./Header.css";

import logoUrl from "../../assets/logo.png";

function Header() {
  return (
    <header className="Header">
      <img className="Header__logo" src={logoUrl} alt="Logo de Pipe" />
      <p className="Header__text"> P.I.P.E.</p>
    </header>
  );
}

export { Header };
