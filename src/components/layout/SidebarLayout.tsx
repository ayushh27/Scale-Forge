"use client";

import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface SidebarLayoutProps {
    children: ReactNode;
    /**
     * Left sidebar content (e.g., Table of Contents, Navigation)
     */
    leftSidebar?: ReactNode;
    /**
     * Right sidebar content (e.g., Notes, Related Articles)
     */
    rightSidebar?: ReactNode;
    /**
     * Whether left sidebar is collapsible
     */
    leftCollapsible?: boolean;
    /**
     * Whether to show right sidebar on desktop only (xl+)
     */
    rightDesktopOnly?: boolean;
    /**
     * Main content max width when no sidebars are visible
     */
    mainMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    /**
     * Custom className for the layout wrapper
     */
    className?: string;
}

const mainMaxWidthClasses = {
    sm: 'max-w-prose',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    xl: 'max-w-5xl',
    full: 'max-w-none',
};

/**
 * SidebarLayout - Flexible layout with optional left and right sidebars
 * 
 * Features:
 * - Mobile: Content takes full width, sidebars accessible via overlays
 * - Tablet: Left sidebar collapsible, content expands
 * - Desktop: All sidebars visible, content centered
 * - Sidebars only reserve space when visible (no empty columns)
 */
export function SidebarLayout({
    children,
    leftSidebar,
    rightSidebar,
    leftCollapsible = true,
    rightDesktopOnly = true,
    mainMaxWidth = 'lg',
    className,
}: SidebarLayoutProps) {
    const [isLeftOpen, setIsLeftOpen] = useState(false);
    const [isMobileOverlayOpen, setIsMobileOverlayOpen] = useState(false);

    // Auto-open left sidebar on desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsLeftOpen(true);
                setIsMobileOverlayOpen(false);
            } else {
                setIsLeftOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const hasLeftSidebar = !!leftSidebar;
    const hasRightSidebar = !!rightSidebar;

    return (
        <div className={cn("w-full flex justify-center", className)}>
            <div className={cn(
                "w-full flex gap-6 lg:gap-8 xl:gap-12 transition-all duration-300",
                "px-4 sm:px-6 lg:px-8"
            )}>
                {/* Desktop Toggle Sidebar Button */}
                {hasLeftSidebar && leftCollapsible && (
                    <button
                        onClick={() => setIsLeftOpen(!isLeftOpen)}
                        className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full glass-morphism border border-white/10 text-muted-foreground hover:text-primary transition-all shadow-2xl"
                        aria-label={isLeftOpen ? "Close sidebar" : "Open sidebar"}
                    >
                        {isLeftOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
                    </button>
                )}

                {/* Mobile Overlay Backdrop */}
                <AnimatePresence>
                    {isMobileOverlayOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOverlayOpen(false)}
                            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
                        />
                    )}
                </AnimatePresence>

                {/* Left Sidebar */}
                {hasLeftSidebar && (
                    <>
                        {/* Desktop Left Sidebar */}
                        <AnimatePresence>
                            {isLeftOpen && (
                                <motion.aside
                                    initial={{ opacity: 0, x: -20, width: 0 }}
                                    animate={{ opacity: 1, x: 0, width: 'auto' }}
                                    exit={{ opacity: 0, x: -20, width: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                        "hidden lg:block flex-shrink-0 w-[260px] xl:w-[280px]",
                                        "sticky top-[calc(var(--header-height)+2rem)] h-[calc(100vh-var(--header-height)-4rem)]",
                                        "overflow-y-auto scrollbar-hide"
                                    )}
                                >
                                    {leftSidebar}
                                </motion.aside>
                            )}
                        </AnimatePresence>

                        {/* Mobile Left Sidebar Drawer */}
                        <AnimatePresence>
                            {isMobileOverlayOpen && (
                                <motion.aside
                                    initial={{ x: '-100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '-100%' }}
                                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                                    className={cn(
                                        "lg:hidden fixed top-0 left-0 bottom-0 w-[85vw] max-w-[320px]",
                                        "bg-background border-r border-white/5 z-[110]",
                                        "p-6 pt-24 overflow-y-auto scrollbar-hide"
                                    )}
                                >
                                    {leftSidebar}
                                </motion.aside>
                            )}
                        </AnimatePresence>
                    </>
                )}

                {/* Main Content */}
                <main className={cn(
                    "flex-1 min-w-0 w-full mx-auto",
                    // Apply max-width constraint when sidebars aren't visible
                    !isLeftOpen && !hasRightSidebar && mainMaxWidthClasses[mainMaxWidth]
                )}>
                    {children}
                </main>

                {/* Right Sidebar */}
                {hasRightSidebar && (
                    <aside className={cn(
                        "flex-shrink-0 w-[300px] xl:w-[340px]",
                        "sticky top-[calc(var(--header-height)+2rem)] h-fit",
                        rightDesktopOnly ? "hidden xl:block" : "hidden lg:block"
                    )}>
                        {rightSidebar}
                    </aside>
                )}
            </div>
        </div>
    );
}

// Export hooks for controlling sidebar from child components
export function useSidebarControl() {
    // This would be implemented with context in a full implementation
    return {
        openLeftSidebar: () => { },
        closeLeftSidebar: () => { },
        toggleLeftSidebar: () => { },
    };
}
