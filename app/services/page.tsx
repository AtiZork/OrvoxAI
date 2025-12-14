"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Canvas } from "@react-three/fiber";
import Service3DIcon from "@/components/Service3DIcon";
import TextScramble from "@/components/TextScramble";

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
    {
        title: "Blockchain Solutions",
        description: "Secure and scalable infrastructure, smart contract development, crypto wallet integration, and custom blockchain platforms.",
        features: ["Secure and scalable infrastructure", "Smart contract development", "Crypto wallet integration", "Custom blockchain platforms"]
    },
    {
        title: "AI & Machine Learning",
        description: "Predictive analytics, NLP, custom ML model development, and AI-driven automation tools.",
        features: ["Predictive analytics and modeling", "Natural Language Processing (NLP)", "Custom ML model development", "AI-driven automation tools"]
    },
    {
        title: "Web Development",
        description: "Responsive & mobile-first design, custom frontend & backend solutions, CMS integration, and e-commerce platform development.",
        features: ["Responsive & mobile-first design", "Custom frontend & backend solutions", "CMS integration (WordPress, Shopify)", "E-commerce platform development"]
    },
    {
        title: "DevOps & Cloud Automation",
        description: "CI/CD pipeline setup, Infrastructure as Code, cloud cost optimization, and real-time monitoring.",
        features: ["CI/CD pipeline setup & optimization", "Infrastructure as Code (IaC) with Terraform", "Cloud cost optimization strategies", "Real-time monitoring & alert systems"]
    },
    {
        title: "Data Analysis & Extraction",
        description: "Scalable web scraping, real-time data pipelines, data cleaning, and visual analytics dashboards.",
        features: ["Scalable web scraping with Scrapy", "Real-time data pipelines with Python", "Data cleaning & transformation", "Visual analytics dashboards"]
    },
    {
        title: "Cross-Platform App Dev",
        description: "Flutter & React Native solutions, seamless user experience, API integration, and performance optimization.",
        features: ["Flutter & React Native app solutions", "Seamless user experience across devices", "Third-party API integration", "Performance optimization for mobile & web"]
    }
];

export default function ServicesPage() {
    const containerRef = useRef(null);

    useGSAP(() => {
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
    }, { scope: containerRef });

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

            <div className="container mx-auto px-4 pb-32 flex flex-col gap-32">
                {servicesList.map((service, i) => (
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
                            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                                {service.description}
                            </p>

                            <ul className="space-y-4">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-gray-300">
                                        <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-400'} shadow-[0_0_10px_currentColor]`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </main>
    );
}
