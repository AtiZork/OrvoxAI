"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Users, Trophy, TrendingUp, Search, PenTool, Code2, Rocket } from "lucide-react";
import CircuitBackground from "@/components/CircuitBackground";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: "Satisfied Clients", value: "100+", icon: <Users className="w-8 h-8 text-cyan-400" /> },
    { label: "Funding Secured", value: "$35M+", icon: <TrendingUp className="w-8 h-8 text-purple-400" /> },
    { label: "Years Experience", value: "9+", icon: <Trophy className="w-8 h-8 text-cyan-400" /> },
];

const process = [
    {
        title: "Discovery & Strategy",
        description: "We listen to your story. We dive deep into your vision, requirements, and market analysis to roadmap the perfect solution tailored to your human needs.",
        step: "01",
        icon: Search
    },
    {
        title: "Architecture & Design",
        description: "Designing for people. We craft scalable architectures and intuitive interfaces that delight users and feel natural to interact with.",
        step: "02",
        icon: PenTool
    },
    {
        title: "Development & AI",
        description: "Technology serving you. We build robust applications integrated with intelligent AI that works quietly in the background to empower your team.",
        step: "03",
        icon: Code2
    },
    {
        title: "Launch & Scale",
        description: "Growing together. We ensure a seamless launch and stand by your side with continuous optimization as your business reaches new heights.",
        step: "04",
        icon: Rocket
    }
];

export default function AboutUsPage() {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".stat-card", {
            scrollTrigger: {
                trigger: ".stats-grid",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });

        // Process Cards Animation - Use batch for better reliability
        const processCards = gsap.utils.toArray(".process-card") as HTMLElement[];
        gsap.set(processCards, { opacity: 0, y: 30 });

        ScrollTrigger.batch(processCards, {
            onEnter: (batch) => {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    overwrite: true
                });
            },
            start: "top 90%", // Trigger earlier
            once: true // Ensure it plays at least once and stays
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="bg-black min-h-screen text-white pt-20 relative">
            <CircuitBackground />
            <Navbar />

            {/* Hero Section */}
            <section className="py-20 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">Visionary Innovators</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        We are a team of visionary designers, developers, and strategists crafting intelligent digital experiences.
                        Our mission is to blend creativity with technology to help brands thrive in the evolving digital world.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-zinc-950 border-y border-zinc-900 stats-grid">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="stat-card p-8 bg-zinc-900/50 rounded-2xl flex flex-col items-center text-center border border-zinc-800 hover:border-cyan-500/30 transition-colors">
                                <div className="mb-4 bg-zinc-800 p-4 rounded-full">{stat.icon}</div>
                                <h3 className="text-4xl md:text-5xl font-bold mb-2 text-white">{stat.value}</h3>
                                <p className="text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            {/* Process Section */}
            <section className="py-20 process-grid">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-16 text-center">Our Process</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {process.map((step, i) => (
                            <div key={i} className="process-card p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:bg-zinc-900/80 hover:border-cyan-500/50 transition-all duration-300 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-[100px] -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-700" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-zinc-800/50 rounded-2xl border border-zinc-700 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/20 transition-all duration-300">
                                            <step.icon className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <span className="text-4xl font-bold color-white  group-hover:text-cyan-500/50 transition-colors select-none">
                                            {step.step}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">{step.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
