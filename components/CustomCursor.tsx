"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if device is touch-enabled to disable cursor
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(pointer: coarse)").matches);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        const cursor = document.getElementById("custom-cursor");
        const follower = document.getElementById("cursor-follower");

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
            });
        };

        const onHoverLinks = () => {
            gsap.to(cursor, { scale: 0.5 });
            gsap.to(follower, { scale: 2, backgroundColor: "rgba(6,182,212,0.2)" });
        }

        const onLeaveLinks = () => {
            gsap.to(cursor, { scale: 1 });
            gsap.to(follower, { scale: 1, backgroundColor: "transparent" });
        }

        window.addEventListener("mousemove", moveCursor);

        // Add event listeners to interactive elements
        const interactiveElements = document.querySelectorAll("a, button");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", onHoverLinks);
            el.addEventListener("mouseleave", onLeaveLinks);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", onHoverLinks);
                el.removeEventListener("mouseleave", onLeaveLinks);
            });
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <>
            <div
                id="custom-cursor"
                className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
            />
            <div
                id="cursor-follower"
                className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
            />
        </>
    );
}
