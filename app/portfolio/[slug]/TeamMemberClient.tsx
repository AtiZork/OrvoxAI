"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, use, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Briefcase, Star, Code, ExternalLink, Github, Linkedin, Twitter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeuralBackground from "@/components/NeuralBackground";
import { api } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/media";
import { notFound } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function TeamMemberClient({ params }: PageProps) {
    const containerRef = useRef(null);
    const pathname = usePathname();
    const { slug: paramSlug } = use(params);
    const slugFromPath = pathname?.match(/\/portfolio\/([^/]+)\/?$/)?.[1];
    const slug =
        paramSlug && paramSlug !== "default"
            ? paramSlug
            : (slugFromPath && slugFromPath !== "default" ? slugFromPath : paramSlug);
    const [member, setMember] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug || slug === "default") return;
        api.getTeamMemberBySlug(slug)
            .then((data) => {
                setMember(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch team member:', error);
                setLoading(false);
            });
    }, [slug]);

    // Extract projects from nested structure (with fallbacks for loading state)
    // Parse JSON strings to arrays
    const projects = member?.projects?.map((pm: any) => {
        const project = pm.project;
        return {
            ...project,
            technologies: typeof project.technologies === 'string' 
                ? JSON.parse(project.technologies || '[]') 
                : (project.technologies || [])
        };
    }) || [];
    const featuredProjects = projects.filter((p: any) => p.status === "featured");
    const ongoingProjects = projects.filter((p: any) => p.status === "ongoing");
    const completedProjects = projects.filter((p: any) => p.status === "completed");

    useGSAP(() => {
        // Hero Animation
        gsap.from(".hero-section", {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        });

        // About section
        gsap.from(".about-section", {
            scrollTrigger: {
                trigger: ".about-section",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out"
        });

        // Skills animation
        const skills = gsap.utils.toArray(".skill-tag");
        gsap.from(skills, {
            scrollTrigger: {
                trigger: ".skills-section",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 20,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out"
        });

        // Projects animation
        const projectCards = gsap.utils.toArray(".project-card");
        ScrollTrigger.batch(projectCards as HTMLElement[], {
            onEnter: (batch) => {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power2.out"
                });
            },
            start: "top 85%"
        });
        gsap.set(projectCards, { opacity: 0, y: 50 });

    }, { scope: containerRef, dependencies: [member] });

    if (loading) {
        return (
            <main className="bg-black min-h-screen text-white pt-20 relative">
                <NeuralBackground />
                <Navbar />
                <div className="container mx-auto px-4 text-center py-20">
                    <div className="text-xl text-gray-400">Loading...</div>
                </div>
            </main>
        );
    }

    if (!member) {
        notFound();
    }

    return (
        <main ref={containerRef} className="bg-black min-h-screen text-white pt-20 relative">
            <NeuralBackground />
            <Navbar />

            {/* Hero Section */}
            <section className="hero-section relative py-20 overflow-hidden">
                <div className="container mx-auto px-4">
                    <Link href="/portfolio" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Team
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden border-2 border-cyan-500/30">
                            <Image
                                src={resolveMediaUrl(member.image)}
                                alt={member.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        </div>

                        {/* Info */}
                        <div>
                            <div className={`inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-zinc-950 border border-zinc-800 ${member.color}`}>
                                <member.icon className="w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-wider">{member.role}</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold mb-6">{member.name}</h1>
                            
                            {/* Social Links */}
                            <div className="flex gap-4 mb-8">
                                {member.linkedin && (
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500 hover:bg-zinc-800 transition-all">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                )}
                                {member.github && (
                                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500 hover:bg-zinc-800 transition-all">
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                {member.twitter && (
                                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500 hover:bg-zinc-800 transition-all">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                                    <span className="text-cyan-400 font-semibold">{member.projects.length} Projects</span>
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                                    <span className="text-emerald-400 font-semibold">{member.skills.length}+ Skills</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="border-l-4 border-cyan-500 pl-6 mb-8">
                            <h2 className="text-4xl font-bold mb-4">About</h2>
                        </div>
                        <p className="text-xl text-gray-300 leading-relaxed">{member.bio}</p>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="skills-section py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="border-l-4 border-cyan-500 pl-6 mb-8">
                            <h2 className="text-4xl font-bold mb-4">Expertise & Skills</h2>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {member.skills.map((skill: string, index: number) => (
                                <span
                                    key={index}
                                    className="skill-tag px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500 transition-colors text-gray-300 font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            {featuredProjects.length > 0 && (
                <section className="py-20 relative">
                    <div className="container mx-auto px-4">
                        <div className="border-l-4 border-amber-500 pl-6 mb-12">
                            <h2 className="text-4xl font-bold mb-2">Featured Projects</h2>
                            <p className="text-gray-400">Showcasing the most impactful work</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {featuredProjects.map((project: any, index: number) => (
                                <div
                                    key={index}
                                    className="project-card group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className="p-8">
                                        <div className="flex items-start justify-between mb-4">
                                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                                                Featured
                                            </span>
                                            {project.year && (
                                                <span className="text-gray-500 text-sm">{project.year}</span>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        
                                        <p className="text-cyan-400 text-sm font-medium mb-4">{project.category}</p>
                                        
                                        <p className="text-gray-400 mb-6 line-clamp-3">{project.description}</p>

                                        {project.technologies && (
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech: string, i: number) => (
                                                    <span key={i} className="px-2 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-gray-400 text-xs">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Ongoing Projects Section */}
            {ongoingProjects.length > 0 && (
                <section className="py-20 relative">
                    <div className="container mx-auto px-4">
                        <div className="border-l-4 border-emerald-500 pl-6 mb-12">
                            <h2 className="text-4xl font-bold mb-2">Ongoing Projects</h2>
                            <p className="text-gray-400">Currently working on these initiatives</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {ongoingProjects.map((project: any, index: number) => (
                                <div
                                    key={index}
                                    className="project-card group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className="p-8">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                                    Ongoing
                                                </span>
                                            </div>
                                            {project.year && (
                                                <span className="text-gray-500 text-sm">{project.year}</span>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        
                                        <p className="text-emerald-400 text-sm font-medium mb-4">{project.category}</p>
                                        
                                        <p className="text-gray-400 mb-6 line-clamp-3">{project.description}</p>

                                        {project.technologies && (
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech: string, i: number) => (
                                                    <span key={i} className="px-2 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-gray-400 text-xs">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Completed Projects Section */}
            {completedProjects.length > 0 && (
                <section className="py-20 relative">
                    <div className="container mx-auto px-4">
                        <div className="border-l-4 border-zinc-500 pl-6 mb-12">
                            <h2 className="text-4xl font-bold mb-2">Completed Projects</h2>
                            <p className="text-gray-400">Successfully delivered</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {completedProjects.map((project: any, index: number) => (
                                <div
                                    key={index}
                                    className="project-card group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <span className="px-2 py-1 rounded-full bg-zinc-800 text-gray-400 text-xs font-bold">
                                                Completed
                                            </span>
                                            {project.year && (
                                                <span className="text-gray-500 text-xs">{project.year}</span>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-gray-500 text-sm mb-3">{project.category}</p>
                                        <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/30 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Interested in Working Together?</h2>
                        <p className="text-gray-400 mb-8">Let's discuss how we can help bring your ideas to life.</p>
                        <Link href="/contact-us" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-full transition-colors">
                            Get in Touch
                            <ExternalLink className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

