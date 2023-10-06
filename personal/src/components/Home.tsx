import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import { Loader } from "./CustomComponent";
import SideBar from "./SideBar";

import "../css/home.css";

interface WelcomeClicked {
    setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

function Welcome({ setClicked }: WelcomeClicked) {
    const stringGen = (len: Number) => {
        let text: string = "";
        const chars: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    
        for (let i = 0; i < len; i++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    
        return text;
    }

    const letters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=[]{};':\",./<>?`~";

    const textLoad = (speed: number = 10, original: string = "Welcome", setText: React.Dispatch<React.SetStateAction<string>>): void => {
        let finalName = "";
        let iterations = 0;
    
        const interval = setInterval(() => {
            let newLetter = letters[Math.floor(Math.random() * letters.length)];
    
            if (iterations % 10 === 0) {
                finalName += original.charAt(iterations / 10)
                setText(finalName);
            } else {
                setText(finalName + newLetter);
            }
    
            if (finalName === original) {
                clearInterval(interval);
            }
    
            iterations++;
        }, speed)
    }

    const nameHover = (value: string, original: string = "Welcome", setText: React.Dispatch<React.SetStateAction<string>>): void => {
        let iterations = 0;
    
        const interval = setInterval(() => {
            let newText = value.split("")
                .map((_, index) => {
                    if (index < iterations || (original[index] === " " && window.innerWidth <= 496)) {
                        return original[index];
                    }
    
                    return letters[Math.floor(Math.random() * letters.length)]
                })
                .join("");
    
            setText(newText);
    
            if (iterations > original.length - 1) {
                clearInterval(interval);
            }
    
            iterations += ((1 + Math.sqrt(5)) / 2) - 1;
        }, 30);
    }

    const wsh = window.screen.height;
    const bg_len =  wsh >= 1500 ? 40000 : (wsh >= 1200 ? 30000 : (wsh >= 1000 ? 20000 : (wsh >= 850 ? 10000 : 7000)));

    const [bg_text, setBGText] = useState<string>(stringGen(bg_len));
    const [center_text, setCText] = useState<string>("");

    useEffect(() => {
        textLoad(10, "Welcome", setCText);
    }, []);

    const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.Touch) => {
        const main : HTMLElement = document.querySelector(".bg-text") as HTMLElement;
        main.style.setProperty("--x", `${e.clientX}px`);
        main.style.setProperty("--y", `${e.clientY}px`);

        setBGText(stringGen(bg_len))
    }

    const handleClick = () => {
        setClicked(true);
    }

    return(
        <div className="welcome-top" onMouseMove={(e) => handleMove(e)} onTouchMove={(e) => handleMove(e.touches[0])}>
            <div className="bg-gradient"/>
            <div className="bg-text">
                <div className="welcome-text">
                    <span 
                        className="welcome-text-inner"
                        onMouseEnter={() => {
                            if (center_text === "Welcome") {
                                textLoad(10, "Click Me!", setCText);
                            }
                            if (center_text === "Click Me!") {
                                nameHover(center_text, "Click Me!", setCText);
                            }
                        }}
                        onClick={handleClick}
                    >
                        {center_text}
                    </span>
                </div>
                {bg_text}
            </div>
        </div>
    )
}

export function Donut() {
    const [ab, setAB] = useState<number[]>([1, 1]);
    const donut = useRef<HTMLPreElement>(null!);
    const song = new Audio(process.env.PUBLIC_URL + "/resources/funky-town-(low-quality)-made-with-Voicemod-technology.mp3");


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

    const handleClick = () => {
        song.play();
    };

    return (
        <div className="container">
            <span className="welcome">Welcome!</span>
            <pre ref={donut} className="center" onClick={handleClick}/>
            <span className="click-me">Click the donut.</span>
        </div>
    );
}

export default function Home() {
    const [chance] = useState(Math.random());
    const [clicked, setClicked] = useState(false);

    return(
        <Suspense 
            fallback={
                <div className="loader-container">
                    <Loader/>
                </div>
            }
        >
            <SideBar blur={true} top={5} left={0} />
            { chance > 0.01 && !clicked ? <Welcome setClicked={setClicked}/> : <Donut/> }
        </Suspense>
    );
}