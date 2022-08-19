import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
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
      console.log(plantModel);

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
