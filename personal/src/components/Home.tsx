import { Suspense, useRef } from "react";

import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text3D } from "@react-three/drei";
import { Mesh, TextureLoader } from "three";

import { CustomProgress } from "./CustomComponent";

import "../css/home.css";

const Background = () => {
    const bg_array: string[] = [
        "resources/snowy-mountain-c.jpg",
        "resources/plum-blossom-path-c.jpg",
        "resources/plum-blossom-temple-c.jpg",
        "resources/mountain-river-c.jpg",
        "resources/desert-ruins-c.jpg",
        "resources/magic-jungle-c.jpg",
        "resources/cyberpunk-c.jpg",
        "resources/temple-peak-c.jpg",
        "resources/future-city-c.jpg",
        "resources/fjords-c.jpg",
        "resources/mesa-c.jpg",
        "resources/cliffside-c.jpg",
        "resources/fantasy-islands-c.jpg",
        "resources/shrub-river-c.jpg",
        "resources/plateau-river-c.jpg",
    ]

    const bg = useLoader(TextureLoader, bg_array[Math.floor(Math.random() * bg_array.length)]);

    const sphere_mesh = useRef<Mesh>(null!)

    useFrame(({ clock }) => {
        sphere_mesh.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.05;
        sphere_mesh.current.rotation.y = clock.getElapsedTime() * 0.1;
    })

    let size = -8.3 * Math.pow(Math.log((window.innerWidth / 100) - 2), -1);

    return(
        <>
            <ambientLight intensity={1} />
            <mesh ref={sphere_mesh}>
                <sphereGeometry args={[32, 32, 32]}/>
                <meshStandardMaterial map={bg} side={THREE.BackSide}/>
                <mesh position={[-3, -0.5, size]}>
                    <Text3D font={"resources/Inter_Regular.json"}>
                        Welcome!
                        <meshStandardMaterial color="#181818"/>
                        <directionalLight position={[0,1,1]}/>
                    </Text3D>
                </mesh>
            </mesh>
        </>
    )
}

export default function Home() {
    return(
        <Suspense 
            fallback={
                <div className="loader-container">
                    <CustomProgress/>
                </div>
            }
        >
            <Canvas
                camera={{ fov: 70, near: 0.01, far: 100, position: [0, 0, 1] }}
            >
                <OrbitControls enableZoom={false} rotateSpeed={0.3}/>
                    <Background/>
            </Canvas>
        </Suspense>
    );
}