// Enhanced Learn Page with Documentation Layout
// This integrates the new documentation-style sidebar with existing features

"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useArticle, useArticles } from '@/hooks/useArticles';
import { useUserStats } from '@/hooks/useUserStats';
import { notFound } from 'next/navigation';
import {
    Clock,
    BarChart,
    CheckCircle,
    Bookmark,
    BookmarkCheck,
    Share2,
    ChevronRight,
    BookOpen,
    StickyNote,
    ArrowRight,
    Menu,
    X,
} from 'lucide-react';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { ArrayVisualizer } from '@/components/visualizers/ArrayVisualizer';
import { ArticleDiscussion } from '@/components/ArticleDiscussion';
import { DocumentationSidebar } from '@/components/learning/DocumentationSidebar';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HUB_REGISTRY } from '@/data/hubs';
import { useTopicProgress, useLearning } from '@/hooks/useLearningProgress';
import { TopicCompletionBar } from '@/components/learning';
import { DSA_NAVIGATION } from '@/data/dsa';

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function EnhancedArticlePage({ params }: ArticlePageProps) {
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

    const { context: learningContext, markStarted, isCompleted: isLearningCompleted, markComplete: markLearningComplete } = useTopicProgress(slug);
    const { getStreak, getTotalCompleted } = useLearning();

    const [note, setNote] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeHeading, setActiveHeading] = useState("");
    const headingsRef = useRef<{ id: string; text: string }[]>([]);

    // Auto-open sidebar on desktop
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth > 1024) {
            setIsSidebarOpen(true);
        }
    }, []);

    // Scroll spy for TOC
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
    }, [article?.content]);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Track history and parse headings
    useEffect(() => {
        if (article) {
            addToHistory(article.slug);
            markStarted();

            // Parse headings for TOC
            const lines = article.content?.split('\n') || [];
            const extractedHeadings = lines
                .filter(line => line.startsWith('## '))
                .map(line => {
                    const text = line.replace('## ', '').replace(/\*\*/g, '').replace(/📌|🧠|⏱️|💻|🏢|🎯|📝|🔗|📚/g, '').trim();
                    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                    return { id, text };
                });
            headingsRef.current = extractedHeadings;
        }
    }, [article?.slug]);

    // Initialize note
    useEffect(() => {
        if (article?.slug && stats.notes[article.slug] !== undefined) {
            setNote(stats.notes[article.slug] || "");
        }
    }, [article?.slug, stats.notes[article?.slug ?? '']]);

    // Build navigation sections for sidebar
    const navigationSections = useMemo(() => {
        return Object.values(DSA_NAVIGATION).map(section => ({
            id: section.id,
            title: section.title,
            topics: section.topics.map(topic => ({
                ...topic,
                completed: isCompleted(topic.slug)
            }))
        }));
    }, [isCompleted]);

    const nextArticle = useMemo(() => {
        if (!article || !allArticles) return null;

        if (article.nextSuggestedSlug) {
            const explicitNext = allArticles.find(a => a.slug === article.nextSuggestedSlug);
            if (explicitNext) return explicitNext;
        }

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

        return allArticles.find(a => a.category === article.category && a.slug !== article.slug);
    }, [article, allArticles]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-muted-foreground">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!article) return notFound();

    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Scroll Progress */}
            <motion.div
                className="fixed top-[var(--header-height)] left-0 right-0 h-1 bg-primary z-[60] origin-left"
                style={{ scaleX }}
            />

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
                    />
                )}
            </AnimatePresence>

            <div className="max-w-[1800px] mx-auto flex">
                {/* Left Sidebar - Navigation */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className={cn(
                                "fixed lg:sticky top-20 left-0 w-[280px] h-[calc(100vh-5rem)] bg-background border-r border-white/5 overflow-y-auto scrollbar-hide z-[110]",
                                "lg:z-0"
                            )}
                        >
                            <div className="p-6 space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <h2 className="text-xs font-black uppercase tracking-widest text-primary">
                                            {article.category} Tutorial
                                        </h2>
                                        <p className="text-xs text-muted-foreground">
                                            Master the fundamentals
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="lg:hidden w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Navigation */}
                                <DocumentationSidebar
                                    sections={navigationSections}
                                    currentSlug={slug}
                                />
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
                        {/* Article Header */}
                        <header className="space-y-6 mb-12">
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                                <ChevronRight className="w-3 h-3" />
                                <Link href="/learn" className="hover:text-primary transition-colors">Learn</Link>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-foreground font-bold">{article.category}</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tight">
                                {article.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-muted-foreground">Last Updated:</span>
                                    <span className="font-bold">{article.updatedAt}</span>
                                </div>
                                <div className="w-px h-4 bg-white/10" />
                                <div className="flex items-center gap-2">
                                    <BarChart className="w-4 h-4 text-primary" />
                                    <span className="text-muted-foreground">Difficulty:</span>
                                    <span className={cn(
                                        "px-2 py-0.5 rounded-full text-xs font-bold",
                                        article.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                                            article.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-400' :
                                                'bg-rose-500/10 text-rose-400'
                                    )}>
                                        {article.difficulty}
                                    </span>
                                </div>
                                <div className="w-px h-4 bg-white/10" />
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{article.estimatedReadingTime || 12} min read</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {article.description}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 pt-4">
                                <button
                                    onClick={() => toggleBookmark(article.slug)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-bold",
                                        isBookmarked(article.slug)
                                            ? "bg-primary/10 border-primary/20 text-primary"
                                            : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                                    )}
                                >
                                    {isBookmarked(article.slug) ? <BookmarkCheck className="w-4 h-4 fill-primary" /> : <Bookmark className="w-4 h-4" />}
                                    {isBookmarked(article.slug) ? 'Bookmarked' : 'Bookmark'}
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 transition-all text-sm font-bold">
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </header>

                        {/* Article Content */}
                        <article className="doc-content prose prose-invert max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ node, ...props }) => (
                                        <h1 className="text-3xl font-black mt-12 mb-6 tracking-tight" {...props} />
                                    ),
                                    h2: ({ node, ...props }) => {
                                        const text = props.children?.toString() || '';
                                        const cleanText = text.replace(/📌|🧠|⏱️|💻|🏢|🎯|📝|🔗|📚/g, '').trim();
                                        const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                        return (
                                            <h2
                                                id={id}
                                                className="text-2xl font-black mt-10 mb-4 tracking-tight scroll-mt-20"
                                                {...props}
                                            />
                                        );
                                    },
                                    h3: ({ node, ...props }) => (
                                        <h3 className="text-xl font-bold mt-8 mb-3" {...props} />
                                    ),
                                    p: ({ node, ...props }) => (
                                        <p className="text-base leading-relaxed mb-4 text-muted-foreground" {...props} />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground" {...props} />
                                    ),
                                    ol: ({ node, ...props }) => (
                                        <ol className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground" {...props} />
                                    ),
                                    table: ({ node, ...props }) => (
                                        <div className="overflow-x-auto my-6">
                                            <table className="w-full border-collapse" {...props} />
                                        </div>
                                    ),
                                    thead: ({ node, ...props }) => (
                                        <thead className="bg-white/5 border-b border-white/10" {...props} />
                                    ),
                                    th: ({ node, ...props }) => (
                                        <th className="px-4 py-3 text-left text-sm font-bold text-foreground" {...props} />
                                    ),
                                    td: ({ node, ...props }) => (
                                        <td className="px-4 py-3 text-sm text-muted-foreground border-b border-white/5" {...props} />
                                    ),
                                    code: ({ node, className, children, ...props }) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const isInline = !match;

                                        if (isInline) {
                                            return (
                                                <code
                                                    className="px-1.5 py-0.5 rounded bg-white/10 text-primary font-mono text-sm border border-white/5"
                                                    {...props}
                                                >
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
                                    },
                                    blockquote: ({ node, ...props }) => (
                                        <blockquote className="border-l-4 border-primary/30 pl-4 my-6 italic text-muted-foreground" {...props} />
                                    ),
                                    hr: ({ node, ...props }) => (
                                        <hr className="my-8 border-white/10" {...props} />
                                    ),
                                }}
                            >
                                {article.content || "Loading content..."}
                            </ReactMarkdown>

                            {/* Topic Completion */}
                            <div className="mt-20">
                                <TopicCompletionBar slug={slug} />
                            </div>

                            {/* Discussion */}
                            <div className="mt-24">
                                <ArticleDiscussion />
                            </div>
                        </article>

                        {/* Navigation Footer */}
                        {nextArticle && (
                            <footer className="mt-16 pt-8 border-t border-white/10">
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all text-left group">
                                        <div className="text-xs text-muted-foreground mb-1">← Previous</div>
                                        <div className="text-sm font-bold group-hover:text-primary transition-colors truncate">
                                            Previous Topic
                                        </div>
                                    </button>
                                    <Link
                                        href={`/learn/${nextArticle.slug}`}
                                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all text-right group"
                                    >
                                        <div className="text-xs text-muted-foreground mb-1">Next →</div>
                                        <div className="text-sm font-bold group-hover:text-primary transition-colors truncate">
                                            {nextArticle.title}
                                        </div>
                                    </Link>
                                </div>
                            </footer>
                        )}
                    </div>
                </main>

                {/* Right Sidebar - Table of Contents */}
                <aside className="hidden xl:block w-[240px] border-l border-white/5 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto scrollbar-hide">
                    <div className="p-6 space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                            On This Page
                        </h3>
                        <nav className="space-y-2 text-sm">
                            {headingsRef.current.map((heading) => (
                                <button
                                    key={heading.id}
                                    onClick={() => document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })}
                                    className={cn(
                                        "block text-left transition-colors w-full truncate",
                                        activeHeading === heading.id
                                            ? "text-primary font-bold"
                                            : "text-muted-foreground hover:text-primary"
                                    )}
                                >
                                    {heading.text}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden fixed bottom-6 left-4 z-50 w-14 h-14 rounded-full bg-primary text-background flex items-center justify-center shadow-2xl"
            >
                <Menu className="w-6 h-6" />
            </button>
        </div>
    );
}
