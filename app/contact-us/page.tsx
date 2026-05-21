"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, ArrowRight, Check } from "lucide-react";
import CircuitBackground from "@/components/CircuitBackground";

import { API_URL } from "@/lib/config";

export default function ContactUsPage() {
    const containerRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
                
                // Reset success message after 5 seconds
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };

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
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">Get in Touch</h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Ready to transform your business? Let's discuss your next project.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Contact Info - Left Side */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="contact-item">
                                <div className="flex gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-cyan-500/50 transition-colors h-full">
                                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">Visit Us</h3>
                                        <p className="text-gray-400 text-sm mb-1">195 G3 Johar Town<br />Lahore, Pakistan</p>
                                        <p className="text-gray-400 text-sm">4103 HQ Business Center<br />Al fardan center, Sharjah</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="flex gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/50 transition-colors h-full">
                                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">Email Us</h3>
                                        <a href="mailto:info@orvoxai.com" className="text-gray-400 text-sm hover:text-white transition-colors">info@orvoxai.com</a>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="flex gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-cyan-500/50 transition-colors h-full">
                                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">Business Hours</h3>
                                        <p className="text-gray-400 text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-400 text-sm">Weekend: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form - Right Side */}
                        <div className="lg:col-span-2">
                            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 lg:p-10 relative overflow-hidden group h-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <h2 className="text-2xl md:text-3xl font-bold mb-6 relative z-10">Send us a message</h2>

                                {submitted && (
                                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl flex items-center gap-3 relative z-10">
                                        <Check className="w-5 h-5 text-green-400" />
                                        <p className="text-green-400 font-medium">Message sent successfully! We'll get back to you soon.</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Full Name <span className="text-red-400">*</span></label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Email <span className="text-red-400">*</span></label>
                                        <input 
                                            type="email" 
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Subject</label>
                                        <select 
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-colors appearance-none cursor-pointer"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                                backgroundPosition: 'right 0.5rem center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '1.5em 1.5em',
                                                paddingRight: '2.5rem',
                                            }}
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Project Proposal">Project Proposal</option>
                                            <option value="Recruitment">Recruitment</option>
                                            <option value="Technical Support">Technical Support</option>
                                            <option value="Partnership">Partnership</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Message <span className="text-red-400">*</span></label>
                                        <textarea 
                                            rows={5}
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-black/50 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                                    >
                                        {submitting ? "Sending..." : "Send Message"}
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
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
