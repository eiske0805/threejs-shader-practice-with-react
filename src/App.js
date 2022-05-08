import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial, OrbitControls } from '@react-three/drei';
import { ChakraProvider, Heading } from '@chakra-ui/react';

import './style.scss';
import hVerShader from './shaders/hert/vertex.glsl';
import hFraShader from './shaders/hert/fragment.glsl';
import torVerShader from './shaders/torusknot/vertex.glsl';
import torFraShader from './shaders/torusknot/fragment.glsl';
import triVerShader from './shaders/triangle/vertex.glsl';
import triFraShader from './shaders/triangle/fragment.glsl';

const Heart = () => {
  const x = 0,
    y = 0;

  const heartShape = new THREE.Shape();
  heartShape.moveTo(x + 5, y + 5);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  const ShaderMaterial = shaderMaterial({ uTick: 0 }, hVerShader, hFraShader);
  extend({ ShaderMaterial });

const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTick = clock.getElapsedTime()));

  return (
    <mesh
      scale={[0.04, 0.04, 0.04]}
      rotation={[Math.PI, 0, 0]}
      position={[-0.2, 0.35, 0]}
    >
      <shapeBufferGeometry args={[heartShape]} />
      <shaderMaterial ref={ref} side={THREE.DoubleSide}  />
    </mesh>
  );
};

const Torusknot = () => {
  const ShaderMaterial = shaderMaterial(
    { uTick: 0 },
    torVerShader,
    torFraShader
  );
  extend({ ShaderMaterial });
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTick = clock.getElapsedTime()));
  return (
    <mesh position={[-2, 0, 0]}>
      <torusKnotBufferGeometry args={[0.3, 0.02, 60, 16]} />
      <shaderMaterial ref={ref} />
    </mesh>
  );
};

const Triangle = () => {
  const ShaderMaterial = shaderMaterial({uTick: 0 }, triVerShader, triFraShader);
  extend({ ShaderMaterial });
  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTick = clock.getElapsedTime()));
  return (
    <mesh position={[2, 0, 0]}>
      <tetrahedronBufferGeometry args={[0.5, 0]} />
      <shaderMaterial ref={ref} />
    </mesh>
  );
};

const App = () => {
  return (
    <ChakraProvider>
      <Heading as="h1">僕はまだ何者にもなれていない</Heading>
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach="background" args={[0xeeeeee]} />
        <OrbitControls />
        <Heart />
        <Torusknot />
        <Triangle />
      </Canvas>
    </ChakraProvider>
  );
};

export default App;
