"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                    ORVOX<span className="text-cyan-400">AI</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                    {[
                        { name: "About", path: "/about-us" },
                        { name: "Services", path: "/services" },
                        { name: "Portfolio", path: "/portfolio" },
                        { name: "Projects", path: "/key-projects" },
                        { name: "Stories", path: "/testimonials" },
                        { name: "Contact", path: "/contact-us" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-widest relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="/pricing"
                        className="px-6 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-cyan-400 transition-colors"
                    >
                        PRICING
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="md:hidden text-white">
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-8 flex flex-col gap-6 md:hidden">
                        {[
                            { name: "About", path: "/about-us" },
                            { name: "Services", path: "/services" },
                            { name: "Portfolio", path: "/portfolio" },
                            { name: "Projects", path: "/key-projects" },
                            { name: "Testimonials", path: "/testimonials" },
                            { name: "Pricing", path: "/pricing" },
                            { name: "Contact", path: "/contact-us" },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="text-xl font-bold text-white hover:text-cyan-400 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
