import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial, OrbitControls } from '@react-three/drei';
import { ChakraProvider, Heading } from '@chakra-ui/react';

import './style.scss';
import parVerShader from './shaders/particles/vertex.glsl';
import parFraShader from './shaders/particles/fragment.glsl';

const Particles = () => {
  const count = 300;

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < count * 3; i++) {
      vertices[i] = (Math.random() - 0.5) * 2;
    }
    console.log(vertices);

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    return geometry;
  }, [count]);

  const ShaderMaterial = shaderMaterial(
    { uTick: 0 },
    parVerShader,
    parFraShader
  );
  extend({ ShaderMaterial });

  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTick = clock.getElapsedTime()));

  return (
    <points>
      <primitive attach="geometry" object={geometry} />
      <shaderMaterial attach="material" ref={ref} />
    </points>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <Heading as="h1">僕はまだ何者にもなれていない</Heading>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <color attach="background" args={[0xeeeeee]} />
        <OrbitControls />
        <Particles />
      </Canvas>
    </ChakraProvider>
  );
};

export default App;
