"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";

export default function KeyProjectsPage() {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".project-block", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
            delay: 0.2
        });
    }, { scope: containerRef });

    const customProjects = [
        { title: "Structure of Malnufication", category: "App Development", desc: "Accelerating innovation with world-class tech teams." },
        { title: "Blockchain Infrastructure", category: "Web3", desc: "Secure and scalable decentralized solutions." },
        { title: "Multifunctional Tech", category: "Optimization", desc: "Enhancing user interactions with cutting-edge tech." },
        { title: "Fintech Core", category: "SaaS", desc: "Banking solutions for the next generation." },
    ];

    return (
        <main ref={containerRef} className="bg-black min-h-screen text-white pt-20">
            <Navbar />

            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <h1 className="text-5xl md:text-8xl font-bold mb-16 tracking-tighter">
                        Key <span className="text-cyan-400">Projects</span>
                    </h1>

                    <div className="grid grid-cols-1 gap-12">
                        {customProjects.map((project, i) => (
                            <div key={i} className="project-block group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full bg-gradient-to-t from-black to-transparent">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="text-cyan-400 font-bold tracking-widest uppercase mb-2 block">{project.category}</span>
                                            <h2 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h2>
                                            <p className="text-gray-300 max-w-xl text-lg">{project.desc}</p>
                                        </div>
                                        <button className="hidden md:flex w-16 h-16 bg-white rounded-full items-center justify-center text-black group-hover:bg-cyan-400 transition-colors">
                                            <ArrowUpRight className="w-6 h-6" />
                                        </button>
                                    </div>
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
