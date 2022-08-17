import React from "react";
import * as THREE from "three";

import "./Plant.css";

function Plant({ url }) {
  const divRef = React.useRef(null);

  React.useEffect(() => {
    console.log(divRef.current.offsetWidth);
    if (divRef.current == null) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      divRef.current.offsetHeight / divRef.current.offsetWidth,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(divRef.current.offsetWidth, divRef.current.offsetHeight);
    divRef.current.appendChild(renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener(
      "resize",
      () => {
        camera.aspect =
          divRef.current.offsetWidth / divRef.current.offsetHeight;

        camera.updateProjectionMatrix();
        renderer.setSize(
          divRef.current.offsetWidth,
          divRef.current.offsetHeight
        );
      },
      false
    );
  }, [divRef]);

  return (
    <div className="Plant" ref={divRef}>
      {/* <img
        className="PipeData__plant__design"
        src="https://st.depositphotos.com/1169502/2025/v/450/depositphotos_20257115-stock-illustration-abstract-eco-green-plant-with.jpg"
        alt="Ilustration of P.I.P.E"
      /> */}
    </div>
  );
}

export { Plant };
