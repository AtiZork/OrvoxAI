"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Structure of Malnufication",
        category: "Interface & Website",
        description: "Accelerate innovation with world-class tech teams.",
        image: "/portfolio-interface.png"
    },
    {
        title: "Blockchain Technology",
        category: "Web3 Development",
        description: "Secure and scalable blockchain infrastructure solutions.",
        image: "/portfolio-blockchain.png"
    },
    {
        title: "Multifunctional Tech",
        category: "Digital Experience",
        description: "Creating collaborative and innovative digital experiences.",
        image: "/portfolio-tech.png"
    }
];

export default function Portfolio() {
    const containerRef = useRef(null);
    const horizontalRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(".project-card");

        cards.forEach((card: any, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                x: index % 2 === 0 ? -50 : 50, // Alternate left/right slide
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-[#050511] relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-4">Selected Works</h2>
                        <p className="text-gray-400">Showcasing creativity and innovation.</p>
                    </div>
                    <Link href="/portfolio" className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-white transition-colors">
                        See all projects <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`project-card group relative aspect-[4/3] bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 ${index === 2 ? "md:col-span-2 md:aspect-[21/9]" : ""}`}
                        >
                            {/* Placeholder Gradient/Image */}
                            <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050511] via-[#050511]/40 to-transparent" />
                            </div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent">
                                <span className="text-cyan-400 text-sm font-medium tracking-wider mb-2">{project.category}</span>
                                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-gray-300 max-w-xl">{project.description}</p>

                                <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/portfolio" className="inline-flex items-center gap-2 text-cyan-400 font-medium">
                        See all projects <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
