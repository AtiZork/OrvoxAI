"use client";

import { useRef, useState, MouseEvent } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface MagneticButtonProps {
    href?: string;
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    onClick?: () => void;
    className?: string;
}

export default function MagneticButton({
    href,
    children,
    variant = "primary",
    onClick,
    className = ""
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Magnetic effect - move button towards cursor
        gsap.to(buttonRef.current, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (!buttonRef.current) return;

        gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
        });
    };

    const baseClasses = `
        group relative inline-flex items-center justify-center gap-2 px-8 py-4 
        font-semibold rounded-full overflow-hidden transition-all duration-300
        ${className}
    `;

    const variantClasses = variant === "primary"
        ? "bg-white text-black hover:bg-gray-100"
        : "bg-transparent text-white border-2 border-white hover:bg-white hover:text-black";

    const glowClasses = isHovered
        ? "shadow-[0_0_30px_rgba(0,240,255,0.5)]"
        : "";

    const content = (
        <>
            <span className="relative z-10">{children}</span>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </>
    );

    if (href) {
        return (
            <Link
                ref={buttonRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                className={`${baseClasses} ${variantClasses} ${glowClasses}`}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            className={`${baseClasses} ${variantClasses} ${glowClasses}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {content}
        </button>
    );
}
