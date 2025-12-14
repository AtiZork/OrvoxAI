"use client";

import { useRef, useEffect } from "react";
import anime from "animejs";

interface TextScrambleProps {
    text: string;
    className?: string;
}

export default function TextScramble({ text, className = "" }: TextScrambleProps) {
    const elementRef = useRef<HTMLSpanElement>(null);

    const animate = () => {
        if (!elementRef.current) return;

        // Reset to original text before animating
        elementRef.current.innerHTML = text.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({ loop: false })
            .add({
                targets: elementRef.current.querySelectorAll(".letter"),
                translateY: ["1.1em", 0],
                translateZ: 0,
                duration: 750,
                delay: (el: any, i: number) => 50 * i
            });
    };

    useEffect(() => {
        animate();
        // dependent on 'text'
    }, [text]);

    return (
        <span
            ref={elementRef}
            className={`inline-block overflow-hidden relative ${className}`}
            onMouseEnter={animate}
        >
            {text}
        </span>
    );
}
