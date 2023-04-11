import { Suspense, useRef } from "react";

import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text3D } from "@react-three/drei";
import { Mesh, TextureLoader } from "three";

import "../css/home.css";

const Background = () => {
    const bg_array: string[] = [
        "/resources/snowy-mountain.jpg",
        "/resources/plum-blossom-path.jpg",
        "/resources/plum-blossom-temple.jpg",
        "/resources/mountain-river.jpg",
        "/resources/desert-ruins.jpg",
        "/resources/magic-jungle.jpg",
        "/resources/cyberpunk.jpg",
        "/resources/temple-peak.jpg",
        "/resources/future-city.jpg",
        "/resources/fjords.jpg",
        "/resources/mesa.jpg",
        "/resources/cliffside.jpg",
        "/resources/fantasy-islands.jpg",
        "/resources/shrub-river.jpg",
        "/resources/plateau-river.jpg",
    ]

    const bg = useLoader(TextureLoader, bg_array[Math.floor(Math.random() * bg_array.length)]);

    const sphere_mesh = useRef<Mesh>(null!)

    useFrame(({ clock }) => {
        sphere_mesh.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.05;
        sphere_mesh.current.rotation.y = clock.getElapsedTime() * 0.1;
    })
    // TODO: Change size of text based off of screen width
    return(
        <>
            <ambientLight intensity={1} />
            <mesh ref={sphere_mesh}>
                <sphereGeometry args={[10, 32, 32]}/>
                <meshStandardMaterial map={bg} side={THREE.BackSide}/>
                <mesh position={[-3, -0.5, -5]}>
                    <Text3D font={"/resources/Inter_Regular.json"}>
                        Ethan Krug
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
        <Canvas
            camera={{ fov: 70, near: 0.01, far: 100, position: [0, 0, 1] }}
        >
            <OrbitControls enableZoom={false} rotateSpeed={0.3}/>
            <Suspense fallback={null}>
                <Background/>
            </Suspense>
        </Canvas>
    );
}