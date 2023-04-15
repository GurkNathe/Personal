import { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";

import "../css/about-me.css"

export default function AboutMe() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=[]{};':\",./<>?`~";
    const [name, setName] = useState("");

    useEffect(() => {
        nameLoad();
    }, []);

    const nameLoad = (speed: number = 10) => {
        let finalName = "";
        let iterations = 0;
        const original = "ETHAN KRUG";
        
        const interval = setInterval(() => {
            let newLetter = letters[Math.floor(Math.random() * letters.length)];

            if (iterations % 10 === 0) {
                finalName += original.charAt(iterations / 10)
                setName(finalName);
            } else {
                setName(finalName + newLetter);
            }

            if (finalName === original) {
                clearInterval(interval);
            }

            iterations++;
        }, speed)
    }

    const nameHover = () => {
        let iterations = 0;
        const original = "ETHAN KRUG"

        const interval = setInterval(() => {
            let newText = name.split("")
                .map((_, index) => {
                    if (index < iterations) {
                        return original[index];
                    }

                    return letters[Math.floor(Math.random() * letters.length)]
                })
                .join("");

            setName(newText);

            if (iterations > original.length - 1) {
                    clearInterval(interval);
            }

            iterations += ((1 + Math.sqrt(5)) / 2) - 1;
        }, 30);
    }

    return (
        <div className="aboutme">
            <Paper className="me-paper">
                <div className="paper-div">
                    <h1 
                        className="name"
                        children={name}
                        onMouseEnter={nameHover}
                    />
                    <span>test</span>
                </div>
            </Paper>
        </div>
    )
}