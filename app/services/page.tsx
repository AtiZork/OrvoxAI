"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Canvas } from "@react-three/fiber";
import Service3DIcon from "@/components/Service3DIcon";
import TextScramble from "@/components/TextScramble";
import { api } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
    const containerRef = useRef(null);
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getServices()
            .then((data) => {
                // Parse items from JSON string to array
                const parsedServices = data.map((service: any) => ({
                    ...service,
                    items: typeof service.items === 'string' 
                        ? JSON.parse(service.items || '[]') 
                        : (service.items || [])
                }));
                setServices(parsedServices);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch services:', error);
                setLoading(false);
            });
    }, []);

    useGSAP(() => {
        if (loading || services.length === 0) return;

        const sections = gsap.utils.toArray(".service-block");

        sections.forEach((section: any, i) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        });
    }, { scope: containerRef, dependencies: [loading, services] });

    return (
        <main ref={containerRef} className="bg-black min-h-screen text-white pt-20">
            <Navbar />

            <section className="py-20 text-center relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none" />
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    <TextScramble text="Our Services" />
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Transforming businesses with next-generation technology.
                </p>
            </section>

            {loading && (
                <div className="text-center py-20">
                    <div className="text-xl text-gray-400">Loading services...</div>
                </div>
            )}

            {!loading && services.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-xl text-gray-400">No services available</div>
                </div>
            )}

            {!loading && services.length > 0 && (
            <div className="container mx-auto px-4 pb-32 flex flex-col gap-32">
                {services.map((service, i) => (
                    <div
                        key={i}
                        className={`service-block flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
                    >
                        {/* 3D Visual Side */}
                        <div className="w-full md:w-1/2 aspect-square md:aspect-video relative bg-zinc-900/30 rounded-3xl border border-zinc-800 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
                            <Canvas camera={{ position: [0, 0, 4] }}>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
                                <Service3DIcon index={i} />
                            </Canvas>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white group cursor-default">
                                <TextScramble text={service.title} className="hover:text-cyan-400 transition-colors" />
                            </h2>

                            <ul className="space-y-4">
                                {service.items && service.items.map((item: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-4 text-gray-300 text-lg">
                                        <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-400'} shadow-[0_0_10px_currentColor]`} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            )}

            <Footer />
        </main>
    );
}
