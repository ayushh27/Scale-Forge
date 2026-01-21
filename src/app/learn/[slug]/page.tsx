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
    GitPullRequest
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HUB_REGISTRY } from '@/data/hubs';
import { Zap } from 'lucide-react';

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

    const [note, setNote] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobileNotesOpen, setIsMobileNotesOpen] = useState(false);
    const [activeHeading, setActiveHeading] = useState("");
    const headingsRef = useRef<{ id: string; text: string }[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth > 1280) {
            setIsSidebarOpen(true);
        }
    }, []);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        if (article) {
            addToHistory(article.slug);
            setNote(stats.notes[article.slug] || "");

            // Parse headings for TOC
            const lines = article.content?.split('\n') || [];
            const extractedHeadings = lines
                .filter(line => line.startsWith('## '))
                .map(line => {
                    const text = line.replace('## ', '');
                    const id = text.toLowerCase().replace(/\s+/g, '-');
                    return { id, text };
                });
            headingsRef.current = extractedHeadings;
        }
    }, [article?.slug]);

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

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex gap-12 relative">
                {/* Desktop Toggle Sidebar Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="hidden xl:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full glass-morphism border border-white/10 text-muted-foreground hover:text-primary transition-all shadow-2xl"
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
                            className="xl:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
                        />
                    )}
                </AnimatePresence>

                {/* Sidebar Left: Topic Navigation */}
                <AnimatePresence initial={false}>
                    {isSidebarOpen && (
                        <motion.aside
                            initial={{ width: 0, opacity: 0, x: -20 }}
                            animate={{ width: "280px", opacity: 1, x: 0 }}
                            exit={{ width: 0, opacity: 0, x: -20 }}
                            className={cn(
                                "shrink-0 space-y-8 sticky top-32 h-[calc(100vh-160px)] z-[110]",
                                "xl:block", // Desktop
                                "fixed left-0 top-0 bottom-0 bg-background border-r border-white/10 p-8 xl:static xl:bg-transparent xl:border-none xl:p-0", // Mobile overlay
                                !isSidebarOpen && "hidden xl:block"
                            )}
                        >
                            <div className="xl:hidden flex items-center justify-between mb-8">
                                <span className="font-black text-xs uppercase tracking-widest text-primary">Reference ToC</span>
                                <button onClick={() => setIsSidebarOpen(false)}><ArrowRight className="w-5 h-5 rotate-180" /></button>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 px-1 text-primary">
                                    <ListTree className="w-4 h-4" />
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Table of Contents</h4>
                                </div>
                                <div className="flex flex-col gap-1 border-l border-white/5">
                                    <button
                                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                        className={cn(
                                            "text-xs font-bold pl-4 py-2 text-left border-l-2 transition-all",
                                            !activeHeading ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"
                                        )}
                                    >
                                        Overview
                                    </button>
                                    {headingsRef.current.map((h) => (
                                        <button
                                            key={h.id}
                                            onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })}
                                            className={cn(
                                                "text-xs font-bold pl-4 py-2 text-left border-l-2 transition-all",
                                                activeHeading === h.id ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"
                                            )}
                                        >
                                            {h.text}
                                        </button>
                                    ))}
                                </div>
                            </div>

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

                                    <button
                                        onClick={() => markComplete(article.slug)}
                                        disabled={isCompleted(article.slug)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border",
                                            isCompleted(article.slug)
                                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                                                : "bg-primary text-background border-transparent hover:scale-[1.02] shadow-xl shadow-primary/20"
                                        )}
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        {isCompleted(article.slug) ? "Completed" : "Complete Topic"}
                                    </button>
                                </div>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <motion.main
                    layout
                    className="flex-1 min-w-0 space-y-24 md:space-y-32"
                >
                    {/* Article Header */}
                    <section className="space-y-8">
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
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/30 border border-white/5 text-muted-foreground text-[9px] font-black uppercase tracking-widest">
                                    v{article.version}
                                </div>
                            )}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-5xl lg:text-8xl font-black tracking-tighter leading-[0.9] max-w-4xl"
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
                                        {article.prerequisites.map(p => (
                                            <span key={p} className="px-4 py-2 rounded-xl bg-background/50 border border-white/5 text-[11px] font-bold text-muted-foreground hover:border-primary/20 transition-colors">
                                                {p}
                                            </span>
                                        ))}
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
                                className="group relative overflow-hidden p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-muted/20 border border-white/5 hover:border-primary/20 transition-all shadow-2xl"
                            >
                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
                                    <div className="space-y-4 md:space-y-6">
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
                                        className="shrink-0 h-16 md:h-20 px-8 md:px-10 bg-primary text-background rounded-2xl md:rounded-3xl font-black uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20"
                                    >
                                        Continue Journey <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                    </Link>
                                </div>
                                {/* Decorative background depth */}
                                <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 blur-[120px] rounded-full group-hover:bg-primary/10 transition-all duration-700" />
                            </motion.div>
                        )}
                    </div>
                </motion.main>

                {/* Right Sidebar: Utility Tools */}
                <aside className="hidden lg:block lg:col-span-3 space-y-12 sticky top-32 h-fit">
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
                    onClick={() => markComplete(article.slug)}
                    className="flex-1 h-14 bg-primary text-background rounded-2xl font-black uppercase tracking-[0.1em] text-[10px] shadow-4xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                    <CheckCircle className="w-5 h-5" />
                    <span className="truncate">
                        {isCompleted(article.slug) ? "Done" : "Complete"}
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
        </div>
    );
}
