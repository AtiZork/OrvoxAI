"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Quote } from "lucide-react";

export default function TestimonialsPage() {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".testimonial-card", {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });
    }, { scope: containerRef });

    const testimonials = [
        { text: "Working with Dev Agency has been absolute game-changer for our company. From the moment we engaged with.", author: "Client Feedback" },
        { text: "Working with Dev Agency has been absolute game-changer for our company. From the moment we engaged with.", author: "Client Feedback" },
        { text: "Working with Dev Agency has been absolute game-changer for our company. From the moment we engaged with.", author: "Client Feedback" },
    ];

    return (
        <main ref={containerRef} className="bg-black min-h-screen text-white pt-20">
            <Navbar />

            <section className="py-20 container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Client Stories</h1>
                <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
                    See how we've helped businesses transform and grow through technology.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="testimonial-card p-10 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-left relative overflow-hidden group hover:bg-zinc-900 transition-colors">
                            <div className="absolute top-8 right-8 text-zinc-700 group-hover:text-cyan-500/20 transition-colors">
                                <Quote className="w-12 h-12" />
                            </div>

                            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed relative z-10">"{t.text}"</p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
                                <div>
                                    <h4 className="font-bold">{t.author}</h4>
                                    <span className="text-cyan-400 text-sm">Verified Client</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
