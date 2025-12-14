"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import NeuralBackground from "./NeuralBackground";
import AnimatedCounter from "./AnimatedCounter";
import { ArrowRight, Code2, Users, Rocket } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-title", {
            y: 80,
            opacity: 0,
            duration: 1,
            delay: 0.3,
        });

        tl.from(".hero-subtitle", {
            y: 40,
            opacity: 0,
            duration: 0.8,
        }, "-=0.5");

        tl.from(".hero-description", {
            y: 30,
            opacity: 0,
            duration: 0.8,
        }, "-=0.4");

        tl.from(".hero-stats", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
        }, "-=0.3");

        tl.from(".hero-cta", {
            y: 20,
            opacity: 0,
            duration: 0.6,
        }, "-=0.2");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-20 pb-16 sm:pb-0">
            <NeuralBackground />

            {/* Subtle Gradient Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-6xl">

                {/* Main Headline */}
                <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 sm:mb-6">
                    <span className="block text-white">
                        Building Software
                    </span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                        That Drives Results
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-400 mb-6 sm:mb-8 max-w-3xl mx-auto font-light px-4 sm:px-0">
                    Expert software development, AI integration, and digital transformation for modern businesses.
                </p>

                {/* Description */}
                <p className="hero-description text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-12 sm:mb-16 leading-relaxed px-4 sm:px-0">
                    We specialize in AI-powered solutions, full-stack development, and data engineering —
                    helping organizations build scalable, intelligent systems that solve real problems.
                </p>

                {/* Statistics - Clean and Professional */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 max-w-4xl mx-auto px-4 sm:px-0">
                    <div className="hero-stats bg-zinc-900/20 sm:bg-transparent p-6 sm:p-0 rounded-xl sm:rounded-none">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                            <div className="text-3xl sm:text-4xl font-bold text-white">
                                <AnimatedCounter value={100} suffix="+" />
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm">Projects Delivered</p>
                    </div>

                    <div className="hero-stats bg-zinc-900/20 sm:bg-transparent p-6 sm:p-0 rounded-xl sm:rounded-none">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                            <div className="text-3xl sm:text-4xl font-bold text-white">
                                <AnimatedCounter value={35} suffix="M+" prefix="$" />
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm">Client Funding Raised</p>
                    </div>

                    <div className="hero-stats bg-zinc-900/20 sm:bg-transparent p-6 sm:p-0 rounded-xl sm:rounded-none">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                            <div className="text-3xl sm:text-4xl font-bold text-white">
                                <AnimatedCounter value={9} suffix="+" />
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs sm:text-sm">Years Experience</p>
                    </div>
                </div>

                {/* CTA Buttons - Professional, touch-friendly */}
                <div className="hero-cta flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
                    <Link
                        href="/contact-us"
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 sm:py-4 text-base sm:text-base bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 touch-manipulation"
                    >
                        Get Started
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="/portfolio"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 sm:py-4 text-base sm:text-base bg-transparent text-white font-semibold rounded-lg border-2 border-gray-700 hover:border-gray-500 hover:bg-white/5 transition-all duration-200 touch-manipulation"
                    >
                        View Our Work
                    </Link>
                </div>

            </div>
        </section>
    );
}
