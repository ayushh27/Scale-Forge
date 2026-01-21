"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Zap, Github, Twitter, Linkedin, Coffee, Heart, Share2, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const COMMUNITY_CHANNELS = [
    {
        title: "Engineering Forums",
        description: "Discuss deep technical patterns, production post-mortems, and RFCs with senior architects.",
        icon: MessageSquare,
        color: "text-blue-400",
        count: "12,402 Members",
        cta: "Join Discussion"
    },
    {
        title: "Inner Circle Discord",
        description: "Real-time collaboration on open source blueprints and live system design mock interviews.",
        icon: Zap,
        color: "text-primary",
        count: "8,900 Online",
        cta: "Get Invite"
    },
    {
        title: "Contributor Network",
        description: "Apply to become a verified contributor and share your production insights with 50k+ readers.",
        icon: Users,
        color: "text-rose-400",
        count: "142 Verified Experts",
        cta: "Apply Now"
    }
];

export default function CommunityPage() {
    return (
        <div className="container mx-auto px-6 py-24 min-h-screen">
            <header className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-10"
                >
                    <Globe className="w-3.5 h-3.5" /> Global Engineering Network
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-10"
                >
                    Connect with the <span className="text-primary italic">Architects</span> of Tomorrow.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-muted-foreground font-medium leading-relaxed"
                >
                    ScaleForge is more than documentation. It's a sovereign network of engineers dedicated to the craft of high-scale systems. Join us in building the definitive knowledge base.
                </motion.p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                {COMMUNITY_CHANNELS.map((channel, i) => (
                    <motion.div
                        key={channel.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="group p-10 rounded-[3rem] glass-morphism border border-white/5 hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />

                        <div className="flex items-center justify-between mb-8">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-primary group-hover:scale-110 group-hover:rotate-3 transition-all">
                                <channel.icon className="w-8 h-8" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{channel.count}</span>
                        </div>

                        <h3 className="text-3xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors">{channel.title}</h3>
                        <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-10">
                            {channel.description}
                        </p>

                        <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary group-hover:gap-4 transition-all">
                            {channel.cta} <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
            </div>

            <section className="p-16 rounded-[4rem] bg-muted/20 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/[0.02] -z-10" />
                <div className="space-y-8 max-w-xl">
                    <h2 className="text-4xl font-black tracking-tight leading-none">Support the <span className="text-primary italic">Sovereign Forge.</span></h2>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                        ScaleForge is an open initiative. Help us keep the servers running and the content ad-free. Every contribution fuels the documentation of the world's most complex systems.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                            <Coffee className="w-4 h-4 text-primary" /> Buy a Coffee
                        </button>
                        <button className="px-8 py-4 rounded-2xl bg-primary text-background flex items-center gap-3 font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
                            <Heart className="w-4 h-4" /> Sponsor Project
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div className="p-8 rounded-[2.5rem] glass-morphism border border-white/5 text-center">
                            <div className="text-3xl font-black mb-1">540k</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Monthly Reads</div>
                        </div>
                        <div className="p-8 rounded-[2.5rem] glass-morphism border border-white/5 text-center">
                            <div className="text-3xl font-black mb-1">10.2k</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">GitHub Stars</div>
                        </div>
                    </div>
                    <div className="pt-8 space-y-4">
                        <div className="p-8 rounded-[2.5rem] glass-morphism border border-white/5 text-center">
                            <div className="text-3xl font-black mb-1">2.4k</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pulse Events</div>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-primary/10 border border-primary/20 text-center">
                            <Share2 className="w-6 h-6 text-primary mx-auto mb-3" />
                            <div className="text-[10px] font-black uppercase tracking-widest text-primary">Spread it</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
