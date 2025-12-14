"use client";

import { useEffect, useState } from "react";

export default function MinimalBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* Deep Radial Gradient Base */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black" />

            {/* Subtle Grid Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px),
                                      linear-gradient(to bottom, #808080 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Ambient Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full mix-blend-screen" />

            {/* Noise Texture for Texture (Optional, keep subtle) */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}
