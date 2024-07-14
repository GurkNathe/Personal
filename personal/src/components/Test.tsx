import { useEffect, useRef } from "react";

import "../css/test.css"

export default function AboutMe() {
    const ref = useRef<HTMLCanvasElement>(null);
    let animationFrameId: number | null = null;

    useEffect(() => {
        animate();

        return () => {
            // Clean up the animation loop on component unmount
            if (animationFrameId!== null) {
            window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    const animate = () => {
        const canvas = ref.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Example: Draw a line representing part of the flow field
        context.beginPath();
        context.moveTo(50, 50);
        context.lineTo(200, 200);
        context.stroke();
        // Request the next frame
        animationFrameId = window.requestAnimationFrame(animate);
    }

    return (
        <canvas ref={ref}/>
    )
}