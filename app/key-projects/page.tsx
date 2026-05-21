"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight, Users, Sparkles, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import NeuralBackground from "@/components/NeuralBackground";

gsap.registerPlugin(ScrollTrigger);

type TabType = "all" | "featured" | "ongoing" | "completed";

export default function KeyProjectsPage() {
    const containerRef = useRef(null);
    const [allProjects, setAllProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>("all");

    // Fetch projects from API
    useEffect(() => {
        api.getProjects()
            .then((data) => {
                // Parse technologies for each project
                const parsedProjects = data.map((project: any) => ({
                    ...project,
                    technologies: typeof project.technologies === 'string' 
                        ? JSON.parse(project.technologies || '[]') 
                        : (project.technologies || []),
                    // Extract team members from the members relation
                    allMembers: project.members?.map((pm: any) => pm.member) || []
                }));
                setAllProjects(parsedProjects);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch projects:', error);
                setLoading(false);
            });
    }, []);

    // Filter projects based on active tab
    const filteredProjects = activeTab === "all" 
        ? allProjects 
        : allProjects.filter(p => p.status === activeTab);

    // Calculate statistics
    const stats = {
        total: allProjects.length,
        featured: allProjects.filter(p => p.status === "featured").length,
        ongoing: allProjects.filter(p => p.status === "ongoing").length,
        completed: allProjects.filter(p => p.status === "completed").length,
    };

    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Initial page load animations
    useGSAP(() => {
        if (loading) return; // Don't animate until data is loaded

        const timeline = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        // Hero animation
        timeline.fromTo(".hero-section", 
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 }
        );

        // Stats cards animation
        timeline.fromTo(".stat-card",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
            "-=0.4"
        );

        // Tabs animation - GUARANTEE visibility
        timeline.fromTo(".tabs-container",
            { y: 20, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.6,
                clearProps: "all", // Clear all inline styles after animation
                onComplete: () => setIsInitialLoad(false)
            },
            "-=0.3"
        );

        // Projects animation
        timeline.fromTo(".project-card",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
            "-=0.2"
        );

    }, { scope: containerRef, dependencies: [loading, allProjects] });

    // Animate projects when tab changes
    useGSAP(() => {
        if (!isInitialLoad) {
            const projectCards = gsap.utils.toArray(".project-card");
            
            if (projectCards.length > 0) {
                gsap.fromTo(projectCards,
                    { y: 15, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out", clearProps: "all" }
                );
            }
        }
    }, { scope: containerRef, dependencies: [activeTab] });

    // Tab configuration
    const tabs = [
        { id: "all" as TabType, label: "All Projects", count: stats.total, icon: Sparkles, color: "cyan" },
        { id: "featured" as TabType, label: "Featured", count: stats.featured, icon: Sparkles, color: "amber" },
        { id: "ongoing" as TabType, label: "Ongoing", count: stats.ongoing, icon: Zap, color: "emerald" },
        { id: "completed" as TabType, label: "Completed", count: stats.completed, icon: CheckCircle2, color: "gray" },
    ];

    // Get status styling
    const getStatusStyling = (status: string) => {
        switch (status) {
            case "featured":
                return {
                    badge: "text-amber-400 bg-amber-500/10 border-amber-500/30",
                    border: "border-amber-500/30 hover:border-amber-500/60",
                    accent: "text-amber-400",
                    glow: "group-hover:shadow-amber-500/20"
                };
            case "ongoing":
                return {
                    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
                    border: "border-emerald-500/30 hover:border-emerald-500/60",
                    accent: "text-emerald-400",
                    glow: "group-hover:shadow-emerald-500/20"
                };
            case "completed":
                return {
                    badge: "text-gray-400 bg-zinc-800 border-zinc-700",
                    border: "border-zinc-800 hover:border-zinc-600",
                    accent: "text-gray-400",
                    glow: "group-hover:shadow-zinc-500/10"
                };
            default:
                return {
                    badge: "text-gray-400 bg-zinc-800",
                    border: "border-zinc-800",
                    accent: "text-gray-400",
                    glow: ""
                };
        }
    };

    return (
        <main ref={containerRef} className="bg-black min-h-screen text-white relative overflow-hidden">
            {/* Neural Background */}
            <NeuralBackground />
            
            {/* Navbar */}
            <Navbar />
            
            <div className="pt-32 pb-20 px-4 container mx-auto max-w-7xl relative z-10">
                {/* Hero Section */}
                <div className="hero-section mb-16 relative">
                    {/* Glow Effect */}
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
                    
                    <div className="relative">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl">
                            A comprehensive showcase of innovation, expertise, and successful deliveries across our talented team.
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mb-12 relative z-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="stat-card bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl font-bold text-cyan-400 mb-2">{stats.total}</div>
                            <div className="text-gray-400 text-sm font-medium">Total Projects</div>
                        </div>
                        <div className="stat-card bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 text-center hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl font-bold text-amber-400 mb-2">{stats.featured}</div>
                            <div className="text-gray-400 text-sm font-medium">Featured</div>
                        </div>
                        <div className="stat-card bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 text-center hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl font-bold text-emerald-400 mb-2">{stats.ongoing}</div>
                            <div className="text-gray-400 text-sm font-medium">Ongoing</div>
                        </div>
                        <div className="stat-card bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 text-center hover:border-gray-500/50 transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl font-bold text-gray-400 mb-2">{stats.completed}</div>
                            <div className="text-gray-400 text-sm font-medium">Completed</div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section - ALWAYS VISIBLE */}
                <div className="tabs-container mb-12 relative z-20" style={{ opacity: 1, visibility: 'visible' }}>
                    <div className="bg-zinc-900/80 backdrop-blur-sm border-2 border-zinc-700 rounded-2xl p-3 inline-flex flex-wrap gap-2 shadow-2xl shadow-cyan-500/10">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            const Icon = tab.icon;
                            
                            let activeStyles = "";
                            if (isActive) {
                                switch (tab.color) {
                                    case "cyan":
                                        activeStyles = "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30";
                                        break;
                                    case "amber":
                                        activeStyles = "bg-amber-500 text-black shadow-lg shadow-amber-500/30";
                                        break;
                                    case "emerald":
                                        activeStyles = "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30";
                                        break;
                                    case "gray":
                                        activeStyles = "bg-gray-500 text-black shadow-lg shadow-gray-500/30";
                                        break;
                                }
                            }

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{ opacity: 1, visibility: 'visible' }}
                                    className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                                        isActive 
                                            ? activeStyles
                                            : "bg-zinc-800/50 text-gray-300 hover:bg-zinc-700 hover:text-white border border-zinc-700"
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{tab.label}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold transition-colors ${
                                        isActive ? "bg-black/20" : "bg-zinc-800"
                                    }`}>
                                        {tab.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <div className="text-xl text-gray-400">Loading projects...</div>
                    </div>
                )}

                {/* Projects Grid */}
                {!loading && (
                <div className="space-y-6 mb-20 relative z-20">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, i) => {
                            const styling = getStatusStyling(project.status);
                            const hasMultipleMembers = project.allMembers && project.allMembers.length > 1;

                            return (
                                <div 
                                    key={`${project.title}-${i}`}
                                    className={`project-card group bg-zinc-900/50 backdrop-blur-sm border ${styling.border} rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${styling.glow}`}
                                >
                                    <div className="p-8 md:p-10">
                                        <div className="grid md:grid-cols-3 gap-8">
                                            {/* Left: Project Info */}
                                            <div className="md:col-span-2 space-y-6">
                                                {/* Status and Year */}
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${styling.badge}`}>
                                                        {project.status}
                                                    </span>
                                                    {project.year && (
                                                        <span className="text-gray-500 text-sm font-medium">{project.year}</span>
                                                    )}
                                                    {project.status === "ongoing" && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                            <span className="text-emerald-400 text-sm font-medium">In Progress</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Title and Category */}
                                                <div>
                                                    <h2 className="text-3xl md:text-4xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                                                        {project.title}
                                                    </h2>
                                                    <p className={`${styling.accent} font-bold tracking-widest uppercase text-sm`}>
                                                        {project.category}
                                                    </p>
                                                </div>

                                                {/* Description */}
                                                <p className="text-gray-300 text-lg leading-relaxed">
                                                    {project.description}
                                                </p>

                                                {/* Technologies */}
                                                {project.technologies && project.technologies.length > 0 && (
                                                    <div>
                                                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Tech Stack</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {project.technologies.map((tech: string, idx: number) => (
                                                                <span 
                                                                    key={idx} 
                                                                    className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-gray-300 text-sm font-medium hover:border-cyan-500/50 transition-colors"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right: Team Members */}
                                            <div className="flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                                        <Users className="w-4 h-4" />
                                                        <span>{hasMultipleMembers ? "Team Members" : "Led by"}</span>
                                                    </div>

                                                    <div className="space-y-3 mb-6">
                                                        {project.allMembers && project.allMembers.length > 0 ? (
                                                            project.allMembers.map((member: { slug: string; name?: string; role?: string }, idx: number) => (
                                                                <Link 
                                                                    key={idx}
                                                                    href={`/portfolio/${member.slug}`}
                                                                    className="block group/member p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-900 transition-all"
                                                                >
                                                                    <h3 className="text-lg font-bold mb-1 group-hover/member:text-cyan-400 transition-colors">
                                                                        {member.name}
                                                                    </h3>
                                                                    <p className="text-gray-400 text-sm">{member.role}</p>
                                                                </Link>
                                                            ))
                                                        ) : (
                                                            <Link 
                                                                href={`/portfolio/${project.memberSlug}`}
                                                                className="block group/member p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-900 transition-all"
                                                            >
                                                                <h3 className="text-lg font-bold mb-1 group-hover/member:text-cyan-400 transition-colors">
                                                                    {project.memberName}
                                                                </h3>
                                                                <p className="text-gray-400 text-sm">{project.memberRole}</p>
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>

                                                {hasMultipleMembers && project.allMembers && (
                                                    <div className="text-center">
                                                        <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                                                            <span className="text-cyan-400 font-semibold text-sm">
                                                                {project.allMembers.length} Team Members
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
                                <Sparkles className="w-10 h-10 text-gray-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-400 mb-2">No projects in this category</h3>
                            <p className="text-gray-500">Try selecting a different tab to see more projects.</p>
                        </div>
                    )}
                </div>
                )}

                {/* CTA Section */}
                <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-3xl p-12 relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-cyan-500/5 rounded-3xl blur-xl" />
                    
                    <div className="relative">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Start Your Project?</h2>
                        <p className="text-gray-400 mb-8 text-lg">
                            Let's collaborate and bring your vision to life with our expert team.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">
                                Start a Project
                                <ArrowUpRight className="w-5 h-5" />
                            </Link>
                            <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold rounded-full transition-all duration-300 hover:scale-105">
                                Meet the Team
                                <Users className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
