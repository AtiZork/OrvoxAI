"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Brain, Code, Cloud, Database, Cpu, Smartphone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Blockchain Solutions",
        icon: <Cpu className="w-10 h-10 mb-4 text-cyan-400" />,
        items: ["Secure infrastructure", "Smart contracts", "Crypto wallets", "Custom platforms"]
    },
    {
        title: "AI & ML Solutions",
        icon: <Brain className="w-10 h-10 mb-4 text-purple-400" />,
        items: ["Predictive analytics", "NLP", "Custom ML models", "AI automation"]
    },
    {
        title: "Web Development",
        icon: <Code className="w-10 h-10 mb-4 text-cyan-400" />,
        items: ["Responsive design", "Full-stack solutions", "CMS integration", "E-commerce"]
    },
    {
        title: "DevOps & Cloud",
        icon: <Cloud className="w-10 h-10 mb-4 text-purple-400" />,
        items: ["CI/CD pipelines", "IaC (Terraform)", "Cost optimization", "Monitoring"]
    },
    {
        title: "Data Analysis",
        icon: <Database className="w-10 h-10 mb-4 text-cyan-400" />,
        items: ["Web scraping", "Data pipelines", "Data cleaning", "Analytics dashboards"]
    },
    {
        title: "App Development",
        icon: <Smartphone className="w-10 h-10 mb-4 text-purple-400" />,
        items: ["Flutter & React Native", "Cross-platform", "API integration", "Performance optimization"]
    }
];

export default function Services() {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".service-card", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 50,
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)" // Adds a nice pop effect
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-[#050511] relative">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">
                    <span className="block text-gray-400 text-lg uppercase tracking-widest mb-4 font-normal">Our Expertise</span>
                    Premium Services
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card group relative p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-cyan-500/50 transition-colors duration-300 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-cyan-500/10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                            <div className="relative z-10">
                                {service.icon}
                                <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                                <ul className="space-y-2">
                                    {service.items.map((item, i) => (
                                        <li key={i} className="text-gray-400 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-cyan-400 transition-colors" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
