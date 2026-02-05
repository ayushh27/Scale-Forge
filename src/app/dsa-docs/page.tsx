"use client";

import React, { useState } from 'react';
import { DocumentationSidebar } from '@/components/learning/DocumentationSidebar';
import { Code, Database, GitBranch, Layers, Network, Zap, BookOpen, Share2, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '@/components/markdown/CodeBlock';
import { ARRAYS_EXPANDED } from '@/data/dsa/arrays-expanded';
import { cn } from '@/lib/utils';

const DSA_SECTIONS = [
    {
        id: 'fundamentals',
        title: 'DSA Fundamentals',
        icon: BookOpen,
        topics: [
            { id: 'overview', title: 'Overview', slug: 'dsa-overview' },
            { id: 'complexity', title: 'Time & Space Complexity', slug: 'complexity-analysis' },
        ]
    },
    {
        id: 'data-structures',
        title: 'Data Structures',
        icon: Database,
        topics: [
            { id: 'arrays', title: 'Array', slug: 'arrays-complete-guide', completed: false },
            { id: 'strings', title: 'String', slug: 'strings-master' },
            { id: 'linked-list', title: 'Linked List', slug: 'linked-list' },
            { id: 'stack', title: 'Stack', slug: 'stack-queue' },
            { id: 'queue', title: 'Queue', slug: 'queue' },
            { id: 'hashing', title: 'Hashing', slug: 'hashing' },
        ]
    },
    {
        id: 'algorithms',
        title: 'Algorithms',
        icon: Zap,
        topics: [
            { id: 'recursion', title: 'Recursion', slug: 'recursion' },
            { id: 'sorting', title: 'Sorting', slug: 'sorting' },
            { id: 'searching', title: 'Searching', slug: 'searching' },
            { id: 'dp', title: 'Dynamic Programming', slug: 'dynamic-programming' },
            { id: 'greedy', title: 'Greedy', slug: 'greedy' },
        ]
    },
    {
        id: 'advanced',
        title: 'Advanced',
        icon: Network,
        topics: [
            { id: 'trees', title: 'Trees', slug: 'trees' },
            { id: 'graphs', title: 'Graphs', slug: 'graphs' },
            { id: 'trie', title: 'Trie', slug: 'trie' },
        ]
    }
];

export default function DSADocumentationPage() {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const currentSlug = 'arrays-complete-guide';

    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="max-w-[1800px] mx-auto flex">
                {/* Left Sidebar - Navigation */}
                <aside className="hidden lg:block w-[280px] border-r border-white/5 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto scrollbar-hide">
                    <div className="p-6 space-y-6">
                        {/* Header */}
                        <div className="space-y-2">
                            <h2 className="text-xs font-black uppercase tracking-widest text-primary">
                                DSA Tutorial
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Master Data Structures & Algorithms
                            </p>
                        </div>

                        {/* Navigation */}
                        <DocumentationSidebar
                            sections={DSA_SECTIONS}
                            currentSlug={currentSlug}
                        />
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0">
                    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
                        {/* Article Header */}
                        <header className="space-y-6 mb-12">
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>DSA</span>
                                <span>/</span>
                                <span>Data Structures</span>
                                <span>/</span>
                                <span className="text-foreground font-bold">Array</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tight">
                                {ARRAYS_EXPANDED.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-muted-foreground">Last Updated:</span>
                                    <span className="font-bold">{ARRAYS_EXPANDED.updatedAt}</span>
                                </div>
                                <div className="w-px h-4 bg-white/10" />
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">Difficulty:</span>
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                                        {ARRAYS_EXPANDED.difficulty}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {ARRAYS_EXPANDED.description}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 pt-4">
                                <button
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-bold",
                                        isBookmarked
                                            ? "bg-primary/10 border-primary/20 text-primary"
                                            : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                                    )}
                                >
                                    <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-primary")} />
                                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
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
                                        const id = props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
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
                                    li: ({ node, ...props }) => (
                                        <li className="text-base leading-relaxed" {...props} />
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
                                {ARRAYS_EXPANDED.content}
                            </ReactMarkdown>
                        </article>

                        {/* Navigation Footer */}
                        <footer className="mt-16 pt-8 border-t border-white/10">
                            <div className="grid grid-cols-2 gap-4">
                                <button className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all text-left group">
                                    <div className="text-xs text-muted-foreground mb-1">← Previous</div>
                                    <div className="text-sm font-bold group-hover:text-primary transition-colors">
                                        Time & Space Complexity
                                    </div>
                                </button>
                                <button className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all text-right group">
                                    <div className="text-xs text-muted-foreground mb-1">Next →</div>
                                    <div className="text-sm font-bold group-hover:text-primary transition-colors">
                                        String Data Structure
                                    </div>
                                </button>
                            </div>
                        </footer>
                    </div>
                </main>

                {/* Right Sidebar - Table of Contents (Optional) */}
                <aside className="hidden xl:block w-[240px] border-l border-white/5 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto scrollbar-hide">
                    <div className="p-6 space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                            On This Page
                        </h3>
                        <nav className="space-y-2 text-sm">
                            <a href="#introduction" className="block text-muted-foreground hover:text-primary transition-colors">
                                Introduction
                            </a>
                            <a href="#concept-deep-dive" className="block text-muted-foreground hover:text-primary transition-colors">
                                Concept Deep Dive
                            </a>
                            <a href="#time-space-analysis" className="block text-muted-foreground hover:text-primary transition-colors">
                                Time & Space Analysis
                            </a>
                            <a href="#implementation" className="block text-muted-foreground hover:text-primary transition-colors">
                                Implementation
                            </a>
                            <a href="#real-world-usage" className="block text-muted-foreground hover:text-primary transition-colors">
                                Real-World Usage
                            </a>
                            <a href="#interview-angle" className="block text-muted-foreground hover:text-primary transition-colors">
                                Interview Angle
                            </a>
                            <a href="#practice-problems" className="block text-muted-foreground hover:text-primary transition-colors">
                                Practice Problems
                            </a>
                        </nav>
                    </div>
                </aside>
            </div>
        </div>
    );
}
