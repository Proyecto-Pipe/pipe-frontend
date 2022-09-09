import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { PipeContext } from "../../PipeContext";
import { Refresh } from "../PipeData/PipeControls";

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
    camera.position.z = 4;
    camera.position.y = 4.8;
    camera.rotation.x = 251;

    // renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(divRef.current.offsetWidth, divRef.current.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    divRef.current.appendChild(renderer.domElement);

    let animatePlant = () => {};

    async function insertPlantModel() {
      const plantModel = await importPlantModel(url);
      plantModel.scale.set(1.2, 1, 1.2);
      plantModel.position.z = -0.2;
      scene.add(plantModel);

      animatePlant = () => {
        plantModel.rotation.y += 0.01;
      };
    }
    insertPlantModel();

    // Light
    const pointLight = new THREE.AmbientLight(0xffffff, 2);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);

    // Helpers
    // const lightHelper = new THREE.PointLightHelper(pointLight);
    // const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(lightHelper, gridHelper);

    // const controls = new OrbitControls(camera, renderer.domElement);

    // document.addEventListener("mousemove", (e) => {
    //   camera.rotation.x += e.screenX * 0.0001;
    //   camera.rotation.y += e.screenY * 0.0001;
    // });

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

  const { error } = React.useContext(PipeContext);
  console.log(error);
  return (
    <div className="Plant" ref={divRef}>
      {error && (
        <div className="Plant__error">
          {error === 400 && <p>No P.I.P.E. comunnication</p>}
          {error === 500 && <p>Server error</p>}
          {error === 500 && <p>Some sensors are not working properly</p>}

          <Refresh />
        </div>
      )}
    </div>
  );
}

export { Plant };
