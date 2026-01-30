"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useArticle, useArticles } from '@/hooks/useArticles';
import { useUserStats } from '@/hooks/useUserStats';
import { notFound } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    Clock,
    BarChart,
    CheckCircle,
    Bookmark,
    BookmarkCheck,
    ChevronRight,
    BookOpen,
    StickyNote,
    MessageSquare,
    ArrowRight,
    PanelLeftClose,
    PanelLeftOpen,
    ListTree,
    Shield,
    GitPullRequest,
    ChevronDown,
    Layers,
    History,
    Flame,
    Target
} from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { ArrayVisualizer } from '@/components/visualizers/ArrayVisualizer';
import { ArticleDiscussion } from '@/components/ArticleDiscussion';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HUB_REGISTRY } from '@/data/hubs';
import { Zap } from 'lucide-react';
import { useTopicProgress, useLearning } from '@/hooks/useLearningProgress';
import { TopicCompletionBar, LearningProgressSidebar, TopicBreadcrumb } from '@/components/learning';

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = React.use(params);
    const { data: article, isLoading } = useArticle(slug);
    const { data: allArticles } = useArticles();
    const {
        isCompleted,
        isBookmarked,
        markComplete,
        toggleBookmark,
        addToHistory,
        saveNote,
        stats
    } = useUserStats();

    // Learning system integration
    const { context: learningContext, markStarted, isCompleted: isLearningCompleted, markComplete: markLearningComplete } = useTopicProgress(slug);
    const { getStreak, getTotalCompleted } = useLearning();
    const streak = getStreak();
    const totalCompleted = getTotalCompleted();

    const [note, setNote] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobileNotesOpen, setIsMobileNotesOpen] = useState(false);
    const [activeHeading, setActiveHeading] = useState("");
    const [sidebarTab, setSidebarTab] = useState<'outline' | 'path' | 'progress'>('outline');
    const [currentVersion, setCurrentVersion] = useState("latest");
    const headingsRef = useRef<{ id: string; text: string }[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth > 1024) {
            setIsSidebarOpen(true);
        }
    }, []);

    // Scroll Spy for TOC
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -60% 0px' }
        );

        headingsRef.current.forEach((h) => {
            const el = document.getElementById(h.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [article?.content, headingsRef.current]);



    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Track history and parse headings - runs once per article
    useEffect(() => {
        if (article) {
            addToHistory(article.slug);

            // Track that user started reading this topic
            markStarted();

            // Parse headings for TOC
            const lines = article.content?.split('\n') || [];
            const extractedHeadings = lines
                .filter(line => line.startsWith('## '))
                .map(line => {
                    const text = line.replace('## ', '').replace(/\*\*/g, '').trim();
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return { id, text };
                });
            headingsRef.current = extractedHeadings;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [article?.slug]);

    // Initialize note from saved stats - separate effect to avoid loops
    useEffect(() => {
        if (article?.slug && stats.notes[article.slug] !== undefined) {
            setNote(stats.notes[article.slug] || "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [article?.slug, stats.notes[article?.slug ?? '']]);

    const breadcumbs = useMemo(() => {
        if (!article) return null;
        for (const hub of Object.values(HUB_REGISTRY)) {
            const phases = [hub.progression.beginner, hub.progression.intermediate, hub.progression.advanced];
            for (const phase of phases) {
                if (phase.topics.some(t => t.href.endsWith(article.slug))) {
                    return { hub, phase };
                }
            }
        }
        return null;
    }, [article]);

    const nextArticle = useMemo(() => {
        if (!article || !allArticles) return null;

        // 1. Try explicit nextSuggestedSlug
        if (article.nextSuggestedSlug) {
            const explicitNext = allArticles.find(a => a.slug === article.nextSuggestedSlug);
            if (explicitNext) return explicitNext;
        }

        // 2. Try to find in Hub progression
        for (const hubId in HUB_REGISTRY) {
            const hub = HUB_REGISTRY[hubId];
            const allHubTopics = [
                ...hub.progression.beginner.topics,
                ...hub.progression.intermediate.topics,
                ...hub.progression.advanced.topics
            ];

            const currentIndex = allHubTopics.findIndex(t => t.href.endsWith(article.slug));
            if (currentIndex !== -1 && currentIndex < allHubTopics.length - 1) {
                const nextTopic = allHubTopics[currentIndex + 1];
                const nextSlug = nextTopic.href.split('/').pop();
                const nextHubArticle = allArticles.find(a => a.slug === nextSlug);
                if (nextHubArticle) return nextHubArticle;
            }
        }

        // 3. Fallback to same category
        return allArticles.find(a => a.category === article.category && a.slug !== article.slug);
    }, [article, allArticles]);

    if (isLoading) {
        return (
            <div className="container mx-auto px-6 py-32 space-y-8 animate-pulse">
                <div className="h-12 w-2/3 bg-muted rounded-2xl" />
                <div className="h-4 w-1/3 bg-muted rounded-full" />
                <div className="grid grid-cols-12 gap-8 pt-12">
                    <div className="col-span-8 space-y-4">
                        <div className="h-64 bg-muted rounded-3xl" />
                        <div className="h-64 bg-muted rounded-3xl" />
                    </div>
                    <div className="col-span-4 h-96 bg-muted rounded-3xl" />
                </div>
            </div>
        );
    }

    if (!article) return notFound();

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 overflow-x-hidden">
            {/* Scroll Progress Indicator */}
            <motion.div
                className="fixed top-[var(--header-height)] left-0 right-0 h-1 bg-primary z-[60] origin-left"
                style={{ scaleX }}
            />

            <div className="w-full flex justify-center relative">
                <div className={cn(
                    "w-full flex gap-8 lg:gap-12 transition-all duration-300",
                    "px-4 sm:px-6 lg:px-8",
                    isSidebarOpen ? "max-w-[1800px]" : "max-w-[1400px]"
                )}>
                    {/* Desktop Toggle Sidebar Button */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full glass-morphism border border-white/10 text-muted-foreground hover:text-primary transition-all shadow-2xl"
                    >
                        {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
                    </button>

                    {/* Mobile Sidebars Control */}
                    <AnimatePresence>
                        {(isSidebarOpen || isMobileNotesOpen) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => {
                                    setIsSidebarOpen(false);
                                    setIsMobileNotesOpen(false);
                                }}
                                className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
                            />
                        )}
                    </AnimatePresence>

                    {/* Sidebar Left: Navigation & Path */}
                    {isSidebarOpen && (
                        <motion.aside
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                                "flex-shrink-0 w-[280px] space-y-6 sticky top-32 h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide flex flex-col",
                                "hidden lg:flex",
                                "lg:static lg:bg-transparent lg:border-none lg:p-0"
                            )}
                        >
                            <div className="lg:hidden flex items-center justify-between mb-8">
                                <span className="font-black text-xs uppercase tracking-widest text-primary">Navigation</span>
                                <button onClick={() => setIsSidebarOpen(false)}><ArrowRight className="w-5 h-5 rotate-180" /></button>
                            </div>

                            {/* Sidebar Tabs */}
                            <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
                                <button
                                    onClick={() => setSidebarTab('outline')}
                                    className={cn(
                                        "flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all",
                                        sidebarTab === 'outline' ? "bg-primary text-background shadow-lg" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    Outline
                                </button>
                                <button
                                    onClick={() => setSidebarTab('path')}
                                    className={cn(
                                        "flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all",
                                        sidebarTab === 'path' ? "bg-primary text-background shadow-lg" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    Path
                                </button>
                                <button
                                    onClick={() => setSidebarTab('progress')}
                                    className={cn(
                                        "flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all",
                                        sidebarTab === 'progress' ? "bg-primary text-background shadow-lg" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    Progress
                                </button>
                            </div>

                            {sidebarTab === 'outline' ? (
                                <div className="space-y-6 animate-in slide-in-from-left-4 fade-in duration-300">
                                    <div className="flex items-center gap-2 px-1 text-primary">
                                        <ListTree className="w-4 h-4" />
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">In this Article</h4>
                                    </div>
                                    <div className="flex flex-col gap-1 border-l border-white/5 relative">
                                        {/* Active Indicator Line */}
                                        <div className="absolute left-[-1px] w-[2px] bg-primary transition-all duration-300 ease-out"
                                            style={{
                                                top: activeHeading === 'overview' ? 0 : headingsRef.current.findIndex(h => h.id === activeHeading) * 32 + 32,
                                                height: 32,
                                                opacity: activeHeading ? 1 : 0
                                            }}
                                        />

                                        <button
                                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                            className={cn(
                                                "text-xs font-bold pl-4 py-2 text-left transition-all h-8 flex items-center truncate",
                                                !activeHeading || activeHeading === 'overview' ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            Overview
                                        </button>
                                        {headingsRef.current.map((h) => (
                                            <button
                                                key={h.id}
                                                onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })}
                                                className={cn(
                                                    "text-xs font-bold pl-4 py-2 text-left transition-all h-8 flex items-center truncate",
                                                    activeHeading === h.id ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
                                                )}
                                            >
                                                {h.text}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : sidebarTab === 'path' ? (
                                <div className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
                                    {Object.entries(HUB_REGISTRY).map(([hubId, hub]) => {
                                        // Only show the hub if the current article is in it
                                        const isArticleInHub = [
                                            ...hub.progression.beginner.topics,
                                            ...hub.progression.intermediate.topics,
                                            ...hub.progression.advanced.topics
                                        ].some(t => t.href.endsWith(article.slug));

                                        if (!isArticleInHub) return null;

                                        return (
                                            <div key={hubId} className="space-y-6">
                                                <div className="flex items-center gap-3 px-1 text-primary mb-4">
                                                    <hub.icon className="w-4 h-4" />
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">{hub.title}</h4>
                                                </div>

                                                {['beginner', 'intermediate', 'advanced'].map((phaseKey) => {
                                                    const phase = hub.progression[phaseKey as keyof typeof hub.progression];
                                                    const topics = phase.topics;

                                                    return (
                                                        <div key={phaseKey} className="space-y-2">
                                                            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground/50 px-2">
                                                                <div className={cn("w-1.5 h-1.5 rounded-full", phaseKey === 'beginner' ? "bg-emerald-500" : phaseKey === 'intermediate' ? "bg-amber-500" : "bg-rose-500")} />
                                                                {phase.title}
                                                            </div>
                                                            <div className="space-y-1">
                                                                {topics.map(topic => {
                                                                    const isCurrent = topic.href.endsWith(article.slug);
                                                                    const topicSlug = topic.href.split('/').pop() || "";
                                                                    const completed = isCompleted(topicSlug);

                                                                    return (
                                                                        <Link
                                                                            key={topic.label}
                                                                            href={topic.href}
                                                                            className={cn(
                                                                                "group flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all border border-transparent",
                                                                                isCurrent
                                                                                    ? "bg-primary/10 text-primary border-primary/20"
                                                                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                                                            )}
                                                                        >
                                                                            <div className={cn(
                                                                                "w-4 h-4 rounded-full flex items-center justify-center border transition-all text-[8px]",
                                                                                completed
                                                                                    ? "bg-emerald-500 border-emerald-500 text-black"
                                                                                    : isCurrent
                                                                                        ? "border-primary text-primary"
                                                                                        : "border-muted-foreground/30 text-transparent"
                                                                            )}>
                                                                                {completed && <CheckCircle className="w-3 h-3" />}
                                                                                {isCurrent && !completed && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                                                                            </div>
                                                                            <span className="truncate">{topic.label}</span>
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                                    {/* Streak Display */}
                                    <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-primary/5 border border-amber-500/20">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                                    <Flame className="w-5 h-5 text-amber-400" />
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-black">{streak.current}</div>
                                                    <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Day Streak</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-black text-primary">{totalCompleted}</div>
                                                <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Topics Done</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Learning Progress Sidebar */}
                                    <LearningProgressSidebar slug={slug} />
                                </div>
                            )}

                            <Separator className="bg-white/5" />

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Engagement</h4>
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => toggleBookmark(article.slug)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border",
                                            isBookmarked(article.slug)
                                                ? "bg-primary/10 border-primary/20 text-primary"
                                                : "bg-muted/30 border-white/5 text-muted-foreground hover:bg-white/5"
                                        )}
                                    >
                                        {isBookmarked(article.slug) ? <BookmarkCheck className="w-4 h-4 fill-primary" /> : <Bookmark className="w-4 h-4" />}
                                        Bookmarked
                                    </button>
                                </div>
                            </div>
                        </motion.aside>
                    )}

                    {/* Main Content */}
                    <motion.main
                        layout
                        className={cn(
                            "flex-1 min-w-0 space-y-16 md:space-y-24 w-full mx-auto",
                            !isSidebarOpen && "max-w-4xl"
                        )}
                    >
                        {/* Article Header */}
                        <section className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                            >
                                <Link href="/" className="hover:text-primary transition-colors">Forge</Link>
                                <ChevronRight className="w-3 h-3 text-white/20" />
                                <Link href="/learn" className="hover:text-primary transition-colors">Exploration</Link>
                                {breadcumbs && (
                                    <>
                                        <ChevronRight className="w-3 h-3 text-white/20" />
                                        <Link href={`/hub/${breadcumbs.hub.id}`} className="hover:text-primary transition-colors text-primary underline decoration-primary/30 underline-offset-4">{breadcumbs.hub.title}</Link>
                                        <ChevronRight className="w-3 h-3 text-white/20" />
                                        <span className="text-foreground">{breadcumbs.phase.title.split(':')[0]}</span>
                                    </>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-wrap items-center gap-4"
                            >
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                                    <Link href={`/learn?cat=${article.category}`} className="hover:text-foreground transition-colors">{article.category}</Link>
                                    <ChevronRight className="w-3 h-3" />
                                    <span className="text-muted-foreground">Article Reference</span>
                                </div>

                                {(article.category === "Case Study" || article.category === "Comparison") && (
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[9px] font-black uppercase tracking-widest">
                                        <Shield className="w-3 h-3" /> Senior Insight Hub
                                    </div>
                                )}

                                {article.difficulty === "Advanced" && (
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest">
                                        <Zap className="w-3 h-3" /> Blueprint Verified
                                    </div>
                                )}

                                {article.version && (
                                    <div className="relative group z-50">
                                        <button className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/30 border border-white/5 text-muted-foreground text-[9px] font-black uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all">
                                            <History className="w-3 h-3" />
                                            v{article.version} <span className="opacity-50">/ Latest</span>
                                            <ChevronDown className="w-3 h-3 opacity-50" />
                                        </button>

                                        {/* Mock Version Dropdown */}
                                        <div className="absolute top-full left-0 mt-2 w-48 p-2 rounded-xl bg-[#0a0a0a] border border-white/10 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground px-2 py-2">Select Version</div>
                                            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-primary/10 text-primary text-[10px] font-bold">
                                                <span>v{article.version}</span>
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow shadow-primary" />
                                            </button>
                                            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 text-muted-foreground text-[10px] font-bold transition-all">
                                                <span>v1.0.0-beta</span>
                                            </button>
                                            <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 text-muted-foreground text-[10px] font-bold transition-all">
                                                <span>v0.9.4</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] max-w-none"
                            >
                                {article.title}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap items-center gap-4 md:gap-8 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] glass-morphism border border-white/5 shadow-3xl"
                            >
                                <div className="flex items-center gap-3">
                                    <BarChart className="w-5 h-5 text-primary" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Difficulty</span>
                                        <span className={cn(
                                            "text-xs font-black uppercase tracking-wider",
                                            article.difficulty === 'Beginner' ? 'text-emerald-400' :
                                                article.difficulty === 'Intermediate' ? 'text-amber-400' : 'text-rose-400'
                                        )}>
                                            {article.difficulty}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-[1px] h-8 bg-white/5 hidden md:block" />
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Clock className="w-5 h-5" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest">Est. Time</span>
                                        <span className="text-xs font-bold text-foreground">{article.estimatedReadingTime || 12} min read</span>
                                    </div>
                                </div>
                                <div className="w-[1px] h-8 bg-white/5 hidden md:block" />
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <BookOpen className="w-5 h-5" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest">Learners</span>
                                        <span className="text-xs font-bold text-foreground">{article.viewCount.toLocaleString()} Experts</span>
                                    </div>
                                </div>
                            </motion.div>

                            {article.prerequisites && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="p-6 rounded-[1.5rem] bg-primary/5 border border-primary/10 flex items-start gap-4"
                                >
                                    <Shield className="w-6 h-6 text-primary shrink-0 mt-1" />
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Foundation Requirements</span>
                                        <div className="flex flex-wrap gap-3 mt-3">
                                            {article.prerequisites.map(p => {
                                                const prereq = allArticles?.find(a => a.id === p || a.slug === p);
                                                return (
                                                    <Link
                                                        key={p}
                                                        href={prereq ? `/learn/${prereq.slug}` : '#'}
                                                        className={cn(
                                                            "group flex items-center gap-2 px-4 py-2 rounded-xl bg-background/50 border border-white/5 text-[11px] font-bold text-muted-foreground hover:border-primary/20 hover:bg-primary/5 transition-all",
                                                            !prereq && "pointer-events-none opacity-50"
                                                        )}
                                                    >
                                                        {prereq ? (
                                                            <>
                                                                <CheckCircle className="w-3 h-3 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" />
                                                                <span className="group-hover:text-primary transition-colors">{prereq.title}</span>
                                                            </>
                                                        ) : (
                                                            <span>{p}</span>
                                                        )}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </section>

                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/2 rounded-[3rem] -z-10 blur-3xl opacity-50" />
                            <Separator className="bg-white/5" />
                        </div>

                        {/* Content Body */}
                        <motion.article
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="doc-content"
                        >
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h2: ({ node, ...props }) => {
                                        const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-');
                                        return <h2 id={id} {...props} />
                                    },
                                    code: ({ node, className, children, ...props }) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const isInline = !match;

                                        if (isInline) {
                                            return (
                                                <code className="px-1.5 py-0.5 rounded-md bg-white/10 text-primary font-mono text-sm border border-white/5" {...props}>
                                                    {children}
                                                </code>
                                            );
                                        }

                                        const lang = match ? match[1] : 'text';

                                        if (lang === 'visualizer-array') {
                                            try {
                                                const data = JSON.parse(String(children));
                                                return <ArrayVisualizer {...data} />;
                                            } catch (e) {
                                                console.error(e);
                                                return <div className="text-red-500 text-xs">Invalid Visualizer Data</div>;
                                            }
                                        }

                                        return (
                                            <CodeBlock
                                                language={lang}
                                                value={String(children).replace(/\n$/, '')}
                                            />
                                        );
                                    }
                                }}
                            >
                                {article.content || "Loading detailed analysis..."}
                            </ReactMarkdown>

                            {/* Contributor CTA */}
                            {(article.category === "Case Study" || article.category === "Comparison") && (
                                <div className="mt-20 p-10 rounded-[3rem] bg-background border border-primary/20 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-primary/[0.02] -z-10" />
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <GitPullRequest className="w-24 h-24 text-primary" />
                                    </div>
                                    <div className="relative z-10 space-y-4">
                                        <h4 className="text-2xl font-black">Have a <span className="text-primary italic">Production Insight?</span></h4>
                                        <p className="text-muted-foreground text-base max-w-xl font-medium">
                                            This {article.category.toLowerCase()} was peer-reviewed. If you've encountered similar challenges in production, help us refine the blueprint.
                                        </p>
                                        <Link
                                            href="/contribute"
                                            className="inline-flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest hover:gap-4 transition-all"
                                        >
                                            Contributor Guidelines <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Topic Completion - Learning System */}
                            <div className="mt-20">
                                <TopicCompletionBar slug={slug} />
                            </div>

                            <div className="mt-24">
                                <ArticleDiscussion />
                            </div>
                        </motion.article>

                        <div className="relative py-20 px-4 md:px-0">
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                            {/* Related Topics */}
                            {article.relatedTopics && article.relatedTopics.length > 0 && (
                                <div className="space-y-12">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary text-center">Architectural Connections</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {article.relatedTopics.map(slug => {
                                            const related = allArticles?.find(a => a.slug === slug);
                                            if (!related) return null;
                                            return (
                                                <Link
                                                    key={slug}
                                                    href={`/learn/${slug}`}
                                                    className="p-6 rounded-2xl bg-muted/10 border border-white/5 hover:border-primary/20 transition-all group"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold group-hover:text-primary transition-colors">{related.title}</span>
                                                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Next Logic Area */}
                        <div className="py-20 md:py-24">
                            {nextArticle && (
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    className="group relative overflow-hidden p-10 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] bg-muted/20 border border-white/5 hover:border-primary/20 transition-all shadow-2xl"
                                >
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-16">
                                        <div className="flex-1 min-w-0 space-y-4 md:space-y-6">
                                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                                                <ArrowRight className="w-3 h-3" /> Up Next
                                            </span>
                                            <div>
                                                <h3 className="text-2xl md:text-4xl font-black tracking-tight mb-3 group-hover:text-primary transition-colors">{nextArticle.title}</h3>
                                                <p className="text-base md:text-lg text-muted-foreground font-medium max-w-xl leading-relaxed">{nextArticle.description}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/learn/${nextArticle.slug}`}
                                            className="shrink-0 h-14 px-8 bg-primary text-background rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 whitespace-nowrap"
                                        >
                                            Continue Journey <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                    {/* Decorative background depth */}
                                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 blur-[120px] rounded-full group-hover:bg-primary/10 transition-all duration-700" />
                                </motion.div>
                            )}
                        </div>
                    </motion.main>

                    {/* Right Sidebar: Utility Tools - Only on XL screens */}
                    <aside className="hidden xl:block flex-shrink-0 w-[340px] space-y-12 sticky top-32 h-fit">
                        {/* Personal Notes Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="p-8 rounded-[2.5rem] glass-morphism shadow-3xl space-y-8"
                        >
                            <div className="flex items-center gap-3 text-foreground font-black uppercase text-[10px] tracking-widest">
                                <StickyNote className="w-5 h-5 text-primary" />
                                Study Notes
                            </div>
                            <textarea
                                value={note}
                                onChange={(e) => {
                                    setNote(e.target.value);
                                    saveNote(article.slug, e.target.value);
                                }}
                                placeholder="Synchronize your knowledge here..."
                                className="w-full h-64 bg-background/40 border border-white/5 rounded-3xl p-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/30 resize-none transition-all scrollbar-hide"
                            />
                            <div className="flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Autosave Enabled
                            </div>
                        </motion.div>

                        {/* Community Teaser */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="group p-8 rounded-[2.5rem] bg-primary/[0.03] border border-primary/10 space-y-6 hover:bg-primary/[0.05] transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3 text-primary">
                                <MessageSquare className="w-6 h-6" />
                                <span className="font-black text-sm tracking-tighter">Inner Circle Discuss</span>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                Unlock architectural discussions with senior engineers on this specific pattern.
                            </p>
                            <button className="w-full py-4 rounded-2xl bg-primary text-background text-[10px] font-black uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all">
                                Join Discussion
                            </button>
                        </motion.div>
                    </aside>
                </div>
            </div>

            {/* Mobile Actions Bar */}
            <div className="lg:hidden fixed bottom-6 left-4 right-4 z-[90] flex items-center gap-2">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(true)}
                    className="h-14 w-14 flex items-center justify-center rounded-2xl glass-morphism text-primary border border-primary/20 shadow-4xl backdrop-blur-xl shrink-0"
                >
                    <ListTree className="w-5 h-5" />
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        markComplete(article.slug);
                        markLearningComplete();
                    }}
                    className={cn(
                        "flex-1 h-14 rounded-2xl font-black uppercase tracking-[0.1em] text-[10px] shadow-4xl flex items-center justify-center gap-2 active:scale-95 transition-all",
                        isLearningCompleted
                            ? "bg-emerald-500 text-background"
                            : "bg-primary text-background"
                    )}
                >
                    <CheckCircle className="w-5 h-5" />
                    <span className="truncate">
                        {isLearningCompleted ? "Completed!" : "Complete"}
                    </span>
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileNotesOpen(true)}
                    className="h-14 w-14 flex items-center justify-center rounded-2xl glass-morphism text-muted-foreground border border-white/10 shadow-4xl backdrop-blur-xl shrink-0"
                >
                    <StickyNote className="w-5 h-5" />
                </motion.button>
            </div>

            {/* Mobile Notes Drawer */}
            <AnimatePresence>
                {isMobileNotesOpen && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="lg:hidden fixed inset-x-0 bottom-0 top-20 bg-background border-t border-white/10 z-[120] rounded-t-[3rem] p-8 flex flex-col shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3 text-primary">
                                <StickyNote className="w-5 h-5" />
                                <span className="font-black text-sm uppercase tracking-widest">Digital Scribe</span>
                            </div>
                            <button
                                onClick={() => setIsMobileNotesOpen(false)}
                                className="w-10 h-10 rounded-xl bg-muted/40 flex items-center justify-center"
                            >
                                <ChevronDown className="w-6 h-6" />
                            </button>
                        </div>
                        <textarea
                            value={note}
                            onChange={(e) => {
                                setNote(e.target.value);
                                saveNote(article.slug, e.target.value);
                            }}
                            placeholder="Draft your architectural insights..."
                            className="flex-1 w-full bg-muted/10 border border-white/5 rounded-3xl p-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                        <div className="mt-6 flex items-center gap-2 text-[10px] text-emerald-400 font-black uppercase tracking-widest">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Persistence Active
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}
