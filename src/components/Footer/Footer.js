import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <div className="Footer">
      <a
        href="https://www.instagram.com/pipe_can/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram @pipe_can
      </a>
      <p>
        Zaida Guzmán, Julian Franco, David Hurtado, profesor William Granada
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
