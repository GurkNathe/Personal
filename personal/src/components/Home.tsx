import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import { Suspense } from "react";

import "../css/home.css";

const Background = () => {
    const bg_array: string[] = [
        "/resources/snowy-mountain.jpg",
        "/resources/plum-blossom-path.jpg",
        "/resources/plum-blossom-temple.jpg",
    ]

    const bg = useLoader(TextureLoader, bg_array[Math.floor(Math.random() * bg_array.length)]);
    return(
        <>
            <ambientLight intensity={0.2} />
            <directionalLight />
            <mesh>
                <sphereGeometry args={[5, 32, 32]}/>
                <meshStandardMaterial map={bg} side={THREE.BackSide}/>
            </mesh>
        </>
    )
}

export default function Home() {
    return(
        <Canvas
            camera={{ fov: 70, near: 0.01, far: 100, position: [0, 0, 1] }}
        >
            <OrbitControls enableZoom={false}/>
            <Suspense fallback={null}>
                <Background/>
            </Suspense>
        </Canvas>
    );
}