"use client";

import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * SectionHighlight - Highlights sections as they come into view
 */
interface SectionHighlightProps {
    children: ReactNode;
    className?: string;
    /**
     * ID for anchor navigation
     */
    id?: string;
    /**
     * Highlight style variant
     */
    variant?: 'subtle' | 'border' | 'glow';
}

export function SectionHighlight({
    children,
    className,
    id,
    variant = 'subtle'
}: SectionHighlightProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        once: false,
        margin: "-20% 0px -60% 0px"
    });

    const variantStyles = {
        subtle: isInView ? 'bg-white/[0.02]' : '',
        border: isInView ? 'border-l-2 border-primary pl-6' : 'border-l-2 border-transparent pl-6',
        glow: isInView ? 'shadow-lg shadow-primary/5' : '',
    };

    return (
        <motion.div
            ref={ref}
            id={id}
            className={cn(
                "transition-all duration-500 rounded-xl scroll-offset",
                variantStyles[variant],
                className
            )}
            animate={{
                opacity: isInView ? 1 : 0.7,
            }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
}

/**
 * FadeInSection - Content that fades in as user scrolls
 */
interface FadeInSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function FadeInSection({
    children,
    className,
    delay = 0,
    direction = 'up'
}: FadeInSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const directionVariants: Record<typeof direction, { x?: number; y?: number }> = {
        up: { y: 20 },
        down: { y: -20 },
        left: { x: 20 },
        right: { x: -20 },
        none: {},
    };

    const variant = directionVariants[direction];
    const initialX = variant.x ?? 0;
    const initialY = variant.y ?? 0;

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                x: initialX,
                y: initialY
            }}
            animate={{
                opacity: isInView ? 1 : 0,
                x: isInView ? 0 : initialX,
                y: isInView ? 0 : initialY,
            }}
            transition={{
                duration: 0.5,
                delay,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
    );
}

/**
 * PullQuote - Highlighted quote block for emphasis
 */
interface PullQuoteProps {
    children: ReactNode;
    author?: string;
    source?: string;
    className?: string;
}

export function PullQuote({ children, author, source, className }: PullQuoteProps) {
    return (
        <FadeInSection direction="left" className={className}>
            <blockquote className="relative my-12 py-8 px-8 md:px-12 bg-primary/[0.03] border-l-4 border-primary rounded-r-2xl">
                <div className="absolute top-4 left-4 text-6xl text-primary/20 font-serif leading-none">
                    "
                </div>
                <div className="relative z-10 text-lg md:text-xl font-medium italic text-foreground/90 leading-relaxed">
                    {children}
                </div>
                {(author || source) && (
                    <footer className="mt-4 text-sm font-bold text-muted-foreground">
                        {author && <span className="text-primary">{author}</span>}
                        {source && <span>, {source}</span>}
                    </footer>
                )}
            </blockquote>
        </FadeInSection>
    );
}

/**
 * KeyTakeaway - Highlighted key point box
 */
interface KeyTakeawayProps {
    title?: string;
    children: ReactNode;
    variant?: 'info' | 'warning' | 'success' | 'tip';
    className?: string;
}

export function KeyTakeaway({
    title = 'Key Takeaway',
    children,
    variant = 'info',
    className
}: KeyTakeawayProps) {
    const variantStyles = {
        info: 'bg-blue-500/5 border-blue-500/20 text-blue-400',
        warning: 'bg-amber-500/5 border-amber-500/20 text-amber-400',
        success: 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400',
        tip: 'bg-primary/5 border-primary/20 text-primary',
    };

    return (
        <FadeInSection className={className}>
            <div className={cn(
                "my-8 p-6 rounded-2xl border",
                variantStyles[variant]
            )}>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                    {title}
                </div>
                <div className="text-foreground text-base leading-relaxed">
                    {children}
                </div>
            </div>
        </FadeInSection>
    );
}

/**
 * ReadingBreak - Visual break in content with optional separator
 */
interface ReadingBreakProps {
    variant?: 'dots' | 'line' | 'space';
    className?: string;
}

export function ReadingBreak({ variant = 'dots', className }: ReadingBreakProps) {
    if (variant === 'space') {
        return <div className={cn("h-16 md:h-24", className)} />;
    }

    if (variant === 'line') {
        return (
            <div className={cn("my-16 md:my-20", className)}>
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
        );
    }

    return (
        <div className={cn("my-16 md:my-20 flex justify-center gap-3", className)}>
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-primary/30" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
    );
}

/**
 * ScrollReveal - Progressive content reveal on scroll
 */
interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    stagger?: boolean;
}

export function ScrollReveal({ children, className, stagger = false }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: stagger ? {
                        staggerChildren: 0.1
                    } : undefined
                }
            }}
        >
            {children}
        </motion.div>
    );
}

/**
 * AnchorHeading - Heading with anchor link support
 */
interface AnchorHeadingProps {
    level: 1 | 2 | 3 | 4;
    children: ReactNode;
    id?: string;
    className?: string;
}

export function AnchorHeading({ level, children, id, className }: AnchorHeadingProps) {
    const generatedId = id || (typeof children === 'string'
        ? children.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
        : undefined);

    const handleClick = () => {
        if (generatedId) {
            navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${generatedId}`);
        }
    };

    const headingClasses = cn("group scroll-offset relative", className);

    const anchorButton = generatedId ? (
        <button
            onClick={handleClick}
            className={cn(
                "absolute -left-8 top-1/2 -translate-y-1/2 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity",
                "text-muted-foreground hover:text-primary hover:bg-white/5"
            )}
            title="Copy link to section"
        >
            #
        </button>
    ) : null;

    switch (level) {
        case 1:
            return <h1 id={generatedId} className={headingClasses}>{children}{anchorButton}</h1>;
        case 2:
            return <h2 id={generatedId} className={headingClasses}>{children}{anchorButton}</h2>;
        case 3:
            return <h3 id={generatedId} className={headingClasses}>{children}{anchorButton}</h3>;
        case 4:
            return <h4 id={generatedId} className={headingClasses}>{children}{anchorButton}</h4>;
        default:
            return <h2 id={generatedId} className={headingClasses}>{children}{anchorButton}</h2>;
    }
}
