"use client";

import { motion } from "framer-motion";
import { Map, Code, Server, Database, Terminal, ArrowRight, CheckCircle2, Layers } from "lucide-react";
import Link from "next/link";
import { HUB_REGISTRY } from "@/data/hubs";

const ROADMAP_METADATA = {
    dsa: {
        icon: Code,
        color: "from-emerald-400/20 to-emerald-500/10",
        highlights: ["Big O Mastery", "Memory Layout", "Recursive Patterns", "Graph Theory"]
    },
    "system-design": {
        icon: Layers,
        color: "from-blue-400/20 to-blue-500/10",
        highlights: ["Load Balancing", "Consistent Hashing", "Rate Limiting", "Global Blueprints"]
    },
    "backend": {
        icon: Server,
        color: "from-rose-400/20 to-rose-500/10",
        highlights: ["RESTful Design", "Auth & Identity", "Message Queues", "Resilience"]
    },
    "databases": {
        icon: Database,
        color: "from-amber-400/20 to-amber-500/10",
        highlights: ["Index Internals", "SQL Optimization", "NoSQL Patterns", "Replication"]
    },
    "devops": {
        icon: Terminal,
        color: "from-indigo-400/20 to-indigo-500/10",
        highlights: ["K8s Orchestration", "CI/CD Mastery", "Observability", "Cloud Native"]
    }
};

export default function RoadmapsPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-20">
            <header className="max-w-3xl mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                    <Map className="w-3 h-3" /> Engineering Paths
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-7xl font-black mb-6 tracking-tight">Industrial Roadmaps</h1>
                <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                    Stop guessing. Follow curated, step-by-step paths designed by senior engineers to take you from foundational logic to high-scale architectural mastery.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(HUB_REGISTRY).map(([id, hub], i) => {
                    const meta = ROADMAP_METADATA[id as keyof typeof ROADMAP_METADATA];
                    if (!meta) return null;

                    return (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-br ${meta.color} border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all flex flex-col`}
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />

                            <div className="flex items-start justify-between mb-8 relative z-10">
                                <div className="p-4 bg-background rounded-2xl shadow-inner border border-white/5">
                                    <meta.icon className="w-8 h-8 text-primary" />
                                </div>
                                <Link
                                    href={`/hub/${id}`}
                                    className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary hover:gap-3 transition-all"
                                >
                                    Explore Hub <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight relative z-10">{hub.title}</h3>
                            <p className="text-sm md:text-base text-muted-foreground font-medium mb-8 md:mb-10 leading-relaxed max-w-sm relative z-10">
                                {hub.description}
                            </p>

                            <div className="space-y-4 flex-grow relative z-10">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-50 mb-4">Curriculum Highlights</div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {meta.highlights.map(highlight => (
                                        <div key={highlight} className="flex items-center gap-2 text-sm font-bold text-foreground/80">
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                            {highlight}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between relative z-10">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(user => (
                                        <div key={user} className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${user + i * 10})` }} />
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-bold">+1k</div>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Level: Mixed Path</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <section className="mt-24 md:mt-32 p-10 md:p-24 rounded-[3rem] md:rounded-[4rem] bg-muted/20 border border-white/5 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/10 blur-[120px] -z-10" />
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-8 italic tracking-tighter leading-none">Architect your future.</h2>
                <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 md:mb-14 font-medium leading-relaxed">
                    Join a community of elite engineers mastering the deep tech of the industry.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                    <Link href="/learn" className="px-10 md:px-12 py-5 md:py-6 bg-primary text-background rounded-2xl md:rounded-3xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                        Begin Your Journey
                    </Link>
                </div>
            </section>
        </div>
    );
}
