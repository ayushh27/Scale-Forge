"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ChevronRight, LucideIcon } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BadgeConfig {
    label: string;
    icon?: LucideIcon;
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'muted';
}

interface PageHeaderProps {
    /**
     * Main title of the page
     */
    title: string | ReactNode;
    /**
     * Optional subtitle/description
     */
    subtitle?: string | ReactNode;
    /**
     * Breadcrumb navigation items
     */
    breadcrumbs?: BreadcrumbItem[];
    /**
     * Badge displayed above title
     */
    badge?: BadgeConfig;
    /**
     * Additional badges/tags
     */
    tags?: BadgeConfig[];
    /**
     * Stats or metadata to display
     */
    meta?: ReactNode;
    /**
     * Actions (buttons) to display
     */
    actions?: ReactNode;
    /**
     * Custom className
     */
    className?: string;
    /**
     * Enable entrance animation
     */
    animate?: boolean;
}

const badgeVariants = {
    primary: "bg-primary/10 border-primary/20 text-primary",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    danger: "bg-rose-500/10 border-rose-500/20 text-rose-400",
    muted: "bg-muted/30 border-white/5 text-muted-foreground",
};

/**
 * PageHeader - Consistent header section for pages
 * 
 * Features:
 * - Responsive typography scaling
 * - Breadcrumb navigation
 * - Badges and tags
 * - Meta information display
 * - Action buttons
 * - Optional animations
 */
export function PageHeader({
    title,
    subtitle,
    breadcrumbs,
    badge,
    tags,
    meta,
    actions,
    className,
    animate = true,
}: PageHeaderProps) {
    const MotionDiv = animate ? motion.div : 'div';
    const staggerDelay = 0.1;

    return (
        <header className={cn("space-y-6 md:space-y-8", className)}>
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <MotionDiv
                    {...(animate ? {
                        initial: { opacity: 0, y: -10 },
                        animate: { opacity: 1, y: 0 },
                    } : {})}
                    className="flex flex-wrap items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                >
                    {breadcrumbs.map((crumb, idx) => (
                        <span key={idx} className="flex items-center gap-2">
                            {idx > 0 && <ChevronRight className="w-3 h-3 text-white/20" />}
                            {crumb.href ? (
                                <Link href={crumb.href} className="hover:text-primary transition-colors">
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="text-foreground">{crumb.label}</span>
                            )}
                        </span>
                    ))}
                </MotionDiv>
            )}

            {/* Badge and Tags Row */}
            {(badge || (tags && tags.length > 0)) && (
                <MotionDiv
                    {...(animate ? {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: staggerDelay },
                    } : {})}
                    className="flex flex-wrap items-center gap-3"
                >
                    {badge && (
                        <div className={cn(
                            "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest",
                            badgeVariants[badge.variant || 'primary']
                        )}>
                            {badge.icon && <badge.icon className="w-3 h-3" />}
                            {badge.label}
                        </div>
                    )}
                    {tags?.map((tag, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest",
                                badgeVariants[tag.variant || 'muted']
                            )}
                        >
                            {tag.icon && <tag.icon className="w-3 h-3" />}
                            {tag.label}
                        </div>
                    ))}
                </MotionDiv>
            )}

            {/* Title */}
            <MotionDiv
                {...(animate ? {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: staggerDelay * 2 },
                } : {})}
            >
                {typeof title === 'string' ? (
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[0.95]">
                        {title}
                    </h1>
                ) : (
                    title
                )}
            </MotionDiv>

            {/* Subtitle */}
            {subtitle && (
                <MotionDiv
                    {...(animate ? {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: staggerDelay * 3 },
                    } : {})}
                >
                    {typeof subtitle === 'string' ? (
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed max-w-3xl">
                            {subtitle}
                        </p>
                    ) : (
                        subtitle
                    )}
                </MotionDiv>
            )}

            {/* Meta Information */}
            {meta && (
                <MotionDiv
                    {...(animate ? {
                        initial: { opacity: 0, scale: 0.95 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { delay: staggerDelay * 4 },
                    } : {})}
                >
                    {meta}
                </MotionDiv>
            )}

            {/* Actions */}
            {actions && (
                <MotionDiv
                    {...(animate ? {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: staggerDelay * 5 },
                    } : {})}
                    className="flex flex-wrap items-center gap-4"
                >
                    {actions}
                </MotionDiv>
            )}
        </header>
    );
}
