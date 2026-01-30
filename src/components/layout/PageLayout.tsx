"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
    children: ReactNode;
    /**
     * Remove top padding (for pages with custom headers)
     */
    noPadding?: boolean;
    /**
     * Add bottom padding for mobile action bars
     */
    mobileBottomPadding?: boolean;
    /**
     * Custom className for the wrapper
     */
    className?: string;
    /**
     * Enable page transition animation
     */
    animate?: boolean;
}

/**
 * PageLayout - The foundational wrapper for all pages
 * 
 * Provides:
 * - Consistent top padding for navbar offset
 * - Minimum height for full viewport coverage
 * - Optional animation on page load
 * - Mobile-responsive bottom padding for action bars
 */
export function PageLayout({
    children,
    noPadding = false,
    mobileBottomPadding = false,
    className,
    animate = true,
}: PageLayoutProps) {
    const Wrapper = animate ? motion.div : 'div';
    const animationProps = animate ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
    } : {};

    return (
        <Wrapper
            {...animationProps}
            className={cn(
                "min-h-screen w-full",
                !noPadding && "pt-[var(--header-height)]",
                mobileBottomPadding && "pb-24 lg:pb-0",
                className
            )}
        >
            {children}
        </Wrapper>
    );
}
