"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Code2, Briefcase, User, Star, X, Linkedin, Twitter, Globe, Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NeuralBackground from "@/components/NeuralBackground";

gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const teamGroups = [
    {
        title: "Leadership",
        description: "Guiding the vision and strategy of Orvox AI.",
        members: [
            {
                name: "Atizaz Abid",
                role: "CEO & Founder",
                image: "/team/ceo.png",
                skills: ["Visionary Leadership", "AI Strategy", "Product Innovation"],
                project: "Orvox AI",
                icon: Star,
                color: "text-amber-400",
                bio: "Leading Orvox AI with a vision to revolutionize the digital landscape through artificial intelligence."
            },
        ]
    },
    {
        title: "Development",
        description: "The engineers building the core of our technology.",
        members: [
            {
                name: "Muhammad Musaddaq Abbas",
                role: "Senior Software Engineer",
                image: "/team/musaddaq.jpeg",
                skills: ["Python", "Django", "Django Rest Framework", "Github", "GitLab", "Bitbucket", "Node.js", "AWS", "Saas"],
                project: "Campaign Automation, Pronto Mobile, Solivox",
                icon: Code2,
                color: "text-cyan-400",
                bio: "Expert in building scalable web applications and system foundations."
            },
            {
                name: "Abdullah Aftab",
                role: "Senior AI Engineer",
                image: "/team/Abdullah.JPG",
                skills: ["Python", "JavaScript", "TensorFlow", "PyTorch", "Scikit-learn", "spaCy", "n8n", "SQL", "MongoDB", "Postgress", "AWS", "Docker", "Digital Ocean", "BeautifulSoup", "Scrapy", "Selenium"],
                project: ["Campaign Automation", "Pronto Mobile", "Solivox"],
                icon: Code2,
                color: "text-cyan-400",
                bio: "I am a dedicated and results-driven AI Engineer with over 1.5 years of hands-on experience in developing cutting-edge AI agents, implementing Retrieval-Augmented Generation (RAG) techniques, and optimizing intelligent workflows using tools like n8n. My expertise spans across AI model development, training, and deploying automation systems, as well as web scraping for data extraction and analysis.I am passionate about pushing the boundaries of AI and automation, continually improving model performance, and creating scalable solutions to solve complex challenges. Through continuous learning and practical application, I aim to drive innovation and efficiency within AI-driven systems."
            },
            {
                name: "Zaryab Anwar",
                role: "Senior Full Stack Engineer",
                image: "/team/Zaryab.jpeg",
                skills: ["React.js", "Next.js", "Django", "Node.js", "NestJS", "Flask", "FastApi", "AI/ML/DL", "RAG/AGENTS", "MICROSERVICES", "Express.js"],
                project: "Client Dashboard V2",
                icon: Code2,
                color: "text-cyan-400",
                bio: "I am Zaryab Khan — a Senior Full-Stack Engineer and AI Systems Architect with over 5 years of professional experience building highly scalable, distributed, and intelligent applications. I specialize in combining modern full-stack development with advanced AI/ML/DL, RAG pipelines, and Agentic AI (A2A) systems to deliver end-to-end solutions that are fast, reliable, and production-ready. My expertise spans frontend engineering with React and Next.js, backend development with Node.js, NestJS, and microservice-driven architectures, and event-driven pipelines powered by Kafka, Redis, RabbitMQ, and Celery. I architect resilient, high-performance systems using AWS, Docker, Kubernetes, CI/CD, and cloud-native networking fundamentals, covering load balancing, VPC design, DNS, SSL, and distributed deployments. I build and deploy real-world AI features including LLM-powered apps, vector-based RAG systems, multi-agent automation, fine-tuning, and model-serving pipelines. From designing intelligent data flows to delivering seamless user experiences, I handle everything across the stack—frontend, backend, systems design, cloud infrastructure, observability, and AI engineering. My engineering philosophy is simple: build systems that are scalable, maintainable, secure, and optimized for the future."
            },
            {
                name: "Sufyan",
                role: "Senior Full Stack Engineer",
                image: "/team/Sufiyan.png",
                skills: ["React.js", "Next.js", "Django", "Node.js", "NestJS", "Flask", "FastApi", "AI/ML/DL", "RAG/AGENTS", "MICROSERVICES", "Express.js"],
                project: "Client Dashboard V2",
                icon: Code2,
                color: "text-cyan-400",
                bio: "I am Sufyan — a Senior Full-Stack Engineer and AI Systems Architect with over 5 years of professional experience building highly scalable, distributed, and intelligent applications. I specialize in combining modern full-stack development with advanced AI/ML/DL, RAG pipelines, and Agentic AI (A2A) systems to deliver end-to-end solutions that are fast, reliable, and production-ready. My expertise spans frontend engineering with React and Next.js, backend development with Node.js, NestJS, and microservice-driven architectures, and event-driven pipelines powered by Kafka, Redis, RabbitMQ, and Celery. I architect resilient, high-performance systems using AWS, Docker, Kubernetes, CI/CD, and cloud-native networking fundamentals, covering load balancing, VPC design, DNS, SSL, and distributed deployments. I build and deploy real-world AI features including LLM-powered apps, vector-based RAG systems, multi-agent automation, fine-tuning, and model-serving pipelines. From designing intelligent data flows to delivering seamless user experiences, I handle everything across the stack—frontend, backend, systems design, cloud infrastructure, observability, and AI engineering. My engineering philosophy is simple: build systems that are scalable, maintainable, secure, and optimized for the future."
            },
            {
                name: "Haroon Sajid",
                role: "AI Engineer",
                image: "/team/Haroon.jpg",
                skills: ["Python", "Django", "Fastapi", "React", "AI/ML", "Rag Agent", "n8n automations", "Node.js", "MICROSERVICES", "Express.js", "Postgres", "MongoDB", "LangChain"],
                project: "Scalable Infrastructure",
                icon: Code2,
                color: "text-cyan-400",
                bio: "Muhammad Haroon Sajid is an AI graduate with one year of experience in Python, machine learning, and backend development. He has worked with FastAPI, Django, React, and modern AI tools like LangChain and LangGraph. His skills include backend systems, automation workflows, and building complete AI pipelines. He also works with Git, Jupyter, and designs digital content using Canva. He enjoys solving problems and learning new things, and aims to contribute to AI solutions, automation, and scalable applications."
            },
            {
                name: "Muhammad Hamza Sajid",
                role: "Software Engineer",
                image: "/team/Hamza.jpeg",
                skills: ["Python", "JavaScript", "Node.js", "NestJS", "Django", "Angular", "React", "Pandas", "NumPy", "MongoDB", "Postgress", "AWS", "Docker", "Git", "BeautifulSoup", "Scrapy", "Selenium"],
                project: "HomeEnergy, IOT Data Migrations, Bailey Time Series",
                icon: Code2,
                color: "text-cyan-400",
                bio: "I am Muhammad Hamza Sajid, a software engineer with experience in Python, JavaScript, Node.js, NestJS, Django, Angular, React, Pandas, NumPy, MongoDB, Postgress, AWS, Docker, Git, BeautifulSoup, Scrapy, and Selenium. I have worked on automating infrastructure and ensuring robust security protocols. I am passionate about building scalable, secure, and efficient software solutions."
            }
        ]
    },
    {
        title: "Business & Growth",
        description: "Driving partnerships and market expansion.",
        members: [
            {
                name: "Muhammad Sajid",
                role: "Business Development Executive",
                image: "/team/Sajid.png",
                skills: ["growth opportunities", "managing client acquisition", "Software Quality Assurance"],
                project: "",
                icon: Briefcase,
                color: "text-emerald-400",
                bio: " I currently work as a Business Development Executive at OrvoxAi. My role involves identifying growth opportunities, managing client acquisition through digital platforms, and fostering long-term partnerships. With a strong foundation in Software Quality Assurance from previous experience, I bring a unique perspective to understanding client needs and delivering tailored solutions. At OrvoxAI, I collaborate closely with teams to develop personalized outreach strategies and drive consistent results. My experience in CRM and client relationship management enables me to align growth initiatives with organizational goals. Committed to fostering collaboration and continuous improvement, I aim to contribute to a culture of innovation and mutual success within the organization."
            },
            {
                name: "Fiza Sardar",
                role: "Senior Sales Executive",
                image: "/team/Fiza.jpeg",
                skills: ["Business Developer Lead", "Lead Generation", "Strategic Planning", "Growth Expert", "6.7k+ Followers on LinkedIn", "Profile Optimization Specialist", "B2B Sales", "Upwork", "Client Relationship Management", "Team Management", "Project Handling"],
                project: "North America Market",
                icon: Briefcase,
                color: "text-emerald-400",
                bio: "I am Fiza Sardar, a Business Developer Lead with experience in lead generation, strategic planning, growth expertise, LinkedIn profile optimization, B2B sales, Upwork, client relationship management, team management, and project handling. I have worked on expanding market presence and managing key client relationships."
            },
            {
                name: "Anum",
                role: "Business Analyst",
                image: "/team/anum.jpeg",
                skills: ["Business Developer", "EMAIL marketing", "B2B", "Client relationship mangment", "products Sales", "linkdin expert", "Meeting Coordination", "Sales Executive", "Client Relationship Management", "Team Management", "Project Handling"],
                project: "Growth Strategy 2026",
                icon: Briefcase,
                color: "text-emerald-400",
                bio: "I am Anum, a Business Developer with experience in EMAIL marketing, B2B, client relationship management, products sales, LinkedIn expertise, meeting coordination, sales executive, client relationship management, team management, and project handling. I have worked on expanding market presence and managing key client relationships."
            },
        ]
    }
];

export default function PortfolioPage() {
    const containerRef = useRef(null);
    const [selectedMember, setSelectedMember] = useState<any>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedMember) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedMember]);

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

    }, { scope: containerRef });

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
                        The innovators and builders behind Orvox AI.
                    </p>
                </div>
            </section>

            <div className="space-y-32 pb-32">
                {teamGroups.map((group, groupIndex) => (
                    <section key={groupIndex} className={`group-${groupIndex} container mx-auto px-4 relative`}>
                        {/* Section Header */}
                        <div className={`group-header-${groupIndex} mb-12 border-l-4 border-cyan-500 pl-6`}>
                            <h2 className="text-4xl font-bold mb-2">{group.title}</h2>
                            <p className="text-gray-400">{group.description}</p>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {group.members.map((member, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedMember(member)}
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
                                        </div>

                                        {/* Content */}
                                        <div className="text-left">
                                            <div className={`inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 ${member.color}`}>
                                                <member.icon className="w-4 h-4" />
                                                <span className="text-xs font-bold uppercase tracking-wider">{member.role}</span>
                                            </div>

                                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">{member.name}</h3>

                                            <p className="text-gray-400 text-sm line-clamp-2">{member.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* Modal */}
            {selectedMember && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    onClick={() => setSelectedMember(null)}
                >
                    <div
                        className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300"
                        onClick={(e) => e.stopPropagation()}
                        data-lenis-prevent
                    >
                        <button
                            onClick={() => setSelectedMember(null)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-zinc-800 border border-zinc-700 hover:border-cyan-500 transition-colors z-20"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex flex-col md:flex-row h-full">
                            {/* Modal Image */}
                            <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto min-h-[300px] md:min-h-full">
                                <Image
                                    src={selectedMember.image}
                                    alt={selectedMember.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r" />
                            </div>

                            {/* Modal Content */}
                            <div className="w-full md:w-1/2 p-8 md:p-12">
                                <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 ${selectedMember.color}`}>
                                    <selectedMember.icon className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">{selectedMember.role}</span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-bold mb-2">{selectedMember.name}</h2>
                                <div
                                    className="max-h-32 overflow-y-auto pr-2 mb-8 custom-scrollbar"
                                    data-lenis-prevent
                                    onWheel={(e) => e.stopPropagation()}
                                >
                                    <p className="text-xl text-gray-400">{selectedMember.bio}</p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3">Current Project</h4>
                                        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                                            <span className="font-medium text-cyan-50">{selectedMember.project}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3">Expertise</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedMember.skills.map((skill: string, i: number) => (
                                                <span key={i} className="px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-gray-300 text-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3">Connect</h4>
                                        {/* <div className="flex gap-4">
                                            <button className="p-3 rounded-xl bg-zinc-800 hover:bg-cyan-500 hover:text-black transition-colors">
                                                <Linkedin className="w-5 h-5" />
                                            </button>
                                            <button className="p-3 rounded-xl bg-zinc-800 hover:bg-cyan-500 hover:text-black transition-colors">
                                                <Twitter className="w-5 h-5" />
                                            </button>
                                            <button className="p-3 rounded-xl bg-zinc-800 hover:bg-cyan-500 hover:text-black transition-colors">
                                                <Github className="w-5 h-5" />
                                            </button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    );
}
