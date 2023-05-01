import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PipeContext } from "../../PipeContext";
import { Refresh } from "../Refresh";

import "./Plant.css";

function importPlantModel(url) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        resolve(gltf.scene);
      },
      function (xhr) {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        reject(error);
      }
    );
  });
}

function Plant({ url }) {
  const divRef = React.useRef(null);

  React.useEffect(() => {
    if (divRef.current == null) return;

    // Resize function
    function resizeCanvas() {
      camera.aspect = divRef.current.offsetWidth / divRef.current.offsetHeight;

      camera.updateProjectionMatrix();
      renderer.setSize(divRef.current.offsetWidth, divRef.current.offsetHeight);
    }

    // scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      divRef.current.offsetHeight / divRef.current.offsetWidth,
      0.1,
      1000
    );
    camera.position.z = 13;
    camera.position.y = 6.8;
    // camera.rotation.x = 251;
    camera.rotation.x = 250.9;

    // renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(divRef.current.offsetWidth, divRef.current.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    divRef.current.appendChild(renderer.domElement);

    let animatePlant = () => {};

    async function insertPlantModel() {
      const plantModel = await importPlantModel(url);
      plantModel.scale.set(1.2, 1, 1.2);
      scene.add(plantModel);

      animatePlant = () => {
        plantModel.rotation.y += 0.003;
      };
    }
    insertPlantModel();

    // Light
    const pointLight = new THREE.AmbientLight(0xffffff, 1.2);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);

    // Helpers
    // const lightHelper = new THREE.PointLightHelper(pointLight);
    // const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(lightHelper, gridHelper);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      animatePlant();
    }
    animate();
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divRef]);

  const { error, lastPipeConnection } = React.useContext(PipeContext);

  const lastPipeConnectionDate = lastPipeConnection
    ? new Date(lastPipeConnection)
    : null;

  const lpcd = lastPipeConnectionDate;
  const formattedLastPipeConnection = lpcd
    ? `Última conexión: ${lpcd
        .toString()
        .replace("GMT-0500", "")
        .replace(" Standard Time)", "")
        .replace("(", "")} `
    : "No se pudo obtener última conexión con P.I.P.E.";

  return (
    <div className="Plant" ref={divRef}>
      {error && (
        <div className="Plant__error">
          {error === 400 && <p>No hay comunicación con PIPE en tiempo real</p>}
          {error === 500 && (
            <p>Error del servidor, porfavor, recargar página</p>
          )}
          {error === 502 && (
            <p>Algunos sensores no están funcionando adecuadamente</p>
          )}
          <Refresh />
        </div>
      )}
      {lastPipeConnection && (
        <p className="Plant__lastPipeConnection">
          {formattedLastPipeConnection}
        </p>
      )}
      {!error && <Refresh />}
    </div>
  );
}

export { Plant };
