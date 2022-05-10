import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber';
import { shaderMaterial, OrbitControls } from '@react-three/drei';
import { ChakraProvider, Heading } from '@chakra-ui/react';

import './style.scss';
import image from './images/tex1.jpg';
import verShader from './shaders/vertex.glsl';
import fraShader from './shaders/fragment.glsl';

const Plane = () => {
  const ShaderMaterial = shaderMaterial(
    { uTick: 0, uTex: new THREE.Texture() },
    verShader,
    fraShader
  );
  extend({ ShaderMaterial });

  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTick = clock.getElapsedTime()));

  const [tex] = useLoader(THREE.TextureLoader, [image]);

  return (
    <mesh>
      <planeBufferGeometry args={[3, 3, 20, 20]} />
      <shaderMaterial ref={ref} side={THREE.DoubleSide} uTex={tex} />
    </mesh>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <Heading as="h1">僕はまだ何者にもなれていない</Heading>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <color attach="background" args={[0xeeeeee]} />
        <OrbitControls />
        <Plane />
      </Canvas>
    </ChakraProvider>
  );
};

export default App;
