import { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";

import "../css/about-me.css"

export default function AboutMe() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=[]{};':\",./<>?`~";
    const [name, setName] = useState("");

    useEffect(() => {
        nameLoad();
    }, []);

    const nameLoad = (speed: number = 10, original: string = "ETHAN KRUG") => {
        let finalName = "";
        let iterations = 0;
        
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
                    <span className="intro">
                        Hello, I'm a computer scientist with a passion for building 
                        clean and efficient software solutions. I have a degree 
                        in computer science and a few years of experience in the field, 
                        working on projects mainly relating to web development 
                        and data science.<br/><br/>

                        Currently, I am looking for employment. My expertise includes 
                        proficiency in a variety of programming languages, 
                        database technologies, and development frameworks.<br/><br/>

                        I enjoy working in a challenging environment where I can freely 
                        collaborate with other engineers to solve complex problems 
                        and create software that delivers value to end-users. I am 
                        committed to staying up-to-date with the latest industry trends 
                        and technologies to ensure that the software I develop is always 
                        cutting-edge and meets the highest standards of quality.
                    </span><br/>
                    <span className="me-links">
                        <a href="/resources/Resume.pdf" target="_blank" rel="noreferrer">Resume</a>
                        <a href="https://github.com/GurkNathe/" target="_blank" rel="noreferrer">GitHub</a>
                        <a href="https://www.linkedin.com/in/ethan-krug-5a3088171" target="_blank" rel="noreferrer">LinedIn</a>
                        <a href="mailto:ethan.c.krug@gmail.com" target="_blank" rel="noreferrer">Email</a>
                    </span>
                </div>
            </Paper>
        </div>
    )
}