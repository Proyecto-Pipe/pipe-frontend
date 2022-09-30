import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <div className="Footer">
      <a
        href="https://www.instagram.com/proyecto_p.i.p.e/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram @proyecto_p.i.p.e
      </a>
      <p>Zaida Guzmán, Julian Franco, David Hurtado</p>
      <a
        href="https://agustinianonorte.edu.co/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Colegio Agustiniano Norte
      </a>

      <div className="Footer__moreAbout">Icons by Flaticon and Freepik</div>
    </div>
  );
}

export { Footer };
