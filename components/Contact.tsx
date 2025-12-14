"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
            }
        });

        tl.from(".contact-content > *", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        });

        tl.from(".contact-form", {
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="contact-content">
                        <h2 className="text-4xl md:text-7xl font-bold mb-8">
                            Let's build your <br />
                            <span className="text-cyan-400">next project</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-md leading-relaxed">
                            We provide creative solutions that help your business grow and stand out in the digital world.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-cyan-400 shrink-0 border border-zinc-800">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Visit Us</h4>
                                    <p className="text-gray-400 text-sm">195 G3 Johar Town Lahore, Pakistan</p>
                                    <p className="text-gray-400 text-sm">4103 HQ Business Center Al fardan center, Sharjah</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-purple-400 shrink-0 border border-zinc-800">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Email Us</h4>
                                    <a href="mailto:info@orvoxai.com" className="text-gray-400 text-sm hover:text-white transition-colors">info@orvoxai.com</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-colors duration-500">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">First Name</label>
                                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Last Name</label>
                                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Email Address</label>
                                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Message</label>
                                <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none" placeholder="Tell us about your project..." />
                            </div>

                            <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2">
                                Send Message
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
