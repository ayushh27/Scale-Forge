"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface ArrayVisualizerProps {
    initialData?: number[];
    label?: string;
    highlightIndices?: number[];
    pointerIndices?: { index: number; label: string; color: string }[];
}

export function ArrayVisualizer({
    initialData = [10, 5, 8, 3, 12, 7, 15, 6],
    label = "Array Memory Layout",
    highlightIndices = [],
    pointerIndices = []
}: ArrayVisualizerProps) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true });

    return (
        <div ref={containerRef} className="my-8 w-full p-8 rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl relative overflow-hidden group">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-8">
                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground bg-white/5 py-1 px-3 rounded-full border border-white/5">
                    interactive: {label}
                </h4>

                <div className="flex flex-wrap justify-center gap-2">
                    {initialData.map((val, idx) => {
                        const isHighlighted = highlightIndices.includes(idx);
                        const pointer = pointerIndices.find(p => p.index === idx);

                        return (
                            <div key={idx} className="flex flex-col items-center gap-2 relative">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                                    transition={{ delay: idx * 0.05, type: "spring", stiffness: 200 }}
                                    className={cn(
                                        "w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-lg md:text-xl font-bold border-2 transition-all cursor-pointer hover:scale-110 shadow-lg",
                                        isHighlighted
                                            ? "bg-primary/20 border-primary text-primary shadow-primary/20"
                                            : "bg-white/5 border-white/10 text-foreground hover:border-white/30"
                                    )}
                                >
                                    {val}
                                </motion.div>
                                <span className="text-[10px] font-mono text-muted-foreground opacity-50">{idx}</span>

                                {pointer && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -top-8 flex flex-col items-center"
                                    >
                                        <span className={cn("text-[9px] font-black uppercase px-1.5 py-0.5 rounded", {
                                            'bg-rose-500/20 text-rose-500': pointer.color === 'rose',
                                            'bg-blue-500/20 text-blue-500': pointer.color === 'blue',
                                            'bg-amber-500/20 text-amber-500': pointer.color === 'amber',
                                        })}>
                                            {pointer.label}
                                        </span>
                                        <div className={cn("w-0.5 h-2 my-0.5", {
                                            'bg-rose-500': pointer.color === 'rose',
                                            'bg-blue-500': pointer.color === 'blue',
                                            'bg-amber-500': pointer.color === 'amber',
                                        })} />
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}


