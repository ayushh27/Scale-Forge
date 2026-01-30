"use client";

import { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext, ReactNode } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';

// Types
export interface Heading {
    id: string;
    text: string;
    level: number;
}

export interface ReadingContextValue {
    // Scroll & Progress
    scrollProgress: number;
    readingProgress: number;
    estimatedTimeLeft: number;

    // Navigation
    headings: Heading[];
    activeHeadingId: string;
    scrollToHeading: (id: string) => void;

    // Reading Stats
    totalWords: number;
    estimatedReadTime: number;

    // State
    isScrolling: boolean;
    hasScrolledPast: (percentage: number) => boolean;
}

const ReadingContext = createContext<ReadingContextValue | null>(null);

export function useReading() {
    const context = useContext(ReadingContext);
    if (!context) {
        throw new Error('useReading must be used within a ReadingProvider');
    }
    return context;
}

interface ReadingProviderProps {
    children: ReactNode;
    content?: string;
    headings?: Heading[];
}

/**
 * ReadingProvider - Context provider for reading experience state
 * Manages scroll progress, active headings, and reading statistics
 */
export function ReadingProvider({ children, content = '', headings: initialHeadings = [] }: ReadingProviderProps) {
    const [headings, setHeadings] = useState<Heading[]>(initialHeadings);
    const [activeHeadingId, setActiveHeadingId] = useState<string>('');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { scrollYProgress } = useScroll();

    // Calculate reading statistics
    const totalWords = useMemo(() => {
        return content.split(/\s+/).filter(word => word.length > 0).length;
    }, [content]);

    const estimatedReadTime = useMemo(() => {
        // Average reading speed: 200-250 words per minute for technical content
        return Math.ceil(totalWords / 200);
    }, [totalWords]);

    const estimatedTimeLeft = useMemo(() => {
        const remaining = 1 - scrollProgress;
        return Math.ceil(estimatedReadTime * remaining);
    }, [estimatedReadTime, scrollProgress]);

    // Calculate reading progress (more accurate than scroll progress)
    const readingProgress = useMemo(() => {
        // Reading progress accounts for actual content consumption
        // Weight towards scroll progress with slight adjustment for engagement
        return Math.min(scrollProgress * 1.1, 1);
    }, [scrollProgress]);

    // Track scroll progress
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setScrollProgress(latest);
        setIsScrolling(true);

        // Clear previous timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        // Set scrolling to false after 150ms of no scrolling
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 150);
    });

    // Scroll spy for active heading
    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Find the first visible heading
                const visibleEntry = entries.find(entry => entry.isIntersecting);
                if (visibleEntry) {
                    setActiveHeadingId(visibleEntry.target.id);
                }
            },
            {
                rootMargin: '-80px 0px -70% 0px',
                threshold: 0
            }
        );

        headings.forEach((heading) => {
            const el = document.getElementById(heading.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    // Parse headings from content if not provided
    useEffect(() => {
        if (initialHeadings.length > 0) {
            setHeadings(initialHeadings);
            return;
        }

        if (!content) return;

        const lines = content.split('\n');
        const extracted: Heading[] = [];

        lines.forEach((line) => {
            // Match ## and ### headings
            const h2Match = line.match(/^## (.+)/);
            const h3Match = line.match(/^### (.+)/);

            if (h2Match) {
                const text = h2Match[1].replace(/\*\*/g, '').trim();
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                extracted.push({ id, text, level: 2 });
            } else if (h3Match) {
                const text = h3Match[1].replace(/\*\*/g, '').trim();
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                extracted.push({ id, text, level: 3 });
            }
        });

        setHeadings(extracted);
    }, [content, initialHeadings]);

    const scrollToHeading = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Update active heading immediately for responsiveness
            setActiveHeadingId(id);
        }
    }, []);

    const hasScrolledPast = useCallback((percentage: number) => {
        return scrollProgress >= percentage / 100;
    }, [scrollProgress]);

    const value: ReadingContextValue = {
        scrollProgress,
        readingProgress,
        estimatedTimeLeft,
        headings,
        activeHeadingId,
        scrollToHeading,
        totalWords,
        estimatedReadTime,
        isScrolling,
        hasScrolledPast,
    };

    return (
        <ReadingContext.Provider value={value}>
            {children}
        </ReadingContext.Provider>
    );
}

/**
 * ReadingProgressBar - Animated progress bar showing reading progress
 */
interface ReadingProgressBarProps {
    className?: string;
    showPercentage?: boolean;
    variant?: 'top' | 'inline';
}

export function ReadingProgressBar({
    className,
    showPercentage = false,
    variant = 'top'
}: ReadingProgressBarProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    if (variant === 'top') {
        return (
            <motion.div
                className={cn(
                    "fixed top-[var(--header-height)] left-0 right-0 h-1 bg-primary z-[60] origin-left",
                    className
                )}
                style={{ scaleX }}
            />
        );
    }

    return (
        <div className={cn("relative", className)}>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-primary rounded-full origin-left"
                    style={{ scaleX }}
                />
            </div>
            {showPercentage && (
                <motion.span
                    className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1 block"
                >
                    {Math.round(scrollYProgress.get() * 100)}% complete
                </motion.span>
            )}
        </div>
    );
}

/**
 * ReadingStats - Display reading statistics
 */
interface ReadingStatsProps {
    className?: string;
    variant?: 'compact' | 'full';
}

export function ReadingStats({ className, variant = 'compact' }: ReadingStatsProps) {
    const { estimatedReadTime, estimatedTimeLeft, totalWords, readingProgress } = useReading();

    if (variant === 'compact') {
        return (
            <div className={cn("flex items-center gap-4 text-muted-foreground", className)}>
                <span className="text-xs font-bold">
                    {estimatedTimeLeft > 0 ? `${estimatedTimeLeft} min left` : 'Almost done'}
                </span>
                <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${readingProgress * 100}%` }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={cn("space-y-4", className)}>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-2xl font-black">{estimatedReadTime}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">min read</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-2xl font-black">{totalWords.toLocaleString()}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">words</div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{Math.round(readingProgress * 100)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${readingProgress * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>
        </div>
    );
}
