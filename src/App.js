import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber';
import { shaderMaterial, OrbitControls } from '@react-three/drei';
import { ChakraProvider, Heading } from '@chakra-ui/react';

import './style.scss';
import image2 from './images/tex2.jpg';
import verShader from './shaders/vertex.glsl';
import fraShader from './shaders/fragment.glsl';

const Plane = () => {
  const w = 2,
    h = 2;
  const wSeg = w * 200,
    hSeg = h * 200;
  const geometry = useMemo(() => {
    const pared = new THREE.PlaneGeometry(w, h, wSeg, hSeg);
    const floor = new THREE.PlaneGeometry(w, h, wSeg, hSeg);
    floor.rotateX(Math.PI / 2);
    floor.translate(0, -1, -5);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', pared.getAttribute('position'));
    geometry.setAttribute('flPosition', floor.getAttribute('position'));
    geometry.setAttribute('uv', pared.getAttribute('uv'));
    geometry.setAttribute('normal', floor.getAttribute('normal'));

    return geometry;
  }, []);

  const ShaderMaterial = shaderMaterial(
    { uTick: 0, uTex: new THREE.Texture() },
    verShader,
    fraShader
  );
  extend({ ShaderMaterial });

  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTick = clock.getElapsedTime()));

  const [tex] = useLoader(THREE.TextureLoader, [image2]);

  return (
    <points>
      <primitive attach="geometry" object={geometry} />
      <shaderMaterial attach="material" ref={ref} uTex={tex} />
    </points>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <Heading as="h1">僕等はまだ何者にもなれていない</Heading>
      <Canvas camera={{ position: [1, 1, 3] }}>
        <color attach="background" args={[0xeeeeee]} />
        <OrbitControls />
        <Plane />
      </Canvas>
    </ChakraProvider>
  );
};

export default App;
