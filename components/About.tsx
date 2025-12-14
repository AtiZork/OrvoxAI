"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".about-text", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="about-text text-3xl md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                    Bridging the gap between AI and Business
                </h2>

                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p className="about-text">
                        OrvoxAI is a forward-thinking AI and data solutions startup with a mission to make advanced technology practical, impactful, and scalable for businesses.
                    </p>
                    <p className="about-text">
                        We empower organizations by unlocking efficiency, reducing costs, and accelerating growth through tailored AI, automation, and full-stack solutions.
                    </p>
                </div>

                <div className="mt-20 border-t border-gray-800 pt-10">
                    <h3 className="about-text text-xl uppercase tracking-widest text-gray-500 mb-8">Trusted by Global Partners</h3>
                    {/* Placeholder for logos - implementing as text grid for now as no images provided */}
                    <div className="about-text grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="text-2xl font-bold">TechCorp</div>
                        <div className="text-2xl font-bold">DataFlow</div>
                        <div className="text-2xl font-bold">InnovateX</div>
                        <div className="text-2xl font-bold">FutureScale</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
