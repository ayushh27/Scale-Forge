"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReading, Heading } from './ReadingProvider';
import { ListTree, ChevronRight, ChevronDown, ChevronUp, X } from 'lucide-react';

interface TableOfContentsProps {
    /**
     * Optional custom headings (otherwise uses context)
     */
    headings?: Heading[];
    /**
     * Show section numbers
     */
    showNumbers?: boolean;
    /**
     * Variant for different contexts
     */
    variant?: 'sidebar' | 'inline' | 'floating';
    /**
     * Custom className
     */
    className?: string;
    /**
     * Callback when a heading is clicked
     */
    onNavigate?: (id: string) => void;
}

/**
 * TableOfContents - Auto-syncing table of contents with scroll spy
 */
export function TableOfContents({
    headings: customHeadings,
    showNumbers = false,
    variant = 'sidebar',
    className,
    onNavigate
}: TableOfContentsProps) {
    const { headings: contextHeadings, activeHeadingId, scrollToHeading } = useReading();
    const headings = customHeadings || contextHeadings;

    const handleClick = (id: string) => {
        scrollToHeading(id);
        onNavigate?.(id);
    };

    if (headings.length === 0) {
        return null;
    }

    // Calculate active indicator position
    const activeIndex = headings.findIndex(h => h.id === activeHeadingId);

    if (variant === 'inline') {
        return (
            <div className={cn("space-y-2", className)}>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    <ListTree className="w-4 h-4 text-primary" />
                    Contents
                </div>
                <nav className="flex flex-wrap gap-2">
                    {headings.map((heading, idx) => (
                        <button
                            key={heading.id}
                            onClick={() => handleClick(heading.id)}
                            className={cn(
                                "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                                activeHeadingId === heading.id
                                    ? "bg-primary text-background"
                                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                            )}
                        >
                            {showNumbers && `${idx + 1}. `}{heading.text}
                        </button>
                    ))}
                </nav>
            </div>
        );
    }

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex items-center gap-2 px-1 text-primary">
                <ListTree className="w-4 h-4" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">In this Article</h4>
            </div>

            <nav className="flex flex-col gap-0.5 border-l border-white/10 relative">
                {/* Active Indicator */}
                <motion.div
                    className="absolute left-[-1px] w-[2px] bg-primary rounded-full"
                    initial={false}
                    animate={{
                        top: activeIndex >= 0 ? activeIndex * 36 : 0,
                        height: 36,
                        opacity: activeIndex >= 0 ? 1 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                {/* Overview link */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={cn(
                        "text-left text-xs font-bold pl-4 py-2 transition-all h-9 flex items-center truncate",
                        !activeHeadingId || activeHeadingId === 'overview'
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                >
                    {showNumbers && "0. "}Overview
                </button>

                {headings.map((heading, idx) => (
                    <button
                        key={heading.id}
                        onClick={() => handleClick(heading.id)}
                        className={cn(
                            "text-left text-xs font-bold py-2 transition-all h-9 flex items-center truncate",
                            heading.level === 2 ? "pl-4" : "pl-8",
                            activeHeadingId === heading.id
                                ? "text-primary bg-primary/5"
                                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        )}
                    >
                        {showNumbers && `${idx + 1}. `}
                        <span className="truncate">{heading.text}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}

/**
 * FloatingTOC - Floating table of contents for mobile
 */
interface FloatingTOCProps {
    className?: string;
}

export function FloatingTOC({ className }: FloatingTOCProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { headings, activeHeadingId, scrollToHeading, readingProgress } = useReading();

    const activeHeading = headings.find(h => h.id === activeHeadingId);

    const handleNavigate = (id: string) => {
        scrollToHeading(id);
        setIsOpen(false);
    };

    if (headings.length === 0) return null;

    return (
        <div className={cn("fixed bottom-24 right-4 z-[80]", className)}>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-background/60 backdrop-blur-sm"
                        />

                        {/* TOC Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="absolute bottom-16 right-0 w-72 max-h-[60vh] bg-background border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-primary">
                                    <ListTree className="w-4 h-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">Contents</span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-2 max-h-[50vh] overflow-y-auto scrollbar-hide">
                                <button
                                    onClick={() => {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2.5 text-sm font-bold rounded-lg hover:bg-white/5 transition-colors"
                                >
                                    Overview
                                </button>
                                {headings.map((heading) => (
                                    <button
                                        key={heading.id}
                                        onClick={() => handleNavigate(heading.id)}
                                        className={cn(
                                            "w-full text-left px-3 py-2.5 text-sm font-bold rounded-lg transition-all",
                                            heading.level === 3 && "pl-6",
                                            activeHeadingId === heading.id
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                        )}
                                    >
                                        {heading.text}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "relative flex items-center gap-2 px-4 py-3 rounded-2xl",
                    "bg-background border border-white/10 shadow-xl",
                    "text-xs font-bold transition-all",
                    isOpen ? "text-primary" : "text-muted-foreground"
                )}
            >
                <ListTree className="w-4 h-4" />
                <span className="max-w-[120px] truncate">
                    {activeHeading?.text || 'Contents'}
                </span>
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}

                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        style={{ width: `${readingProgress * 100}%` }}
                    />
                </div>
            </motion.button>
        </div>
    );
}

/**
 * MiniTOC - Compact inline mini table of contents
 */
interface MiniTOCProps {
    className?: string;
}

export function MiniTOC({ className }: MiniTOCProps) {
    const { headings, activeHeadingId, scrollToHeading } = useReading();

    if (headings.length === 0) return null;

    const currentIndex = headings.findIndex(h => h.id === activeHeadingId);
    const prevHeading = currentIndex > 0 ? headings[currentIndex - 1] : null;
    const nextHeading = currentIndex < headings.length - 1 ? headings[currentIndex + 1] : null;

    return (
        <div className={cn("flex items-center justify-between gap-4 p-4 bg-white/5 rounded-xl border border-white/5", className)}>
            {prevHeading ? (
                <button
                    onClick={() => scrollToHeading(prevHeading.id)}
                    className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    <span className="truncate max-w-[100px]">{prevHeading.text}</span>
                </button>
            ) : <div />}

            <div className="flex items-center gap-1">
                {headings.map((h, i) => (
                    <button
                        key={h.id}
                        onClick={() => scrollToHeading(h.id)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            activeHeadingId === h.id
                                ? "bg-primary scale-125"
                                : "bg-white/20 hover:bg-white/40"
                        )}
                    />
                ))}
            </div>

            {nextHeading ? (
                <button
                    onClick={() => scrollToHeading(nextHeading.id)}
                    className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                    <span className="truncate max-w-[100px]">{nextHeading.text}</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
            ) : <div />}
        </div>
    );
}
