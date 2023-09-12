import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text3D } from "@react-three/drei";
import { BackSide, Mesh, TextureLoader } from "three";

import { Loader } from "./CustomComponent";

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
    ];

    const bg = useLoader(TextureLoader, bg_array[Math.floor(Math.random() * bg_array.length)]);

    const sphere_mesh = useRef<Mesh>(null!);

    let size: number = -8.3 * Math.pow(Math.log((window.innerWidth / 100) - 2), -1);

    useFrame(({ clock }) => {
        sphere_mesh.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.05;
        sphere_mesh.current.rotation.y = clock.getElapsedTime() * 0.05;
    });

    return(
        <>
            <ambientLight intensity={1} />
            <mesh ref={sphere_mesh}>
                <sphereGeometry args={[32, 32, 32]}/>
                <meshStandardMaterial map={bg} side={BackSide}/>
                <mesh position={[-3, -0.5, size]}>
                    <Text3D font={"resources/Inter_Regular.json"}>
                        Welcome!
                        <meshStandardMaterial color="#181818"/>
                        <directionalLight position={[0,1,1]}/>
                    </Text3D>
                </mesh>
            </mesh>
        </>
    );
}

export function Donut() {
    const [ab, setAB] = useState<number[]>([1, 1]);
    const donut = useRef<HTMLPreElement>(null!);

    const asciiframe = useCallback(async (): Promise<void> => {
        let nums : number[] = ab
        nums[0] += 0.07;
        nums[1] += 0.03;

        let b : string[] = [];
        let z = [];

        const cA : number = Math.cos(nums[0]);
        const sA : number = Math.sin(nums[0]);
        const cB : number = Math.cos(nums[1]);
        const sB : number = Math.sin(nums[1]);

        for (let k = 0; k < 1760; k++) {
            b[k] = k % 80 === 79 ? "\n" : " ";
            z[k] = 0;
        }

        for (let j = 0; j < 6.28; j += 0.07) {
            const ct : number = Math.cos(j);
            const st : number = Math.sin(j);
            for (let i = 0; i < 6.28; i += 0.02) {
                const sp : number = Math.sin(i);
                const cp : number = Math.cos(i);
                const h : number = ct + 2; 
                const t : number = sp * h * cA - st * sA; 

                const D : number = 1 / (sp * h * sA + st * cA + 5); 
                const x : number = 0 | (40 + 30 * D * (cp * h * cB - t * sB));
                const y : number = 0 | (12 + 15 * D * (cp * h * sB + t * cB));
                const o : number = x + 80 * y;
                const N : number = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
                if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
                    z[o] = D;
                    b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
                }
            }
        }

        if (donut !== null && donut.current !== null && donut.current.innerHTML !== null) donut.current.innerHTML = b.join("")
        setAB(nums)
    }, [ab]);

    useEffect(() => {
        if (donut) setInterval(asciiframe, 100);
    }, [asciiframe, donut]);

    return (
        <div className="container">
            <span className="welcome">Welcome!</span>
            <pre ref={donut} className="center">test</pre>
        </div>
    )
}

export default function Home() {
    return(
        <Suspense 
            fallback={
                <div className="loader-container">
                    <Loader/>
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