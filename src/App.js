import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial, OrbitControls } from '@react-three/drei';
import { ChakraProvider, Heading } from '@chakra-ui/react';

import './style.scss';
import torVerShader from './shaders/particles/vertex.glsl';
import torFraShader from './shaders/particles/fragment.glsl';

const Particles = () => {
  const ShaderMaterial = shaderMaterial(
    { uTick: 0 },
    torVerShader,
    torFraShader
  );
  extend({ ShaderMaterial });

  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTick = clock.getElapsedTime()));
  return (
    <points>
      <planeBufferGeometry args={[1, 1, 50, 50]} />
      <shaderMaterial ref={ref} side={THREE.DoubleSide} wireframe />
    </points>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <Heading as="h1">僕はまだ何者にもなれていない</Heading>
      <Canvas camera={{ position: [0, 0, 0] }}>
        <color attach="background" args={[0xeeeeee]} />
        <OrbitControls />
        <Particles />
      </Canvas>
    </ChakraProvider>
  );
};

export default App;
