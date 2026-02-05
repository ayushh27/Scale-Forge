"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Topic {
    id: string;
    title: string;
    slug: string;
    completed?: boolean;
}

interface Section {
    id: string;
    title: string;
    topics: Topic[];
    icon?: React.ComponentType<{ className?: string }>;
}

interface DocumentationSidebarProps {
    sections: Section[];
    currentSlug: string;
    className?: string;
}

export function DocumentationSidebar({ sections, currentSlug, className }: DocumentationSidebarProps) {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(
        new Set(sections.map(s => s.id))
    );

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev => {
            const next = new Set(prev);
            if (next.has(sectionId)) {
                next.delete(sectionId);
            } else {
                next.add(sectionId);
            }
            return next;
        });
    };

    return (
        <nav className={cn("w-full space-y-1", className)}>
            {sections.map((section) => {
                const isExpanded = expandedSections.has(section.id);
                const Icon = section.icon;

                return (
                    <div key={section.id} className="space-y-1">
                        {/* Section Header */}
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-all group"
                        >
                            <div className="flex items-center gap-2">
                                {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
                                <span className="text-sm font-bold text-foreground">
                                    {section.title}
                                </span>
                            </div>
                            {isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform" />
                            )}
                        </button>

                        {/* Topics List */}
                        <AnimatePresence initial={false}>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pl-6 space-y-0.5 border-l border-white/5 ml-3">
                                        {section.topics.map((topic) => {
                                            const isCurrent = topic.slug === currentSlug;

                                            return (
                                                <Link
                                                    key={topic.id}
                                                    href={`/learn/${topic.slug}`}
                                                    className={cn(
                                                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all group relative",
                                                        isCurrent
                                                            ? "bg-primary/10 text-primary font-bold border-l-2 border-primary"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                                    )}
                                                >
                                                    {/* Completion Indicator */}
                                                    {topic.completed ? (
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                                    ) : (
                                                        <Circle className={cn(
                                                            "w-3.5 h-3.5 shrink-0",
                                                            isCurrent ? "text-primary" : "text-muted-foreground/30"
                                                        )} />
                                                    )}

                                                    <span className="truncate">{topic.title}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </nav>
    );
}
