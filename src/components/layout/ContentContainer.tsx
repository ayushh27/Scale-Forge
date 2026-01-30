"use client";

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContentContainerProps {
    children: ReactNode;
    /**
     * Maximum width constraint
     * - sm: 640px (optimal for reading)
     * - md: 768px (default - articles/documentation)
     * - lg: 1024px (mixed content)
     * - xl: 1280px (wide layouts with sidebars)
     * - full: 100% (no constraint)
     */
    size?: ContainerSize;
    /**
     * Center the container horizontally
     */
    center?: boolean;
    /**
     * Responsive padding based on screen size
     */
    padding?: boolean;
    /**
     * Custom className
     */
    className?: string;
}

const sizeClasses: Record<ContainerSize, string> = {
    sm: 'max-w-prose', // ~65ch optimal reading
    md: 'max-w-3xl',   // 768px
    lg: 'max-w-5xl',   // 1024px
    xl: 'max-w-7xl',   // 1280px
    full: 'max-w-none', // No constraint
};

/**
 * ContentContainer - Constrains content width for optimal readability
 * 
 * Mobile-first approach:
 * - Content takes full width on mobile with padding
 * - Constrains to specified max-width on larger screens
 * - Centers content by default
 */
export function ContentContainer({
    children,
    size = 'md',
    center = true,
    padding = true,
    className,
}: ContentContainerProps) {
    return (
        <div
            className={cn(
                "w-full",
                sizeClasses[size],
                center && "mx-auto",
                padding && "px-4 sm:px-6 lg:px-8",
                className
            )}
        >
            {children}
        </div>
    );
}
