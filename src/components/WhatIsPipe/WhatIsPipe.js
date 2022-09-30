import React from "react";

import "./WhatIsPipe.css";

import image1 from "../../assets/whatispipe/pipe.jpg";
import image2 from "../../assets/whatispipe/working.jpg";

function WhatIsPipe() {
  return (
    <div className="WhatIsPipe">
      <div className="box1">
        <img
          className="box1__image"
          src={image1}
          alt="P.I.P.E. Invernadero inteligente"
        />
        <div className="box1__text">
          <p className="box1__text__title">
            Proyecto Invernadero Pedagógico Estudiantil
          </p>
          <p className="box1__text__info">
            Nuestra propuesta para fomentar en colegios a nivel nacional el
            cultivo, encaminado al cuidado del medio ambiente.
          </p>
        </div>
      </div>
      <div className="box2">
        <p className="box2__title">Vea la presentación de nuestro proyecto</p>
        <iframe
          className="box2__video"
          title="Elevator Pitch"
          src="https://drive.google.com/file/d/1l-ndVBoZgVm_VMkF270SU4DZTlN-6F5f/preview"
          allow="autoplay"
        ></iframe>
      </div>
      <div className="box3">
        <p className="box3__text">
          Encuentre la documentación completa de la creación, planos,
          viabilidad, código, montaje, en{" "}
          <a
            href="https://github.com/santigo171/pipe-server"
            target="_blank"
            rel="noopener noreferrer"
          >
            el siguiente repositorio
          </a>{" "}
          para ser implementado en cualquier institución en Colombia.
        </p>
        <img
          src={image2}
          alt="Zaida, Julian and David trabajando en la construcción de P.I.P.E."
          className="box3__image"
        />
      </div>
    </div>
  );
}

export { WhatIsPipe };
