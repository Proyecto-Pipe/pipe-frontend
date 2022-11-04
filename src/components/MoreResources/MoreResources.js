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
  {
    title: "18 MEJORES VERDURAS PARA CULTIVAR EN UN INVERNADERO.",
    description:
      "Las mejores verduras para cultivar en un invernadero se componen de cultivos de estación fría y de estación cálida. Estas verduras incluyen brócoli, coliflor, repollo, col rizada, lechuga, cebolla, guisantes, papas, rábano, espinaca, albahaca, frijoles, pepino, maíz, berenjena, quimbombó, pimiento y tomate.",
    link: "https://krosagro.com/es/tuneles-de-plastico/18-mejores-verduras-para-cultivar-en-un-invernadero/",
    img: "https://i.ibb.co/3dxZ4gN/Whats-App-Image-2022-11-04-at-9-18-49-AM.jpg",
    imgAlt: "Un invernadero",
  },
  {
    title: "El calentamiento global incrementa por la actividad humana.",
    description:
      "El clima no es algo estático, de hecho, de manera natural ha ido variando a lo largo del planeta. Estos cambios se relacionan con los gases de efecto invernadero y con el calentamiento global.",
    link: "https://www.manosunidas.org/observatorio/cambio-climatico/calentamiento-global",
    img: "https://i.ibb.co/jfxXwvR/Whats-App-Image-2022-11-04-at-9-36-39-AM.jpg",
    imgAlt: "Polos derretidos",
  },
  {
    title:
      "La importancia de la seguridad alimentaria: ¿qué factores la ponen en peligro?",
    description:
      "La disponibilidad de los alimentos, el acceso de las personas a ellos y un consumo nutricionalmente adecuado son los tres pilares sobre los que se asienta el concepto de seguridad alimentaria.         El acceso a una alimentación segura y nutritiva es uno de los Objetivos de Desarrollo Sostenible (ODS).",
    link: "https://www.iberdrola.com/compromiso-social/que-es-seguridad-alimentaria",
    img: "https://i.ibb.co/3hW3Nj0/Whats-App-Image-2022-11-04-at-9-44-41-AM.jpg",
    imgAlt: "Una científica investigando unos cultivos",
  },
  {
    title:
      "Seis recomendaciones para reducir nuestra huella de carbono en casa.",
    description:
      "Todos los días, a través de nuestras acciones y hábitos cotidianos, generamos una huella de carbono. Esta huella representa la cantidad de gases de efecto invernadero que se vierten a la atmósfera como consecuencia de nuestras actividades o quehaceres, dentro y fuera del hogar.",
    link: "https://engie-energia.pe/historias/seis-recomendaciones-para-reducir-nuestra-huella-de-carbono-en-casa",
    img: "https://i.ibb.co/vX71w80/Whats-App-Image-2022-11-04-at-9-56-29-AM.jpg",
    imgAlt: "Plantas siendo cultivadas",
  },
];

// {
//   title: "",
//   description: "",
//   link: "",
//   img: "",
//   imgAlt: "",
// },

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
