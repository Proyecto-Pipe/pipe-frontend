import React from "react";

import "./Header.css";

import logoUrl from "../../assets/logo.png";
import "../../assets/BrixtonSansTC-Regular.otf";

import { ViewManager } from "../ViewManager";

function Header() {
  return (
    <header className="Header">
      <div className="Header__content">
        <img
          className="Header__content__logo"
          src={logoUrl}
          alt="Logo de Pipe"
        />
        <p className="Header__content__text"> PIPE</p>
      </div>
      <ViewManager />
    </header>
  );
}

export { Header };
