"use client";

import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
    ReadingProvider,
    ReadingProgressBar,
    ReadingStats,
    TableOfContents,
    FloatingTOC,
    type Heading
} from '@/components/reading';
import {
    PanelLeftClose,
    PanelLeftOpen,
    BookOpen,
    Clock,
    X,
    Menu
} from 'lucide-react';

interface ArticleReaderProps {
    /**
     * Main article content
     */
    children: ReactNode;
    /**
     * Article content as string (for parsing headings and calculating stats)
     */
    content?: string;
    /**
     * Pre-parsed headings (optional - auto-parsed from content if not provided)
     */
    headings?: Heading[];
    /**
     * Left sidebar content (Table of Contents is added automatically)
     */
    leftSidebar?: ReactNode;
    /**
     * Right sidebar content (Notes, Related, etc.)
     */
    rightSidebar?: ReactNode;
    /**
     * Article metadata for display
     */
    meta?: {
        title?: string;
        readTime?: number;
        wordCount?: number;
        lastUpdated?: string;
    };
    /**
     * Show floating TOC on mobile
     */
    showFloatingTOC?: boolean;
    /**
     * Custom className for article container
     */
    className?: string;
}

/**
 * ArticleReader - Complete reading experience wrapper
 * 
 * Provides:
 * - Reading progress bar
 * - Auto-synced table of contents
 * - Collapsible sidebars
 * - Mobile floating TOC
 * - Reading statistics
 * - Focus-friendly layout
 */
export function ArticleReader({
    children,
    content = '',
    headings,
    leftSidebar,
    rightSidebar,
    meta,
    showFloatingTOC = true,
    className,
}: ArticleReaderProps) {
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

    // Auto-open sidebars on desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setIsLeftSidebarOpen(true);
            } else {
                setIsLeftSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ReadingProvider content={content} headings={headings}>
            {/* Reading Progress Bar */}
            <ReadingProgressBar />

            <div className={cn("w-full flex justify-center relative", className)}>
                <div className={cn(
                    "w-full flex transition-all duration-300",
                    "px-4 sm:px-6 lg:px-8",
                    "gap-6 lg:gap-8 xl:gap-12"
                )}>
                    {/* Desktop Sidebar Toggle */}
                    <button
                        onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                        className={cn(
                            "hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-50",
                            "p-3 rounded-full glass-morphism border border-white/10",
                            "text-muted-foreground hover:text-primary transition-all shadow-2xl"
                        )}
                        aria-label={isLeftSidebarOpen ? "Close sidebar" : "Open sidebar"}
                    >
                        {isLeftSidebarOpen ? (
                            <PanelLeftClose className="w-5 h-5" />
                        ) : (
                            <PanelLeftOpen className="w-5 h-5" />
                        )}
                    </button>

                    {/* Mobile Backdrop */}
                    <AnimatePresence>
                        {(isLeftSidebarOpen || isRightSidebarOpen) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => {
                                    setIsLeftSidebarOpen(false);
                                    setIsRightSidebarOpen(false);
                                }}
                                className="xl:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
                            />
                        )}
                    </AnimatePresence>

                    {/* Left Sidebar */}
                    <AnimatePresence mode="wait">
                        {isLeftSidebarOpen && (
                            <motion.aside
                                initial={{ opacity: 0, x: -20, width: 0 }}
                                animate={{ opacity: 1, x: 0, width: 'auto' }}
                                exit={{ opacity: 0, x: -20, width: 0 }}
                                transition={{ duration: 0.3 }}
                                className={cn(
                                    "flex-shrink-0 w-[280px] xl:w-[300px]",
                                    "hidden xl:block",
                                    "sticky top-[calc(var(--header-height)+2rem)]",
                                    "h-[calc(100vh-var(--header-height)-4rem)]",
                                    "overflow-y-auto scrollbar-hide"
                                )}
                            >
                                <div className="space-y-8 pr-4">
                                    {/* Reading Stats */}
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                                        <div className="flex items-center gap-2 text-primary">
                                            <BookOpen className="w-4 h-4" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                                Reading Stats
                                            </span>
                                        </div>
                                        <ReadingStats variant="full" />
                                    </div>

                                    {/* Table of Contents */}
                                    <TableOfContents variant="sidebar" />

                                    {/* Additional sidebar content */}
                                    {leftSidebar}
                                </div>
                            </motion.aside>
                        )}
                    </AnimatePresence>

                    {/* Mobile Left Sidebar Drawer */}
                    <AnimatePresence>
                        {isLeftSidebarOpen && (
                            <motion.aside
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                                className={cn(
                                    "xl:hidden fixed top-0 left-0 bottom-0",
                                    "w-[85vw] max-w-[320px]",
                                    "bg-background border-r border-white/5 z-[110]",
                                    "overflow-y-auto scrollbar-hide"
                                )}
                            >
                                <div className="p-6 pt-24 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-black uppercase tracking-widest text-primary">
                                            Contents
                                        </span>
                                        <button
                                            onClick={() => setIsLeftSidebarOpen(false)}
                                            className="p-2 rounded-lg hover:bg-white/5"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <ReadingStats variant="full" />
                                    <TableOfContents
                                        variant="sidebar"
                                        onNavigate={() => setIsLeftSidebarOpen(false)}
                                    />
                                    {leftSidebar}
                                </div>
                            </motion.aside>
                        )}
                    </AnimatePresence>

                    {/* Main Content */}
                    <main className={cn(
                        "flex-1 min-w-0 w-full",
                        "max-w-4xl mx-auto",
                        "py-8 md:py-12"
                    )}>
                        <article className="doc-content reading-content">
                            {children}
                        </article>
                    </main>

                    {/* Right Sidebar */}
                    {rightSidebar && (
                        <aside className={cn(
                            "hidden xl:block flex-shrink-0",
                            "w-[280px] xl:w-[320px]",
                            "sticky top-[calc(var(--header-height)+2rem)]",
                            "h-fit max-h-[calc(100vh-var(--header-height)-4rem)]",
                            "overflow-y-auto scrollbar-hide"
                        )}>
                            <div className="space-y-6 pl-4">
                                {rightSidebar}
                            </div>
                        </aside>
                    )}
                </div>
            </div>

            {/* Floating TOC for Mobile */}
            {showFloatingTOC && (
                <div className="xl:hidden">
                    <FloatingTOC />
                </div>
            )}

            {/* Mobile Bottom Action Bar */}
            <div className="xl:hidden fixed bottom-0 left-0 right-0 z-[90] bg-background/95 backdrop-blur-md border-t border-white/5 p-4 safe-area-bottom">
                <div className="flex items-center justify-between max-w-lg mx-auto">
                    <button
                        onClick={() => setIsLeftSidebarOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Menu className="w-4 h-4" />
                        <span className="text-xs font-bold">Contents</span>
                    </button>

                    <ReadingStats variant="compact" />
                </div>
            </div>
        </ReadingProvider>
    );
}

export default ArticleReader;
