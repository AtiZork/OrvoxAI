import { Code2, Briefcase, Star, LucideIcon } from "lucide-react";

export interface Project {
    title: string;
    category: string;
    description: string;
    status: "featured" | "ongoing" | "completed";
    technologies?: string[];
    image?: string;
    year?: string;
    teamMembers?: string[]; // Array of team member slugs who worked on this project
}

export interface TeamMember {
    name: string;
    role: string;
    image: string;
    skills: string[];
    projects: Project[];
    icon: LucideIcon;
    color: string;
    bio: string;
    slug: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
}

export interface TeamGroup {
    title: string;
    description: string;
    members: TeamMember[];
}

export const teamGroups: TeamGroup[] = [
    {
        title: "Leadership",
        description: "Guiding the vision and strategy of Orvox AI.",
        members: [
            {
                name: "Atizaz Abid",
                role: "CEO & Founder",
                slug: "atizaz-abid",
                image: "/team/ceo.png",
                skills: ["Visionary Leadership", "AI Strategy", "Product Innovation", "Business Development"],
                icon: Star,
                color: "text-amber-400",
                bio: "Leading Orvox AI with a vision to revolutionize the digital landscape through artificial intelligence. With extensive experience in tech leadership and strategic planning, Atizaz drives innovation and growth across all company initiatives.",
                projects: [
                    {
                        title: "Orvox AI Platform",
                        category: "AI Strategy",
                        description: "Leading the development of Orvox AI's flagship platform, revolutionizing how businesses leverage artificial intelligence.",
                        status: "featured",
                        technologies: ["AI Strategy", "Product Design", "Business Intelligence"],
                        year: "2024"
                    },
                    {
                        title: "Global Expansion Initiative",
                        category: "Business Growth",
                        description: "Spearheading Orvox AI's expansion into international markets with strategic partnerships.",
                        status: "ongoing",
                        technologies: ["Market Analysis", "Partnership Development"],
                        year: "2025"
                    }
                ]
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
                slug: "musaddaq-abbas",
                image: "/team/musaddaq.jpeg",
                skills: ["Python", "Django", "Django Rest Framework", "Github", "GitLab", "Bitbucket", "Node.js", "AWS", "SaaS"],
                icon: Code2,
                color: "text-cyan-400",
                bio: "Expert in building scalable web applications and system foundations. With years of experience in full-stack development, Musaddaq specializes in creating robust backend systems and cloud infrastructure.",
                projects: [
                    {
                        title: "Campaign Automation",
                        category: "SaaS Platform",
                        description: "Developed a comprehensive campaign automation platform enabling businesses to manage multi-channel marketing campaigns efficiently.",
                        status: "featured",
                        technologies: ["Django", "Python", "AWS", "PostgreSQL"],
                        year: "2024"
                    },
                    {
                        title: "Pronto Mobile",
                        category: "Mobile Backend",
                        description: "Built scalable backend infrastructure for a real-time mobile communication platform.",
                        status: "completed",
                        technologies: ["Node.js", "MongoDB", "WebSocket"],
                        year: "2023"
                    },
                    {
                        title: "Solivox",
                        category: "Voice Technology",
                        description: "Developed voice-powered communication solutions with advanced NLP capabilities.",
                        status: "ongoing",
                        technologies: ["Python", "Django Rest Framework", "AWS Lambda"],
                        year: "2025"
                    }
                ]
            },
            {
                name: "Abdullah Aftab",
                role: "Senior AI Engineer",
                slug: "abdullah-aftab",
                image: "/team/Abdullah.JPG",
                skills: ["Python", "JavaScript", "TensorFlow", "PyTorch", "Scikit-learn", "spaCy", "n8n", "SQL", "MongoDB", "PostgreSQL", "AWS", "Docker", "Digital Ocean", "BeautifulSoup", "Scrapy", "Selenium"],
                icon: Code2,
                color: "text-cyan-400",
                bio: "A dedicated and results-driven AI Engineer with over 1.5 years of hands-on experience in developing cutting-edge AI agents, implementing Retrieval-Augmented Generation (RAG) techniques, and optimizing intelligent workflows using tools like n8n. My expertise spans across AI model development, training, and deploying automation systems, as well as web scraping for data extraction and analysis. I am passionate about pushing the boundaries of AI and automation, continually improving model performance, and creating scalable solutions to solve complex challenges.",
                projects: [
                    {
                        title: "Campaign Automation AI",
                        category: "AI Automation",
                        description: "Implemented intelligent automation systems using RAG techniques and AI agents for campaign optimization.",
                        status: "featured",
                        technologies: ["Python", "TensorFlow", "n8n", "MongoDB"],
                        year: "2024"
                    },
                    {
                        title: "Pronto Mobile Intelligence",
                        category: "Machine Learning",
                        description: "Developed ML models for user behavior prediction and personalized content delivery.",
                        status: "completed",
                        technologies: ["PyTorch", "Scikit-learn", "AWS"],
                        year: "2023"
                    },
                    {
                        title: "Solivox NLP Engine",
                        category: "Natural Language Processing",
                        description: "Building advanced NLP capabilities using spaCy and custom models for voice processing.",
                        status: "ongoing",
                        technologies: ["spaCy", "Python", "Docker"],
                        year: "2025"
                    },
                    {
                        title: "Web Intelligence Scraper",
                        category: "Data Engineering",
                        description: "Created robust web scraping systems for large-scale data extraction and analysis.",
                        status: "featured",
                        technologies: ["Scrapy", "BeautifulSoup", "Selenium", "PostgreSQL"],
                        year: "2024"
                    }
                ]
            },
            {
                name: "Zaryab Anwar",
                role: "Senior Full Stack Engineer",
                slug: "zaryab-anwar",
                image: "/team/Zaryab.jpeg",
                skills: ["React.js", "Next.js", "Django", "Node.js", "NestJS", "Flask", "FastAPI", "AI/ML/DL", "RAG/AGENTS", "MICROSERVICES", "Express.js", "Kafka", "Redis", "RabbitMQ", "Kubernetes"],
                icon: Code2,
                color: "text-cyan-400",
                bio: "A Senior Full-Stack Engineer and AI Systems Architect with over 5 years of professional experience building highly scalable, distributed, and intelligent applications. I specialize in combining modern full-stack development with advanced AI/ML/DL, RAG pipelines, and Agentic AI systems to deliver end-to-end solutions that are fast, reliable, and production-ready. My expertise spans frontend engineering with React and Next.js, backend development with Node.js, NestJS, and microservice-driven architectures, and event-driven pipelines powered by Kafka, Redis, RabbitMQ, and Celery.",
                projects: [
                    {
                        title: "Client Dashboard V2",
                        category: "Full Stack",
                        description: "Architected and developed a comprehensive client dashboard with real-time analytics, microservices architecture, and AI-powered insights.",
                        status: "featured",
                        technologies: ["Next.js", "NestJS", "Kubernetes", "Redis", "PostgreSQL"],
                        year: "2024"
                    },
                    {
                        title: "AI Agent Platform",
                        category: "AI Systems",
                        description: "Building multi-agent automation systems with RAG pipelines and LLM integration.",
                        status: "ongoing",
                        technologies: ["FastAPI", "LangChain", "Vector DB", "Kafka"],
                        year: "2025"
                    },
                    {
                        title: "Microservices Infrastructure",
                        category: "DevOps",
                        description: "Designed cloud-native microservices architecture with event-driven patterns and automated deployment.",
                        status: "featured",
                        technologies: ["Docker", "Kubernetes", "AWS", "RabbitMQ"],
                        year: "2024"
                    }
                ]
            },
            {
                name: "Sufyan",
                role: "Senior Full Stack Engineer",
                slug: "sufyan",
                image: "/team/Sufiyan.png",
                skills: ["React.js", "Next.js", "Django", "Node.js", "NestJS", "Flask", "FastAPI", "AI/ML/DL", "RAG/AGENTS", "MICROSERVICES", "Express.js"],
                icon: Code2,
                color: "text-cyan-400",
                bio: "A Senior Full-Stack Engineer and AI Systems Architect with over 5 years of professional experience building highly scalable, distributed, and intelligent applications. I specialize in combining modern full-stack development with advanced AI/ML/DL, RAG pipelines, and Agentic AI systems to deliver end-to-end solutions that are fast, reliable, and production-ready.",
                projects: [
                    {
                        title: "Enterprise SaaS Platform",
                        category: "Full Stack",
                        description: "Developed enterprise-grade SaaS solution with advanced authentication, billing, and multi-tenancy.",
                        status: "featured",
                        technologies: ["Next.js", "NestJS", "PostgreSQL", "Redis"],
                        year: "2024"
                    },
                    {
                        title: "AI-Powered Analytics",
                        category: "AI/ML",
                        description: "Built intelligent analytics platform with machine learning insights and predictive modeling.",
                        status: "ongoing",
                        technologies: ["Python", "FastAPI", "TensorFlow", "React"],
                        year: "2025"
                    }
                ]
            },
            {
                name: "Haroon Sajid",
                role: "AI Engineer",
                slug: "haroon-sajid",
                image: "/team/Haroon.jpg",
                skills: ["Python", "Django", "FastAPI", "React", "AI/ML", "RAG Agent", "n8n automations", "Node.js", "MICROSERVICES", "Express.js", "PostgreSQL", "MongoDB", "LangChain"],
                icon: Code2,
                color: "text-cyan-400",
                bio: "AI graduate with one year of experience in Python, machine learning, and backend development. Skilled in FastAPI, Django, React, and modern AI tools like LangChain and LangGraph. Specializes in backend systems, automation workflows, and building complete AI pipelines.",
                projects: [
                    {
                        title: "Scalable Infrastructure",
                        category: "Backend",
                        description: "Designed and implemented scalable backend infrastructure with microservices architecture.",
                        status: "featured",
                        technologies: ["FastAPI", "PostgreSQL", "Docker", "Redis"],
                        year: "2024"
                    },
                    {
                        title: "AI Workflow Automation",
                        category: "AI/Automation",
                        description: "Created automated AI workflows using LangChain and n8n for business process optimization.",
                        status: "ongoing",
                        technologies: ["LangChain", "n8n", "Python", "MongoDB"],
                        year: "2025"
                    },
                    {
                        title: "RAG Agent System",
                        category: "AI",
                        description: "Developed Retrieval-Augmented Generation system for intelligent document processing.",
                        status: "ongoing",
                        technologies: ["LangGraph", "FastAPI", "Vector DB"],
                        year: "2025"
                    }
                ]
            },
            {
                name: "Muhammad Hamza Sajid",
                role: "Software Engineer",
                slug: "hamza-sajid",
                image: "/team/Hamza.jpeg",
                skills: ["Python", "JavaScript", "Node.js", "NestJS", "Django", "Angular", "React", "Pandas", "NumPy", "MongoDB", "PostgreSQL", "AWS", "Docker", "Git", "BeautifulSoup", "Scrapy", "Selenium"],
                icon: Code2,
                color: "text-cyan-400",
                bio: "A software engineer with experience in Python, JavaScript, and modern web frameworks. Specialized in building scalable, secure, and efficient software solutions with a focus on data processing and automation.",
                projects: [
                    {
                        title: "HomeEnergy",
                        category: "IoT Platform",
                        description: "Developed energy monitoring and management platform for smart homes with real-time analytics.",
                        status: "featured",
                        technologies: ["NestJS", "Angular", "MongoDB", "AWS IoT"],
                        year: "2024"
                    },
                    {
                        title: "IoT Data Migrations",
                        category: "Data Engineering",
                        description: "Implemented large-scale data migration system for IoT devices with zero downtime.",
                        status: "completed",
                        technologies: ["Python", "Pandas", "PostgreSQL", "Docker"],
                        year: "2023"
                    },
                    {
                        title: "Bailey Time Series",
                        category: "Data Analytics",
                        description: "Built time series analysis platform for financial data with predictive capabilities.",
                        status: "ongoing",
                        technologies: ["Python", "NumPy", "React", "MongoDB"],
                        year: "2025"
                    }
                ]
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
                slug: "muhammad-sajid",
                image: "/team/Sajid.png",
                skills: ["Growth Strategy", "Client Acquisition", "Software Quality Assurance", "CRM Management"],
                icon: Briefcase,
                color: "text-emerald-400",
                bio: "Business Development Executive at OrvoxAI, focusing on identifying growth opportunities, managing client acquisition through digital platforms, and fostering long-term partnerships. With a strong foundation in Software Quality Assurance, I bring a unique perspective to understanding client needs and delivering tailored solutions.",
                projects: [
                    {
                        title: "Global Client Acquisition",
                        category: "Business Development",
                        description: "Leading client acquisition initiatives across multiple digital platforms, securing partnerships with enterprise clients.",
                        status: "featured",
                        technologies: ["CRM", "Sales Strategy", "Client Relations"],
                        year: "2024"
                    },
                    {
                        title: "Partnership Development Program",
                        category: "Strategic Partnerships",
                        description: "Developing strategic partnerships with technology companies to expand service offerings.",
                        status: "ongoing",
                        technologies: ["Business Strategy", "Networking"],
                        year: "2025"
                    }
                ]
            },
            {
                name: "Fiza Sardar",
                role: "Senior Sales Executive",
                slug: "fiza-sardar",
                image: "/team/Fiza.jpeg",
                skills: ["Business Development", "Lead Generation", "Strategic Planning", "LinkedIn Optimization", "B2B Sales", "Upwork", "Client Relationship Management", "Team Management"],
                icon: Briefcase,
                color: "text-emerald-400",
                bio: "Business Developer Lead with extensive experience in lead generation, strategic planning, and B2B sales. With over 6.7k followers on LinkedIn and expertise in profile optimization, I specialize in expanding market presence and managing key client relationships.",
                projects: [
                    {
                        title: "North America Market Expansion",
                        category: "Market Growth",
                        description: "Leading market expansion initiatives in North America, establishing key partnerships and client relationships.",
                        status: "featured",
                        technologies: ["B2B Sales", "Market Analysis", "LinkedIn"],
                        year: "2024"
                    },
                    {
                        title: "Upwork Growth Strategy",
                        category: "Digital Sales",
                        description: "Developing and executing growth strategies on Upwork platform to increase client acquisition.",
                        status: "ongoing",
                        technologies: ["Upwork", "Client Relations", "Proposal Writing"],
                        year: "2025"
                    },
                    {
                        title: "LinkedIn Lead Generation",
                        category: "Digital Marketing",
                        description: "Creating and managing high-impact LinkedIn campaigns for B2B lead generation.",
                        status: "featured",
                        technologies: ["LinkedIn", "Content Strategy", "Lead Generation"],
                        year: "2024"
                    }
                ]
            },
            {
                name: "Anum",
                role: "Business Analyst",
                slug: "anum",
                image: "/team/anum.jpeg",
                skills: ["Business Development", "Email Marketing", "B2B Sales", "Client Relationship Management", "LinkedIn Expert", "Meeting Coordination", "Team Management"],
                icon: Briefcase,
                color: "text-emerald-400",
                bio: "Business Developer with experience in email marketing, B2B sales, and client relationship management. Specialized in LinkedIn expertise, meeting coordination, and managing client relationships to drive business growth.",
                projects: [
                    {
                        title: "Growth Strategy 2026",
                        category: "Strategic Planning",
                        description: "Developing comprehensive growth strategy for 2026 with focus on market expansion and client retention.",
                        status: "ongoing",
                        technologies: ["Business Analysis", "Market Research", "CRM"],
                        year: "2025"
                    },
                    {
                        title: "Email Marketing Automation",
                        category: "Digital Marketing",
                        description: "Implemented automated email marketing campaigns with high conversion rates.",
                        status: "featured",
                        technologies: ["Email Marketing", "Marketing Automation", "Analytics"],
                        year: "2024"
                    },
                    {
                        title: "Client Success Program",
                        category: "Client Relations",
                        description: "Established client success program to improve retention and satisfaction rates.",
                        status: "ongoing",
                        technologies: ["Client Management", "Customer Success"],
                        year: "2025"
                    }
                ]
            },
        ]
    }
];

// Helper function to get all projects across all team members
export const getAllProjects = (): (Project & { memberName: string; memberRole: string; memberSlug: string; allMembers?: { name: string; role: string; slug: string }[] })[] => {
    const allProjects: (Project & { memberName: string; memberRole: string; memberSlug: string; allMembers?: { name: string; role: string; slug: string }[] })[] = [];
    const projectMap = new Map<string, any>();
    
    teamGroups.forEach(group => {
        group.members.forEach(member => {
            member.projects.forEach(project => {
                const projectKey = `${project.title}-${project.category}`;
                
                if (!projectMap.has(projectKey)) {
                    projectMap.set(projectKey, {
                        ...project,
                        memberName: member.name,
                        memberRole: member.role,
                        memberSlug: member.slug,
                        allMembers: [{ name: member.name, role: member.role, slug: member.slug }]
                    });
                } else {
                    // Project already exists, add this member to allMembers
                    const existingProject = projectMap.get(projectKey);
                    const memberExists = existingProject.allMembers.some((m: any) => m.slug === member.slug);
                    if (!memberExists) {
                        existingProject.allMembers.push({ name: member.name, role: member.role, slug: member.slug });
                    }
                }
            });
        });
    });
    
    return Array.from(projectMap.values());
};

// Helper function to get team member by slug
export const getTeamMemberBySlug = (slug: string): TeamMember | undefined => {
    for (const group of teamGroups) {
        const member = group.members.find(m => m.slug === slug);
        if (member) return member;
    }
    return undefined;
};

// Helper function to get all team members
export const getAllTeamMembers = (): TeamMember[] => {
    return teamGroups.flatMap(group => group.members);
};

