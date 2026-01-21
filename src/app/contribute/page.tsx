"use client";

import { motion } from "framer-motion";
import { GitPullRequest, MessageSquare, ShieldCheck, Zap, BookOpen, Users, Cpu } from "lucide-react";
import Link from "next/link";

export default function ContributePage() {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-background overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] -z-10 rounded-full" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] -z-10 rounded-full" />

            <main className="container mx-auto px-6 max-w-6xl">
                <header className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-morphism border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-8"
                    >
                        <Zap className="w-3 h-3" /> Join the Elite
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none"
                    >
                        Engineer the <br />
                        <span className="text-primary italic">Next Blueprint</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed"
                    >
                        ScaleForge isn't just a doc site. It's an engineering corpus built on senior-level intuition and production reality. Help us scale knowledge.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {GOALS.map((goal, i) => (
                        <motion.div
                            key={goal.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[2.5rem] glass-morphism border border-white/5 relative group hover:border-primary/20 transition-all"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                                <goal.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight">{goal.title}</h3>
                            <p className="text-muted-foreground font-medium leading-relaxed">{goal.description}</p>
                        </motion.div>
                    ))}
                </div>

                <section className="mb-24">
                    <div className="flex items-center gap-6 mb-12">
                        <h2 className="text-4xl font-black tracking-tight">The <span className="text-primary italic">Senior Mental Model</span></h2>
                        <div className="h-px bg-white/10 flex-grow" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <h3 className="text-xl font-bold text-primary uppercase tracking-widest flex items-center gap-3">
                                <Cpu className="w-5 h-5" /> Contribution Pillars
                            </h3>
                            {PILLARS.map((pillar, i) => (
                                <motion.div
                                    key={pillar.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 items-start"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 font-black text-xs">
                                        0{i + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-lg mb-2">{pillar.title}</h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{pillar.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-12 rounded-[3.5rem] bg-primary/5 border border-primary/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8">
                                <ShieldCheck className="w-12 h-12 text-primary/20" />
                            </div>
                            <h3 className="text-3xl font-black mb-8 tracking-tighter">Content <span className="text-primary">Moderation Flow</span></h3>
                            <div className="space-y-6">
                                {STEPS.map((step, i) => (
                                    <div key={step} className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span className="font-bold text-muted-foreground">{step}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12">
                                <Link
                                    href="/contribute/start"
                                    className="px-10 py-5 bg-primary text-background rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3"
                                >
                                    Submit Blueprint <GitPullRequest className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

const GOALS = [
    {
        title: "Deep Technical Logic",
        description: "We don't just explain syntax. We explain why the GIL exists, or how Raft achieves consensus under partition.",
        icon: BookOpen
    },
    {
        title: "Community Driven",
        description: "Peer-reviewed by senior engineers and SREs to ensure production accuracy.",
        icon: Users
    },
    {
        title: "Structured Learning",
        description: "Every article is part of a larger roadmap. No more context-less fragments.",
        icon: MessageSquare
    }
];

const PILLARS = [
    {
        title: "Tradeoff Analysis",
        content: "Every technical choice has a cost. Senior engineers discuss the CAP theorem, not just the features."
    },
    {
        title: "Production Context",
        content: "How does this behave at 100k Req/s? Mention performance, observability, and failure modes."
    },
    {
        title: "Precision & Brevity",
        content: "Use precise terminology (idempotency, atomic, serialized) but keep the explanation punchy."
    }
];

const STEPS = [
    "Technical Proposal (Issue)",
    "Modular Markdown Drafting",
    "Peer Technical Review",
    "Production Simulation Check",
    "Blueprint Integration"
];
