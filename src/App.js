import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber';
import { shaderMaterial, OrbitControls } from '@react-three/drei';
import { ChakraProvider, Heading } from '@chakra-ui/react';

import './style.scss';
import image1 from './images/tex1.jpg';
import image2 from './images/tex2.jpg';
import p1VerShader from './shaders/plane1/vertex.glsl';
import p1FraShader from './shaders/plane1/fragment.glsl';
import p2VerShader from './shaders/plane2/vertex.glsl';
import p2FraShader from './shaders/plane2/fragment.glsl';

const w = 1.5,
  h = 1.5;

const Plane1 = () => {
  const ShaderMaterial = shaderMaterial(
    { uTick: 0, uTex: new THREE.Texture() },
    p1VerShader,
    p1FraShader
  );
  extend({ ShaderMaterial });

  const ref = useRef();
  useFrame(({ clock }) => (ref.current.uTick = clock.getElapsedTime()));

  const [tex] = useLoader(THREE.TextureLoader, [image1]);

  return (
    <mesh position={[-0.75, 0, 0]}>
      <planeBufferGeometry args={[w, h, 20, 20]} />
      <shaderMaterial ref={ref} side={THREE.DoubleSide} uTex={tex} />
    </mesh>
  );
};

const Plane2 = () => {
  const wSeg = w * 150,
    hSeg = h * 150;
  const geometry = useMemo(() => {
    const pared = new THREE.PlaneGeometry(w, h, wSeg, hSeg);
    const floor = new THREE.PlaneGeometry(w, h, wSeg, hSeg);
    pared.translate(0.75, 0, 0.3);
    floor.rotateX(Math.PI / 2);
    floor.translate(0.75, 0, 0.3);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', pared.getAttribute('position'));
    geometry.setAttribute('flPosition', floor.getAttribute('position'));
    geometry.setAttribute('uv', pared.getAttribute('uv'));
    geometry.setAttribute('flNormal', floor.getAttribute('normal'));

    return geometry;
  }, []);

  const ShaderMaterial = shaderMaterial(
    { uTick: 0, uTex: new THREE.Texture() },
    p2VerShader,
    p2FraShader
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
      <Heading as="h1">僕はまだ何者にもなれていない</Heading>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <color attach="background" args={[0xeeeeee]} />
        <OrbitControls />
        <Plane1 />
        <Plane2 />
      </Canvas>
    </ChakraProvider>
  );
};

export default App;
