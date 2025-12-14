"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    className?: string;
}

export default function AnimatedCounter({
    value,
    duration = 2,
    suffix = "",
    prefix = "",
    decimals = 0,
    className = ""
}: AnimatedCounterProps) {
    const counterRef = useRef<HTMLSpanElement>(null);
    const [displayValue, setDisplayValue] = useState(0);

    useGSAP(() => {
        if (!counterRef.current) return;

        const counter = { val: 0 };

        const animation = gsap.to(counter, {
            val: value,
            duration: duration,
            ease: "power2.out",
            scrollTrigger: {
                trigger: counterRef.current,
                start: "top 80%",
                once: true,
            },
            onUpdate: () => {
                setDisplayValue(counter.val);
            }
        });

        return () => {
            animation.kill();
        };
    }, [value, duration]);

    const formattedValue = displayValue.toFixed(decimals);

    return (
        <span ref={counterRef} className={className}>
            {prefix}{formattedValue}{suffix}
        </span>
    );
}
