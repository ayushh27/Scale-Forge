"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Github, Server, Database, Zap, Shield, GitBranch, Globe, Cpu, Hash, Layers } from "lucide-react";
import ThreeHero from "@/components/ThreeHero";

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <ThreeHero />

            <main className="container mx-auto px-6 relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 md:pt-48 md:pb-32 text-center max-w-5xl mx-auto perspective-2000">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="preserve-3d"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-morphism border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-12 animate-float-3d">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            Engineering Blueprint v1.0.4
                        </div>

                        <h1 className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] select-none">
                            Forge Your <br />
                            <span className="text-primary italic">Sovereign Architecture</span>
                        </h1>

                        <p className="text-lg md:text-3xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed font-medium px-4">
                            The definitive knowledge base for building high-scale,
                            <span className="text-foreground"> fault-tolerant</span> systems and mastering professional software design.
                        </p>

                        {/* Search Box */}
                        <div className="relative max-w-3xl mx-auto mb-20 preserve-3d">
                            <div className="absolute inset-x-0 -bottom-10 h-20 bg-primary/10 blur-[100px] -z-10" />
                            <div className="relative group">
                                <Search className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 h-8 text-muted-foreground group-focus-within:text-primary group-focus-within:scale-110 transition-all" />
                                <input
                                    type="text"
                                    placeholder="Architect a Distributed DFS..."
                                    className="w-full pl-16 md:pl-24 pr-12 py-6 md:py-10 glass-morphism border border-white/10 rounded-[2rem] md:rounded-[3rem] text-lg md:text-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all font-black placeholder:text-muted-foreground/30"
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex gap-2">
                                    <kbd className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-muted-foreground uppercase">Ctrl</kbd>
                                    <kbd className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-muted-foreground uppercase">K</kbd>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 px-6">
                            <Link href="/learn" className="w-full sm:w-auto px-10 md:px-14 py-5 md:py-7 bg-primary text-background rounded-2xl md:rounded-[2rem] font-black text-xs uppercase tracking-widest hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group shadow-2xl text-center">
                                Start Knowledge Hunt <ArrowRight className="w-5 h-5 md:w-6 h-6 group-hover:translate-x-3 transition-transform" />
                            </Link>
                            <Link href="/contribute" className="w-full sm:w-auto px-10 md:px-14 py-5 md:py-7 glass-morphism border border-white/10 rounded-2xl md:rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-white/5 hover:translate-y-[-4px] active:scale-95 transition-all flex items-center justify-center gap-4 group text-center">
                                <Github className="w-5 h-5 md:w-6 h-6 group-hover:rotate-12 transition-transform" /> Contribute
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* Domains Section */}
                <section className="py-32 relative perspective-2000">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-24">
                        <div className="max-w-3xl">
                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-none">Core Engineering <br className="sm:hidden" /><span className="text-primary italic">Domains</span></h2>
                            <p className="text-lg md:text-2xl text-muted-foreground font-medium max-w-2xl">Structured paths from fundamental algorithms to planetary-scale architecture.</p>
                        </div>
                        <div className="h-px bg-white/5 flex-grow mb-4 hidden md:block mx-12" />
                        <div className="flex items-center gap-3 text-muted-foreground font-black uppercase text-[10px] tracking-widest mb-4">
                            <Layers className="w-4 h-4" /> 4 Critical Pillars
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {TOPICS.map((topic, i) => (
                            <motion.div
                                key={topic.title}
                                initial={{ opacity: 0, rotateY: 20, translateZ: -100 }}
                                whileInView={{ opacity: 1, rotateY: 0, translateZ: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                whileHover={{ y: -20, rotateX: 2, scale: 1.02, translateZ: 20 }}
                                className="group p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] glass-morphism border border-white/5 hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden preserve-3d shadow-3xl"
                            >
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
                                <div className="relative z-10 flex flex-col h-full preserve-3d">
                                    <div className="w-16 h-16 md:w-20 md:h-20 glass-morphism rounded-2xl md:rounded-3xl flex items-center justify-center text-primary mb-8 md:mb-12 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-2xl border border-primary/20">
                                        <topic.icon className="w-8 h-8 md:w-10 md:h-10" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight tracking-tight group-hover:text-primary transition-colors">{topic.title}</h3>
                                    <p className="text-muted-foreground text-lg font-medium leading-relaxed mb-12 flex-grow overflow-hidden line-clamp-3">
                                        {topic.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Mastery</span>
                                            <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">{topic.status}</span>
                                        </div>
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl glass-morphism flex items-center justify-center group-hover:bg-primary group-hover:text-background group-hover:scale-110 transition-all shadow-3xl border border-white/10">
                                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

const TOPICS = [
    {
        title: 'DSA Mastery',
        description: 'B-Trees, Tries, Dynamic Programming, and Graph algorithms.',
        icon: Hash,
        status: 'Interview Ready'
    },
    {
        title: 'System Design',
        description: 'High-level architecture for URL shorteners, Chat systems, and CDNs.',
        icon: Server,
        status: 'Senior Level'
    },
    {
        title: 'Distributed Systems',
        description: 'Consensus algorithms, Raft, Paxos, and Eventual Consistency.',
        icon: Layers,
        status: 'Production Scale'
    },
    {
        title: 'Cloud & DevOps',
        description: 'Docker internals, K8s strategies, and High-Availability CI/CD.',
        icon: Cpu,
        status: 'Industry Standard'
    }
];
