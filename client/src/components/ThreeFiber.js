import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {artImages} from '../sharedVariables'

const photo = artImages[Math.floor(Math.random()*artImages.length)]
console.log('photo', photo)
const texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/adnjoo/artExplorer/main/assets/mona2.png')
const texture1 = new THREE.TextureLoader().load('https://raw.githubusercontent.com/adnjoo/artExplorer/main/assets/kandinsky.png')


export const ThreeFiber = () => {
  function Box(props) {
    const ref = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.y += 0.005))
    // useFrame((state, delta) => (ref.current.rotation.x += 0.005))
    return (
      <mesh
      {...props}
      ref={ref}
      scale={active ? 6 : 4.5}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
      map={texture}
      attach="material"
       />
      <meshStandardMaterial 
      map={texture1}
      attach="material"
       />
      
    </mesh>
    );
  }
  return (
    <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[0, 0, 0]} />

  </Canvas>
  );
};
