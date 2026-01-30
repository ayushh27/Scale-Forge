"use client";

import React, { useState, useEffect } from 'react';
import { Check, Copy, Terminal, Code2, Play } from 'lucide-react';
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

interface CodeBlockProps {
    language: string;
    value: string;
    showLineNumbers?: boolean;
    fileName?: string;
}

export function CodeBlock({ language, value, showLineNumbers = true, fileName }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

    useEffect(() => {
        Prism.highlightAll();
    }, [value, language, activeTab]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Detect if valid component for preview (e.g. standard HTML/React)
    const canPreview = language === 'html' || language === 'jsx' || language === 'tsx';

    return (
        <div className="group relative my-8 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
            {/* Header / Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                    </div>
                    {fileName && (
                        <span className="ml-2 text-xs font-medium text-muted-foreground font-mono">{fileName}</span>
                    )}
                </div>

                <div className="flex items-center gap-2">
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

                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 px-2 lg:block hidden">
                        {language}
                    </span>

                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-all focus:outline-none"
                        aria-label="Copy code"
                    >
                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Content Content or Preview */}
            <div className="relative">
                {activeTab === 'code' ? (
                    <div className="relative overflow-x-auto max-h-[600px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <pre className={cn("text-sm font-mono leading-relaxed p-6", `language-${language}`)}>
                            <code className={`language-${language}`}>
                                {value}
                            </code>
                        </pre>
                    </div>
                ) : (
                    <div className="p-8 bg-white text-black min-h-[300px] flex items-center justify-center rounded-b-2xl">
                        <p className="text-sm font-medium text-gray-500">Live Preview Container (Mock Implementation)</p>
                        {/* Real implementation would render the component here safely */}
                    </div>
                )}
            </div>

            {/* Run Button (Mock for non-web languages) */}
            {!canPreview && (language === 'python' || language === 'javascript' || language === 'typescript') && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-background text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                        <Play className="w-3 h-3 fill-current" /> Run
                    </button>
                </div>
            )}
        </div>
    );
}
