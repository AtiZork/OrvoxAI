"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeuralBackground from "@/components/NeuralBackground";
import { api } from "@/lib/api";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioPage() {
    const containerRef = useRef(null);
    const [teamGroups, setTeamGroups] = useState<any[]>([]);

    const loadTeamData = () => {
        api.getTeamGroups()
            .then((data) => {
                if (data && data.length > 0) {
                    setTeamGroups(data);
                }
            })
            .catch((error) => {
                console.error('Failed to fetch team groups:', error);
            });
    };

    useEffect(() => {
        loadTeamData();
        
        // Refresh data every 30 seconds to show updates
        const interval = setInterval(loadTeamData, 30000);
        
        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        // Hero Animation
        gsap.from(".hero-content", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

        // Section Animations
        teamGroups.forEach((group, groupIndex) => {
            const cards = gsap.utils.toArray(`.group-${groupIndex} .team-card`) as HTMLElement[];

            // Section Header Animation
            gsap.from(`.group-header-${groupIndex}`, {
                scrollTrigger: {
                    trigger: `.group-header-${groupIndex}`,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            // Batch Cards Animation
            ScrollTrigger.batch(cards, {
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.15,
                        overwrite: true,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                },
                onLeaveBack: (batch) => {
                    gsap.set(batch, { opacity: 0, y: 50, overwrite: true });
                }
            });

            // Initial set for batching
            gsap.set(cards, { opacity: 0, y: 50 });
        });

    }, { scope: containerRef, dependencies: [teamGroups] });

    if (teamGroups.length === 0) {
        return (
            <main className="bg-black min-h-screen text-white pt-20 relative">
                <NeuralBackground />
                <Navbar />
                <div className="container mx-auto px-4 text-center py-20">
                    <div className="text-xl text-gray-400">Loading team data...</div>
                </div>
            </main>
        );
    }

    return (
        <main ref={containerRef} className="bg-black min-h-screen text-white pt-20 relative">
            <NeuralBackground />
            <Navbar />

            {/* Header */}
            <section className="py-20 text-center relative overflow-hidden hero-content">
                <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">Meet The Team</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        The innovators and builders behind Orvox AI. Click on any team member to explore their expertise and projects.
                    </p>
                </div>
            </section>

            <div className="space-y-32 pb-32">
                {teamGroups.map((group, groupIndex) => (
                    <section key={group.id || groupIndex} className={`group-${groupIndex} container mx-auto px-4 relative`}>
                        {/* Section Header */}
                        <div className={`group-header-${groupIndex} mb-12 border-l-4 border-cyan-500 pl-6`}>
                            <h2 className="text-4xl font-bold mb-2">{group.title}</h2>
                            <p className="text-gray-400">{group.description}</p>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {group.members?.map((member: any, index: number) => (
                                <Link
                                    key={member.id || index}
                                    href={`/portfolio/${member.slug}`}
                                    className="team-card group cursor-pointer relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className="p-6">
                                        {/* Image */}
                                        <div className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors flex items-center justify-center">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center">
                                                        <ArrowRight className="w-6 h-6 text-black" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="text-left">
                                            <div className={`inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 ${member.color || 'text-cyan-400'}`}>
                                                <span className="text-xs font-bold uppercase tracking-wider">{member.role}</span>
                                            </div>

                                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">{member.name}</h3>

                                            <p className="text-gray-400 text-sm line-clamp-2 mb-4">{member.bio}</p>

                                            {/* Project Count */}
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="px-2 py-1 rounded-lg bg-zinc-950 border border-zinc-800">
                                                    <span className="text-cyan-400 font-semibold">{member.projects?.length || 0} Projects</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* CTA Section */}
            <section className="pb-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Explore Our Projects</h2>
                        <p className="text-gray-400 mb-8 text-lg">
                            See all the amazing work our team has delivered across various domains and technologies.
                        </p>
                        <Link href="/key-projects" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-full transition-colors">
                            View All Projects
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
