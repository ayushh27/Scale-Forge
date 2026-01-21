"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    BookOpen,
    Github,
    Twitter,
    Linkedin,
    Mail,
    ArrowUpRight,
    MapPin,
    Cpu,
    Globe,
    Zap
} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-20 border-t border-white/5 bg-background overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] -z-10 rounded-full" />
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] -z-10 rounded-full" />

            <div className="container mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
                                <BookOpen className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-black text-xl md:text-2xl tracking-tighter">
                                ScaleForge
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-xs">
                            The definitive knowledge base for high-scale engineering. Master the blueprints of the modern web.
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { icon: Github, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Linkedin, href: "#" },
                                { icon: Mail, href: "#" }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all"
                                >
                                    <social.icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h4 className="text-xs font-black uppercase tracking-[0.25em] text-foreground flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-primary" /> Core Hubs
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { label: "DSA Mastery", href: "/hub/dsa" },
                                { label: "System Design", href: "/hub/system-design" },
                                { label: "Distributed Systems", href: "/hub/databases" },
                                { label: "DevOps & SRE", href: "/hub/devops" }
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm font-bold text-muted-foreground hover:text-primary flex items-center gap-2 group transition-colors">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary group-hover:scale-125 transition-all" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-8">
                        <h4 className="text-xs font-black uppercase tracking-[0.25em] text-foreground flex items-center gap-2">
                            <Globe className="w-4 h-4 text-primary" /> Ecosystem
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { label: "Case Studies", href: "/hub/case-studies" },
                                { label: "Tech Comparisons", href: "/hub/comparisons" },
                                { label: "Interview Forge", href: "/hub/interview-prep" },
                                { label: "Engineering Blog", href: "/learn" }
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm font-bold text-muted-foreground hover:text-primary flex items-center gap-2 group transition-colors">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary group-hover:scale-125 transition-all" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Developed By Section */}
                    <div className="space-y-8">
                        <h4 className="text-xs font-black uppercase tracking-[0.25em] text-foreground flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary" /> Architect
                        </h4>
                        <div className="p-6 rounded-3xl glass-morphism border border-primary/20 bg-primary/5 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center font-black text-background text-lg shadow-xl shadow-primary/20">
                                    AM
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-1">Developed By</span>
                                    <span className="text-base font-black tracking-tight text-foreground block">Ayush Mishra</span>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                Building the next generation of engineering blueprints.
                            </p>
                            <Link href="#" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-3 transition-all">
                                View Portfolio <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left">
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                        <span>© {currentYear} ScaleForge</span>
                        <div className="hidden xs:block w-1 h-1 rounded-full bg-white/10" />
                        <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
                        <div className="hidden xs:block w-1 h-1 rounded-full bg-white/10" />
                        <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <MapPin className="w-3 h-3 text-primary" />
                        Delhi, India
                    </div>
                </div>
            </div>
        </footer>
    );
}
