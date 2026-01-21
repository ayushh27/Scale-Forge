"use client";

import { motion } from "framer-motion";
import { HubData } from "@/data/hubs";
import {
    CheckCircle2,
    ArrowRight,
    BookOpen,
    Crown,
    Shapes,
    Zap,
    ChevronRight,
    TrendingUp,
    Map,
    PlayCircle,
    Clock,
    Layout
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUserStats } from "@/hooks/useUserStats";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function DomainHub({ data }: { data: HubData }) {
    const { isCompleted, stats } = useUserStats();

    const colorMap = {
        emerald: "from-emerald-400/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
        blue: "from-blue-400/20 to-blue-600/5 border-blue-500/20 text-blue-400",
        amber: "from-amber-400/20 to-amber-600/5 border-amber-500/20 text-amber-400",
        rose: "from-rose-400/20 to-rose-600/5 border-rose-500/20 text-rose-400",
    }[data.color as 'emerald' | 'blue' | 'amber' | 'rose'] || "from-primary/20 to-primary/5 border-primary/20 text-primary";

    const allTopics = Object.values(data.progression).flatMap(p => p.topics);
    const completedInHub = allTopics.filter(t => t.href.startsWith('/learn/') && isCompleted(t.href.split('/').pop() || '')).length;
    const progressPercent = (completedInHub / allTopics.length) * 100;

    // Find first uncompleted topic
    const firstUncompleted = allTopics.find(t => t.href.startsWith('/learn/') && !isCompleted(t.href.split('/').pop() || ''));

    return (
        <div className="min-h-screen pb-20">
            {/* Dynamic Progress Header */}
            <div className="sticky top-[var(--header-height)] left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5 py-4">
                <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 md:gap-8">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                            <data.icon className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <span className="font-bold text-xs md:text-sm tracking-tight truncate max-w-[120px] xs:max-w-none">{data.title}</span>
                    </div>

                    <div className="flex-1 max-w-md hidden md:flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground shrink-0">{Math.round(progressPercent)}% Mastery</span>
                        <Progress value={progressPercent} className="h-1.5" />
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        {firstUncompleted ? (
                            <Link
                                href={firstUncompleted.href}
                                className="px-4 md:px-6 py-2 bg-primary text-background rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
                            >
                                <PlayCircle className="w-3 h-3 md:w-4 md:h-4" />
                                {completedInHub > 0 ? "Continue" : "Start"}
                            </Link>
                        ) : (
                            <div className="flex items-center gap-2 px-4 md:px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest">
                                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />
                                Mastered
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden perspective-2000">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] -z-10" />
                <div className={cn("absolute top-0 right-0 w-[800px] h-[800px] blur-[150px] -z-10 opacity-20 bg-gradient-to-br", colorMap)} />

                <div className="container mx-auto px-6 preserve-3d">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, rotateY: -10, translateZ: -100 }}
                            animate={{ opacity: 1, rotateY: 0, translateZ: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="lg:col-span-8 space-y-8"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 mb-4"
                            >
                                <div className="p-4 glass-morphism rounded-2xl border border-white/5 shadow-2xl animate-float-3d">
                                    <data.icon className="w-10 h-10 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest block w-fit">
                                        Engineering Hub
                                    </span>
                                    <div className="flex items-center gap-4 text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-2">
                                        <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> 12h Total Content</div>
                                        <div className="flex items-center gap-1.5"><Layout className="w-3 h-3" /> {allTopics.length} Labs</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl sm:text-7xl md:text-9xl font-black mb-8 md:mb-10 tracking-tighter leading-none"
                            >
                                {data.title.split(' ')[0]} <br className="sm:hidden" /> <span className="text-primary italic">{data.title.split(' ').slice(1).join(' ')}</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-3xl text-muted-foreground font-medium mb-8 md:mb-12 leading-relaxed max-w-3xl"
                            >
                                {data.description}
                            </motion.p>

                            <div className="flex flex-wrap gap-4">
                                {data.prerequisites.map((pre, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05, translateZ: 20 }}
                                        className="px-6 py-3 rounded-2xl glass-morphism text-sm font-bold text-muted-foreground transition-all cursor-default"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary" /> {pre}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Side Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 40, rotateY: 10 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="lg:col-span-4 space-y-6 preserve-3d"
                        >
                            <div className="p-8 rounded-[2.5rem] glass-morphism border border-white/5 space-y-8 shadow-2xl transition-transform hover:scale-[1.02] hover:rotate-x-1 duration-500">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Your Stats</h4>
                                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <div className="text-3xl font-black">{completedInHub}</div>
                                        <div className="text-[10px] font-bold uppercase text-muted-foreground">Labs done</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-3xl font-black">{Object.keys(stats.notes).filter(k => allTopics.some(t => t.href.endsWith(k))).length}</div>
                                        <div className="text-[10px] font-bold uppercase text-muted-foreground">Notes added</div>
                                    </div>
                                </div>

                                <Separator className="bg-white/5" />

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-xs font-bold">
                                        <span className="text-muted-foreground">Hub Completion</span>
                                        <span>{Math.round(progressPercent)}%</span>
                                    </div>
                                    <Progress value={progressPercent} className="h-2 bg-white/5" />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-4 bg-white/5 hover:bg-primary hover:text-background rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                                >
                                    Download Syllabus PDF
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Progression */}
            <section className="container mx-auto px-6 py-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-20 border-l-4 border-primary pl-6 md:pl-10">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest mb-4">
                            <Map className="w-4 h-4" /> Curriculum Map
                        </div>
                        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight">The Learning Path</h2>
                        <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">A structured paths from zero to senior architectural levels.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {Object.entries(data.progression).map(([level, step], idx) => {
                        const stepSlugs = step.topics.filter(t => t.href.startsWith('/learn/')).map(t => t.href.split('/').pop() || '');
                        const completedInStep = stepSlugs.filter(s => isCompleted(s)).length;
                        const stepPercent = stepSlugs.length > 0 ? (completedInStep / stepSlugs.length) * 100 : 0;

                        return (
                            <motion.div
                                key={level}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-muted/10 border border-white/5 hover:border-primary/20 transition-all flex flex-col h-full relative overflow-hidden"
                            >
                                {/* Background number */}
                                <div className="absolute top-10 right-10 text-9xl font-black text-white/[0.02] pointer-events-none select-none">
                                    0{idx + 1}
                                </div>

                                <div className="mb-10 flex items-center justify-between relative z-10">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                        {idx === 0 ? <Zap className="w-8 h-8" /> : idx === 1 ? <Shapes className="w-8 h-8" /> : <Crown className="w-8 h-8" />}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">{level}</div>
                                        <div className="text-[10px] font-bold text-muted-foreground">{completedInStep}/{stepSlugs.length} Tasks</div>
                                    </div>
                                </div>

                                <h3 className="text-3xl font-black mb-6 tracking-tight group-hover:text-primary transition-colors relative z-10">{step.title}</h3>
                                <p className="text-muted-foreground font-medium text-base leading-relaxed mb-12 flex-grow relative z-10">{step.description}</p>

                                <div className="space-y-4 relative z-10">
                                    {step.topics.map((topic, i) => {
                                        const slug = topic.href.split('/').pop() || '';
                                        const done = isCompleted(slug);

                                        return (
                                            <Link
                                                key={i}
                                                href={topic.href}
                                                className={cn(
                                                    "flex items-center justify-between p-5 rounded-2xl transition-all group/item border",
                                                    done
                                                        ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                                                        : "bg-white/5 hover:bg-primary/10 border-white/5 hover:border-primary/20"
                                                )}
                                            >
                                                <span className="text-sm font-bold flex items-center gap-4">
                                                    {done ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-primary" />}
                                                    {topic.label}
                                                </span>
                                                <ArrowRight className="w-5 h-5 opacity-0 group-hover/item:opacity-100 transition-all translate-x-[-10px] group-hover/item:translate-x-0" />
                                            </Link>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest mb-3">
                                        <span className="text-muted-foreground">Level Progression</span>
                                        <span>{Math.round(stepPercent)}%</span>
                                    </div>
                                    <Progress value={stepPercent} className="h-1 bg-white/5" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Resource Footer */}
            <section className="container mx-auto px-6 mt-20">
                <div className="p-10 md:p-20 rounded-[3rem] md:rounded-[5rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] -z-10" />
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/20 rounded-2xl md:rounded-3xl flex items-center justify-center text-primary mb-8 md:mb-10">
                        <TrendingUp className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-8 tracking-tighter">Ready to scale up?</h2>
                    <p className="text-lg md:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-14 font-medium leading-relaxed">
                        Complete all labs in this hub to earn your <span className="text-primary font-black uppercase tracking-widest text-lg">Scaleforge Master Badge</span>.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 w-full max-w-lg">
                        <button className="flex-1 px-8 md:px-10 py-4 md:py-5 bg-primary text-background rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm shadow-3xl shadow-primary/30 hover:scale-105 transition-transform">Start Mocks</button>
                        <button className="flex-1 px-8 md:px-10 py-4 md:py-5 bg-muted border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm hover:bg-white/5 transition-colors">Join Elite Community</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
