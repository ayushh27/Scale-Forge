"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    ChevronRight,
    Server,
    Database,
    Cloud,
    Workflow,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Zap,
    Clock,
    Shield,
    TrendingUp,
    TrendingDown,
    Scale,
    Layers,
    GitBranch,
    Activity,
    Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================
// ARCHITECTURE BREAKDOWN COMPONENT
// ============================================================

interface ArchitectureComponent {
    name: string;
    type: 'service' | 'database' | 'cache' | 'queue' | 'gateway' | 'loadbalancer' | 'client';
    description: string;
    tech?: string;
    responsibilities?: string[];
}

interface ArchitectureBreakdownProps {
    title: string;
    description?: string;
    components: ArchitectureComponent[];
    connections?: { from: string; to: string; label?: string }[];
}

const ComponentIcon = ({ type }: { type: ArchitectureComponent['type'] }) => {
    const icons = {
        service: Server,
        database: Database,
        cache: Zap,
        queue: Workflow,
        gateway: Shield,
        loadbalancer: Scale,
        client: Activity
    };
    const Icon = icons[type] || Server;
    return <Icon className="w-5 h-5" />;
};

const componentColors = {
    service: 'from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400',
    database: 'from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-400',
    cache: 'from-amber-500/20 to-amber-600/5 border-amber-500/30 text-amber-400',
    queue: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 text-emerald-400',
    gateway: 'from-rose-500/20 to-rose-600/5 border-rose-500/30 text-rose-400',
    loadbalancer: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/30 text-cyan-400',
    client: 'from-slate-500/20 to-slate-600/5 border-slate-500/30 text-slate-400'
};

export function ArchitectureBreakdown({ title, description, components, connections }: ArchitectureBreakdownProps) {
    const [expandedComponent, setExpandedComponent] = useState<string | null>(null);

    return (
        <div className="my-12 p-6 md:p-10 rounded-[2rem] bg-muted/10 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Layers className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-black tracking-tight">{title}</h3>
                    {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {components.map((component) => (
                    <motion.div
                        key={component.name}
                        layout
                        className={cn(
                            "p-5 rounded-2xl bg-gradient-to-br border cursor-pointer transition-all hover:scale-[1.02]",
                            componentColors[component.type]
                        )}
                        onClick={() => setExpandedComponent(expandedComponent === component.name ? null : component.name)}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <ComponentIcon type={component.type} />
                                <div>
                                    <h4 className="font-bold text-sm">{component.name}</h4>
                                    {component.tech && (
                                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{component.tech}</span>
                                    )}
                                </div>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedComponent === component.name ? 90 : 0 }}
                            >
                                <ChevronRight className="w-4 h-4 opacity-60" />
                            </motion.div>
                        </div>

                        <p className="text-xs text-white/60 leading-relaxed">{component.description}</p>

                        <AnimatePresence>
                            {expandedComponent === component.name && component.responsibilities && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="mt-4 pt-4 border-t border-white/10 overflow-hidden"
                                >
                                    <h5 className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Responsibilities</h5>
                                    <ul className="space-y-1.5">
                                        {component.responsibilities.map((resp, i) => (
                                            <li key={i} className="flex items-start gap-2 text-[11px]">
                                                <div className="w-1 h-1 rounded-full bg-current mt-1.5 shrink-0" />
                                                {resp}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ============================================================
// DATA FLOW COMPONENT
// ============================================================

interface DataFlowStep {
    step: number;
    action: string;
    from: string;
    to: string;
    data?: string;
    protocol?: string;
    note?: string;
}

interface DataFlowProps {
    title: string;
    description?: string;
    steps: DataFlowStep[];
    variant?: 'horizontal' | 'vertical';
}

export function DataFlow({ title, description, steps, variant = 'vertical' }: DataFlowProps) {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    return (
        <div className="my-12 p-6 md:p-10 rounded-[2rem] bg-muted/10 border border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Workflow className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                    <h3 className="text-xl font-black tracking-tight">{title}</h3>
                    {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
                </div>
            </div>

            <div className="relative">
                {/* Connection line */}
                <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-500/50 via-primary/50 to-blue-500/50" />

                <div className="space-y-4">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={cn(
                                "relative pl-12 group",
                                activeStep === step.step && "z-10"
                            )}
                            onMouseEnter={() => setActiveStep(step.step)}
                            onMouseLeave={() => setActiveStep(null)}
                        >
                            {/* Step indicator */}
                            <div className={cn(
                                "absolute left-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all",
                                activeStep === step.step
                                    ? "bg-primary text-background scale-110 shadow-lg shadow-primary/30"
                                    : "bg-white/5 text-muted-foreground border border-white/10"
                            )}>
                                {step.step}
                            </div>

                            <div className={cn(
                                "p-5 rounded-2xl bg-white/[0.02] border border-white/5 transition-all",
                                activeStep === step.step && "bg-white/5 border-primary/20"
                            )}>
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase">{step.from}</span>
                                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                    <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">{step.to}</span>
                                    {step.protocol && (
                                        <span className="px-2 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-[10px] font-mono">{step.protocol}</span>
                                    )}
                                </div>

                                <p className="text-sm font-medium mb-2">{step.action}</p>

                                {step.data && (
                                    <div className="mt-3 p-3 rounded-xl bg-black/20 border border-white/5">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block mb-1">Payload</span>
                                        <code className="text-xs font-mono text-amber-400">{step.data}</code>
                                    </div>
                                )}

                                {step.note && activeStep === step.step && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-3 text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3"
                                    >
                                        {step.note}
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ============================================================
// TRADE-OFF ANALYSIS COMPONENT
// ============================================================

interface TradeOff {
    option: string;
    pros: string[];
    cons: string[];
    bestFor?: string;
    complexity?: 'Low' | 'Medium' | 'High';
    performance?: 'Low' | 'Medium' | 'High';
    recommended?: boolean;
}

interface TradeOffAnalysisProps {
    title: string;
    context?: string;
    tradeoffs: TradeOff[];
}

export function TradeOffAnalysis({ title, context, tradeoffs }: TradeOffAnalysisProps) {
    const [selectedOption, setSelectedOption] = useState(0);

    return (
        <div className="my-12 p-6 md:p-10 rounded-[2rem] bg-muted/10 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <Scale className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                    <h3 className="text-xl font-black tracking-tight">{title}</h3>
                    {context && <p className="text-sm text-muted-foreground mt-1">{context}</p>}
                </div>
            </div>

            {/* Option Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {tradeoffs.map((to, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedOption(idx)}
                        className={cn(
                            "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border",
                            selectedOption === idx
                                ? "bg-primary text-background border-primary shadow-lg shadow-primary/20"
                                : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10"
                        )}
                    >
                        {to.option}
                        {to.recommended && (
                            <span className="ml-2 px-1.5 py-0.5 rounded bg-emerald-500 text-background text-[8px]">★</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Selected Trade-off Details */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedOption}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid md:grid-cols-2 gap-6"
                >
                    {/* Pros */}
                    <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                            <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400">Advantages</h4>
                        </div>
                        <ul className="space-y-2">
                            {tradeoffs[selectedOption].pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{pro}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cons */}
                    <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingDown className="w-4 h-4 text-rose-400" />
                            <h4 className="text-sm font-black uppercase tracking-widest text-rose-400">Disadvantages</h4>
                        </div>
                        <ul className="space-y-2">
                            {tradeoffs[selectedOption].cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                    <span>{con}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Best For & Metrics */}
            {(tradeoffs[selectedOption].bestFor || tradeoffs[selectedOption].complexity) && (
                <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center gap-6">
                    {tradeoffs[selectedOption].bestFor && (
                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" />
                            <span className="text-xs"><strong>Best for:</strong> {tradeoffs[selectedOption].bestFor}</span>
                        </div>
                    )}
                    {tradeoffs[selectedOption].complexity && (
                        <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-amber-400" />
                            <span className="text-xs"><strong>Complexity:</strong> {tradeoffs[selectedOption].complexity}</span>
                        </div>
                    )}
                    {tradeoffs[selectedOption].performance && (
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs"><strong>Performance:</strong> {tradeoffs[selectedOption].performance}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ============================================================
// FAILURE SCENARIOS COMPONENT
// ============================================================

interface FailureScenario {
    scenario: string;
    description: string;
    impact: 'Low' | 'Medium' | 'High' | 'Critical';
    mitigation: string;
    detection?: string;
    recovery?: string;
}

interface FailureScenariosProps {
    title: string;
    scenarios: FailureScenario[];
}

const impactColors = {
    Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    High: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Critical: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
};

export function FailureScenarios({ title, scenarios }: FailureScenariosProps) {
    const [expandedScenario, setExpandedScenario] = useState<number | null>(null);

    return (
        <div className="my-12 p-6 md:p-10 rounded-[2rem] bg-muted/10 border border-white/5">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                    <h3 className="text-xl font-black tracking-tight">{title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">What could go wrong and how to handle it</p>
                </div>
            </div>

            <div className="space-y-3">
                {scenarios.map((scenario, idx) => (
                    <motion.div
                        key={idx}
                        layout
                        className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden"
                    >
                        <button
                            onClick={() => setExpandedScenario(expandedScenario === idx ? null : idx)}
                            className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <span className={cn("px-2 py-1 rounded-lg text-[10px] font-black uppercase border", impactColors[scenario.impact])}>
                                    {scenario.impact}
                                </span>
                                <span className="font-bold text-sm">{scenario.scenario}</span>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedScenario === idx ? 180 : 0 }}
                            >
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {expandedScenario === idx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-5 pb-5 space-y-4">
                                        <p className="text-sm text-muted-foreground">{scenario.description}</p>

                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                                <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Mitigation</h5>
                                                <p className="text-xs leading-relaxed">{scenario.mitigation}</p>
                                            </div>

                                            {scenario.detection && (
                                                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Detection</h5>
                                                    <p className="text-xs leading-relaxed">{scenario.detection}</p>
                                                </div>
                                            )}

                                            {scenario.recovery && (
                                                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-2">Recovery</h5>
                                                    <p className="text-xs leading-relaxed">{scenario.recovery}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ============================================================
// EXPANDABLE DEEP DIVE COMPONENT
// ============================================================

interface DeepDiveProps {
    title: string;
    icon?: 'performance' | 'security' | 'alternative' | 'deep';
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export function DeepDive({ title, icon = 'deep', children, defaultOpen = false }: DeepDiveProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const icons = {
        performance: { Icon: Zap, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
        security: { Icon: Shield, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
        alternative: { Icon: GitBranch, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
        deep: { Icon: Layers, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' }
    };

    const { Icon, color } = icons[icon];

    return (
        <div className="my-8 rounded-2xl border border-white/10 overflow-hidden bg-muted/5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center border", color)}>
                        <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm">{title}</span>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 border-t border-white/5 pt-5">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
