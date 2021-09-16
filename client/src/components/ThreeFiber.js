import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {artImages} from '../sharedVariables'

const photo = artImages[Math.floor(Math.random()*artImages.length)]
console.log('photo', photo)
const textures = []
const texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/adnjoo/artExplorer/main/assets/mona2.png')
const texture1 = new THREE.TextureLoader().load('https://raw.githubusercontent.com/adnjoo/artExplorer/main/assets/kandinsky.png')
const texture2 = new THREE.TextureLoader().load('https://raw.githubusercontent.com/adnjoo/artExplorer/main/assets/flowers.png')
const t3 = new THREE.TextureLoader().load('https://raw.githubusercontent.com/adnjoo/artExplorer/main/assets/ape1.png')
textures.push(texture,texture1,texture2,t3)
// console.log(textures)

export const ThreeFiber = () => {
  function Box(props) {
    const [count, setCount] = useState(1)
    const [boxtex, setboxtex] = useState(texture)
    const ref = useRef()
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    useFrame((state, delta) => (ref.current.rotation.y += 0.005))
    const myfunction = () =>{
      if(count==textures.length){
        setCount(0)
        setboxtex(textures[count])
        return
      }
      setboxtex(textures[count])
      setCount(count+1)
    }
    return (
      <mesh
      {...props}
      ref={ref}
      scale={active ? 6 : 4.5}
      onClick={
        // (event) => setActive(!active) make bigger
        myfunction
      }
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
      map={boxtex}
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
