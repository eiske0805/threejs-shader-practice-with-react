import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';

import './style.scss';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

function App() {
  const ref = useRef();

  useEffect(() => {
    // scene
    let scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xeeeeee));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    ref.current.appendChild(renderer.domElement);

    // geometry
    const geometry = new THREE.PlaneGeometry(2, 2);

    // material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
    });

    // mesh
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // spotlight
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-30, 60, 60);
    spotLight.intensity = 0.6;
    scene.add(spotLight);

    // animation
    function animate() {
      window.requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    new OrbitControls(camera, renderer.domElement);

    function onWindowResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.cancelAnimationFrame(animate);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <ChakraProvider>
      <Heading as="h1">僕はまだ何者にもなれていない</Heading>
      <Box ref={ref} bgSize="cover" bgPosition="center"></Box>
    </ChakraProvider>
  );
}

export default App;
