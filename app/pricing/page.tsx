"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const plans = [
    {
        price: "499",
        period: "month",
        features: ["Request to unlimited logo", "Request to unlimited website", "Request upto 10 team", "Request to unlimited dashboard", "24/7 dedicated support system"],
        highlight: false
    },
    {
        price: "599",
        period: "month",
        features: ["Request to unlimited logo", "Request to unlimited website", "Request upto 10 team", "Request to unlimited dashboard", "24/7 dedicated support system"],
        highlight: true
    },
    {
        price: "799",
        period: "month",
        features: ["Request to unlimited logo", "Request to unlimited website", "Request upto 10 team", "Request to unlimited dashboard", "24/7 dedicated support system"],
        highlight: false
    }
];

export default function PricingPage() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(".pricing-card");

        cards.forEach((card: any, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                    delay: index * 0.1
                }
            );
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="bg-black min-h-screen text-white pt-20">
            <Navbar />

            {/* Portfolio/Pricing Header */}
            <section className="py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Choose the perfect plan for your business needs. No hidden fees.
                    </p>
                </div>
            </section>

            {/* Pricing Grid */}
            <section className="py-10 pb-32 pricing-grid">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`pricing-card relative p-8 rounded-3xl border ${plan.highlight
                                    ? "bg-zinc-900 border-cyan-500 shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)]"
                                    : "bg-zinc-950 border-zinc-800 hover:border-zinc-700"
                                    } transition-all duration-300 group`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black font-bold px-4 py-1 rounded-full text-sm">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <span className="text-4xl font-bold">${plan.price}</span>
                                    <span className="text-gray-400"> / {plan.period}</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? "bg-cyan-500/20 text-cyan-400" : "bg-zinc-800 text-gray-400"}`}>
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${plan.highlight
                                    ? "bg-cyan-500 text-black hover:bg-cyan-400"
                                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                                    }`}>
                                    Get Started Now
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <h3 className="text-2xl font-bold mb-4">Need a custom plan?</h3>
                        <button className="px-8 py-3 rounded-full border border-zinc-700 hover:border-cyan-500 hover:text-cyan-400 transition-colors">
                            Book a Call
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
