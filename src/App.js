import React from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

import { ChakraProvider, Heading } from '@chakra-ui/react';

import './style.scss';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

function App() {
  const PlaneShaderMaterial = shaderMaterial({}, vertexShader, fragmentShader);
  extend({ PlaneShaderMaterial });

  return (
    <ChakraProvider>
      <Heading as="h1">僕はまだ何者にもなれていない</Heading>
      <Canvas>
        <color attach="background" args={[0xeeeeee]} />
        <mesh>
          <planeBufferGeometry args={[2, 2, 16, 16]} />
          <planeShaderMaterial wireframe />
        </mesh>
      </Canvas>
    </ChakraProvider>
  );
}

export default App;
