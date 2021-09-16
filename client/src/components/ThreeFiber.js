import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'

export const ThreeFiber = () => {
  function Box(props) {
    const base = useLoader(
      TextureLoader,
      "https://stickershop.line-scdn.net/stickershop/v1/product/1217051/LINEStorePC/main.png"
      // "https://raw.githubusercontent.com/adnjoo/artExplorer/main/assets/mona.jpg"
    );

    // This reference will give us direct access to the THREE.Mesh object
    const ref = useRef();
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.y += 0.005));

    return (
      <mesh {...props} ref={ref} scale={active ? 4.5 : 3}>
        <boxGeometry args={[1, 1, 1]} />
        {
          // base &&
          <meshStandardMaterial
            attach="material"
            // map={base}
          />
        }
      </mesh>
    );
  }

  return (
    <div
      style={{
        width: "400px",
        height: "200px",
        margin: "50px auto 50px auto",
        outline: "1px solid black",
      }}
    >
      <Canvas mode="concurrent">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense>
          <Box position={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
};
