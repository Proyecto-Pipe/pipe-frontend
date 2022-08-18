import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import "./Plant.css";

function addPlantModel(url) {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        resolve(gltf.scene);
      },
      undefined,
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

    // Basic items
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      divRef.current.offsetHeight / divRef.current.offsetWidth,
      0.1,
      1000
    );
    camera.position.setZ(30);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(divRef.current.offsetWidth, divRef.current.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    divRef.current.appendChild(renderer.domElement);

    // Model
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    async function insertPlantModel() {
      const plantModel = await addPlantModel(url);
      scene.add(plantModel.scene);
    }
    insertPlantModel();

    // Light
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 50, 5);
    scene.add(pointLight);

    // Helpers
    const lightHelper = new THREE.PointLightHelper(pointLight);
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(lightHelper, gridHelper);

    const controls = new OrbitControls(camera, renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      renderer.render(scene, camera);
      controls.update();
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
