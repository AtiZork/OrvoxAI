"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import CircuitBackground from "@/components/CircuitBackground";

export default function ContactUsPage() {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".contact-item", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.2
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="bg-black min-h-screen text-white pt-20 relative">
            <CircuitBackground />
            <Navbar />

            <section className="py-20 relative overflow-hidden">

                {/* Contact Info */}
                <div className="space-y-12">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">Get in Touch</h1>
                        <p className="text-xl text-gray-400">
                            Ready to transform your business? Let's discuss your next project.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="contact-item flex gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-cyan-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                                <p className="text-gray-400 mb-1">195 G3 Johar Town Lahore, Pakistan</p>
                                <p className="text-gray-400">4103 HQ Business Center Al fardan center, Sharjah</p>
                            </div>
                        </div>

                        <div className="contact-item flex gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                                <a href="mailto:info@orvoxai.com" className="text-gray-400 hover:text-white transition-colors">info@orvoxai.com</a>
                            </div>
                        </div>

                        <div className="contact-item flex gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-cyan-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Business Hours</h3>
                                <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                <p className="text-gray-400">Weekend: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 lg:p-12 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <form className="relative z-10 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">First Name</label>
                                <input type="text" className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 focus:border-cyan-400 focus:outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Last Name</label>
                                <input type="text" className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 focus:border-cyan-400 focus:outline-none transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Email</label>
                            <input type="email" className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 focus:border-cyan-400 focus:outline-none transition-colors" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Subject</label>
                            <select className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 focus:border-cyan-400 focus:outline-none transition-colors text-gray-400">
                                <option>General Inquiry</option>
                                <option>Project Proposal</option>
                                <option>Recruitment</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Message</label>
                            <textarea rows={4} className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 focus:border-cyan-400 focus:outline-none transition-colors resize-none" />
                        </div>

                        <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2">
                            Send Message
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </section>

            {/* Map Placeholder / Life At Orvox */}
            <section className="py-20 border-t border-zinc-900 bg-zinc-950">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-12">Life at Orvox AI</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px]">
                        <div className="bg-zinc-900 rounded-2xl col-span-2 row-span-2 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-bold text-xl uppercase tracking-widest">Culture</div>
                        </div>
                        <div className="bg-zinc-900 rounded-2xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="bg-zinc-900 rounded-2xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="bg-zinc-900 rounded-2xl col-span-2 row-span-1 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
