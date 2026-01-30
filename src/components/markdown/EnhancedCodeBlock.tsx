"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Check, Copy, Play, ChevronDown, ChevronUp, Lightbulb, AlertTriangle, Info, Zap, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-rust';
import { motion, AnimatePresence } from 'framer-motion';

// Language display names and icons
const LANGUAGE_CONFIG: Record<string, { name: string; color: string }> = {
    typescript: { name: 'TypeScript', color: 'text-blue-400' },
    javascript: { name: 'JavaScript', color: 'text-amber-400' },
    python: { name: 'Python', color: 'text-emerald-400' },
    java: { name: 'Java', color: 'text-rose-400' },
    go: { name: 'Go', color: 'text-cyan-400' },
    rust: { name: 'Rust', color: 'text-orange-400' },
    cpp: { name: 'C++', color: 'text-purple-400' },
    c: { name: 'C', color: 'text-slate-400' },
    sql: { name: 'SQL', color: 'text-pink-400' },
    bash: { name: 'Bash', color: 'text-lime-400' },
    json: { name: 'JSON', color: 'text-yellow-400' },
    html: { name: 'HTML', color: 'text-orange-500' },
    jsx: { name: 'JSX', color: 'text-blue-500' },
    tsx: { name: 'TSX', color: 'text-blue-400' },
};

// Line annotation types
interface LineAnnotation {
    line: number;
    type: 'highlight' | 'add' | 'remove' | 'focus' | 'warning';
    tooltip?: string;
}

// Code variant for multi-language support
interface CodeVariant {
    language: string;
    code: string;
    label?: string;
}

interface EnhancedCodeBlockProps {
    language: string;
    value: string;
    showLineNumbers?: boolean;
    fileName?: string;
    // New enhanced features
    highlightLines?: number[];  // Lines to highlight
    focusLines?: number[];      // Lines to focus with subtle glow
    annotations?: LineAnnotation[];
    variants?: CodeVariant[];   // Multi-language tabs
    caption?: string;           // Description below code
    explanation?: string;       // Expandable explanation
    complexity?: 'O(1)' | 'O(log n)' | 'O(n)' | 'O(n log n)' | 'O(n²)' | 'O(2^n)';
    spaceComplexity?: string;
    showDiff?: boolean;         // Show add/remove diff styling
    collapsible?: boolean;      // Make code collapsible
    defaultCollapsed?: boolean;
}

export function EnhancedCodeBlock({
    language,
    value,
    showLineNumbers = true,
    fileName,
    highlightLines = [],
    focusLines = [],
    annotations = [],
    variants = [],
    caption,
    explanation,
    complexity,
    spaceComplexity,
    showDiff = false,
    collapsible = false,
    defaultCollapsed = false
}: EnhancedCodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
    const [activeVariant, setActiveVariant] = useState(0);
    const [isExpanded, setIsExpanded] = useState(!defaultCollapsed);
    const [showExplanation, setShowExplanation] = useState(false);
    const [hoveredLine, setHoveredLine] = useState<number | null>(null);

    // Determine current code and language based on variant
    const currentCode = variants.length > 0 ? variants[activeVariant]?.code || value : value;
    const currentLanguage = variants.length > 0 ? variants[activeVariant]?.language || language : language;

    const langConfig = LANGUAGE_CONFIG[currentLanguage] || { name: currentLanguage, color: 'text-muted-foreground' };

    useEffect(() => {
        if (isExpanded) {
            Prism.highlightAll();
        }
    }, [currentCode, currentLanguage, activeTab, isExpanded]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(currentCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Split code into lines for enhanced rendering
    const lines = useMemo(() => currentCode.split('\n'), [currentCode]);

    const getLineStyle = (lineNum: number) => {
        const annotation = annotations.find(a => a.line === lineNum);

        if (annotation) {
            switch (annotation.type) {
                case 'add': return 'bg-emerald-500/10 border-l-2 border-emerald-500';
                case 'remove': return 'bg-rose-500/10 border-l-2 border-rose-500 line-through opacity-60';
                case 'warning': return 'bg-amber-500/10 border-l-2 border-amber-500';
                case 'highlight': return 'bg-primary/10 border-l-2 border-primary';
                case 'focus': return 'bg-blue-500/5 ring-1 ring-blue-500/20';
            }
        }

        if (highlightLines.includes(lineNum)) {
            return 'bg-primary/10 border-l-2 border-primary';
        }

        if (focusLines.includes(lineNum)) {
            return 'bg-blue-500/5';
        }

        return '';
    };

    const getLineAnnotation = (lineNum: number) => {
        return annotations.find(a => a.line === lineNum);
    };

    const canPreview = ['html', 'jsx', 'tsx'].includes(currentLanguage);

    return (
        <div className="group relative my-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
            {/* Header / Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    {/* Window controls */}
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                    </div>

                    {fileName && (
                        <span className="ml-2 text-xs font-medium text-muted-foreground font-mono">{fileName}</span>
                    )}

                    {/* Language badge */}
                    <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5", langConfig.color)}>
                        {langConfig.name}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {/* Multi-language variant tabs */}
                    {variants.length > 1 && (
                        <div className="flex bg-black/30 rounded-lg p-0.5 mr-2">
                            {variants.map((variant, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveVariant(idx)}
                                    className={cn(
                                        "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all",
                                        activeVariant === idx
                                            ? "bg-primary text-background shadow-lg"
                                            : "text-muted-foreground hover:text-white"
                                    )}
                                >
                                    {variant.label || LANGUAGE_CONFIG[variant.language]?.name || variant.language}
                                </button>
                            ))}
                        </div>
                    )}

                    {canPreview && (
                        <div className="flex bg-black/20 rounded-lg p-0.5 mr-2">
                            <button
                                onClick={() => setActiveTab('code')}
                                className={cn(
                                    "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all",
                                    activeTab === 'code' ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"
                                )}
                            >
                                Code
                            </button>
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={cn(
                                    "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all",
                                    activeTab === 'preview' ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"
                                )}
                            >
                                Preview
                            </button>
                        </div>
                    )}

                    {/* Complexity badge */}
                    {complexity && (
                        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                            <Zap className="w-3 h-3" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{complexity}</span>
                        </div>
                    )}

                    {/* Collapsible toggle */}
                    {collapsible && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-all"
                        >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    )}

                    {/* Copy button */}
                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-all focus:outline-none"
                        aria-label="Copy code"
                    >
                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Code Content - Animated collapse */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative overflow-hidden"
                    >
                        {activeTab === 'code' ? (
                            <div className="relative overflow-x-auto max-h-[600px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                {/* Enhanced code rendering with line numbers and annotations */}
                                <div className="flex">
                                    {showLineNumbers && (
                                        <div className="flex-shrink-0 py-4 px-3 text-right select-none border-r border-white/5 bg-white/[0.02]">
                                            {lines.map((_, idx) => {
                                                const lineNum = idx + 1;
                                                const annotation = getLineAnnotation(lineNum);
                                                return (
                                                    <div
                                                        key={idx}
                                                        className={cn(
                                                            "text-[11px] font-mono leading-6 text-muted-foreground/40",
                                                            highlightLines.includes(lineNum) && "text-primary",
                                                            annotation?.type === 'warning' && "text-amber-500"
                                                        )}
                                                    >
                                                        {lineNum}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    <div className="flex-1 py-4 px-4 overflow-x-auto">
                                        {lines.map((line, idx) => {
                                            const lineNum = idx + 1;
                                            const annotation = getLineAnnotation(lineNum);
                                            const lineStyle = getLineStyle(lineNum);

                                            return (
                                                <div
                                                    key={idx}
                                                    className={cn(
                                                        "relative group/line px-2 -mx-2 leading-6 rounded transition-colors",
                                                        lineStyle,
                                                        hoveredLine === lineNum && "bg-white/5"
                                                    )}
                                                    onMouseEnter={() => setHoveredLine(lineNum)}
                                                    onMouseLeave={() => setHoveredLine(null)}
                                                >
                                                    <pre className="text-sm font-mono">
                                                        <code
                                                            className={`language-${currentLanguage}`}
                                                            dangerouslySetInnerHTML={{
                                                                __html: Prism.highlight(
                                                                    line || ' ',
                                                                    Prism.languages[currentLanguage] || Prism.languages.javascript,
                                                                    currentLanguage
                                                                )
                                                            }}
                                                        />
                                                    </pre>

                                                    {/* Annotation tooltip */}
                                                    {annotation?.tooltip && hoveredLine === lineNum && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            className="absolute left-full ml-4 top-0 z-50 max-w-xs p-3 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-2xl"
                                                        >
                                                            <div className="flex items-start gap-2">
                                                                {annotation.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                                                                {annotation.type === 'highlight' && <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />}
                                                                {annotation.type === 'focus' && <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}
                                                                <p className="text-xs text-muted-foreground leading-relaxed">{annotation.tooltip}</p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 bg-white text-black min-h-[300px] flex items-center justify-center rounded-b-2xl">
                                <p className="text-sm font-medium text-gray-500">Live Preview Container</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Caption */}
            {caption && (
                <div className="px-4 py-3 bg-white/[0.02] border-t border-white/5">
                    <p className="text-xs text-muted-foreground font-medium">{caption}</p>
                </div>
            )}

            {/* Complexity & Space info footer */}
            {(complexity || spaceComplexity) && (
                <div className="px-4 py-3 bg-white/[0.02] border-t border-white/5 flex items-center gap-6">
                    {complexity && (
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Time:</span>
                            <span className="text-xs font-mono text-amber-400">{complexity}</span>
                        </div>
                    )}
                    {spaceComplexity && (
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Space:</span>
                            <span className="text-xs font-mono text-blue-400">{spaceComplexity}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Expandable explanation */}
            {explanation && (
                <>
                    <button
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="w-full px-4 py-3 bg-primary/5 border-t border-primary/10 flex items-center justify-between hover:bg-primary/10 transition-colors"
                    >
                        <div className="flex items-center gap-2 text-primary">
                            <Lightbulb className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Code Explanation</span>
                        </div>
                        {showExplanation ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-primary" />}
                    </button>

                    <AnimatePresence>
                        {showExplanation && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 py-4 bg-primary/[0.02] border-t border-primary/5">
                                    <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}

            {/* Run Button (Mock for non-web languages) */}
            {!canPreview && ['python', 'javascript', 'typescript'].includes(currentLanguage) && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-background text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                        <Play className="w-3 h-3 fill-current" /> Run
                    </button>
                </div>
            )}
        </div>
    );
}

// Re-export original for backward compatibility
export { CodeBlock } from './CodeBlock';
