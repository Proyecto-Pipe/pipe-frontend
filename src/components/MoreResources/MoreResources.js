import React from "react";

import "./MoreResources.css";

const resources = [
  {
    title:
      "Objetivo 13: Adoptar medidas urgentes para combatir el cambio climático y sus efectos",
    description:
      "El cambio climático está afectando a todos los países de todos los continentes. Está alterando las economías nacionales y afectando a distintas vidas. Los sistemas meteorológicos están cambiando, los niveles del mar están subiendo y los fenómenos meteorológicos son cada vez más extremos.",
    link: "https://www.un.org/sustainabledevelopment/es/climate-change-2/",
    img: "https://agenda2030lac.org/sites/default/files/styles/256x256/public/2019-07/S_INVERTED%20SDG%20goals_icons-individual-RGB-13.png?itok=eicESN0O",
    imgAlt: "Logo del ods #13",
  },
];

function MoreResources() {
  return (
    <div className="MoreResources">
      <p className="MoreResources__description">
        Aquí podrás encontrar más recursos para aprender y seguir luchando para
        alcanzar el Objetivo de Desarrollo Sostenible # 13.
      </p>
      {resources.map(({ title, description, link, img, imgAlt }) => (
        <div>
          <a
            className="MoreResources__resource"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="MoreResources__resource__img"
              src={img}
              alt={imgAlt}
            />
            <div>
              <h3 className="MoreResources__resource__title">{title}</h3>
              <p className="MoreResources__resource__description">
                {description}
              </p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export { MoreResources };
