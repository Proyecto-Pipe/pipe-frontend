import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <div className="Footer">
      <a
        href="https://www.instagram.com/pipe_sostenible/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram @pipe_sostenible
      </a>
      <p>
        Zaida Guzmán, David Hurtado, Andrés Joya, Juan Cuervo, profe William
        Granada
      </p>
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
