"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
    ChevronRight,
    ArrowRight,
    CheckCircle2,
    Lock,
    Clock,
    Target,
    BookOpen,
    Flame,
    Trophy,
    Star,
    X,
    Layers
} from 'lucide-react';
import {
    LearningPath,
    LearningTopic,
    TopicContext,
    DifficultyLevel
} from '@/data/learning-paths';
import { useLearning, useTopicProgress } from '@/hooks/useLearningProgress';
import { useState, useEffect } from 'react';

const difficultyStyles = {
    beginner: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    intermediate: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    advanced: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
};

/**
 * TopicBreadcrumb - Shows where topic fits in learning path
 */
interface TopicBreadcrumbProps {
    context: TopicContext;
    className?: string;
    articleTitle?: string;
}

export function TopicBreadcrumb({ context, className, articleTitle }: TopicBreadcrumbProps) {
    const { path, phase, topic, position } = context;
    const Icon = path.icon;

    return (
        <nav className={cn(
            "flex items-center gap-2 text-sm text-muted-foreground flex-wrap",
            className
        )}>
            <Link
                href="/hub"
                className="hover:text-primary transition-colors font-medium flex items-center gap-1.5"
            >
                <Layers className="w-3.5 h-3.5" />
                Hubs
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link
                href={`/hub/${path.id}`}
                className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium"
            >
                <Icon className="w-3.5 h-3.5" />
                {path.title}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className={cn(
                "px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase",
                difficultyStyles[topic.difficulty]
            )}>
                {phase.title}
            </span>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-foreground font-bold">
                {articleTitle || topic.title}
            </span>
            <span className="text-muted-foreground text-xs ml-1">
                ({position.phasePosition}/{position.phaseTotal})
            </span>
        </nav>
    );
}

/**
 * TopicCompletionBar - Mark topic as complete
 */
interface TopicCompletionBarProps {
    slug: string;
    className?: string;
}

export function TopicCompletionBar({ slug, className }: TopicCompletionBarProps) {
    const { context, isCompleted, markComplete } = useTopicProgress(slug);
    const [showCelebration, setShowCelebration] = useState(false);

    if (!context) return null;

    const handleComplete = () => {
        if (!isCompleted) {
            markComplete();
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 3000);
        }
    };

    const nextTopic = context.navigation.next;

    return (
        <>
            <div className={cn(
                "p-6 rounded-2xl border",
                isCompleted
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-primary/10 border-primary/20",
                className
            )}>
                {isCompleted ? (
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <h4 className="font-black text-lg text-emerald-400">Topic Completed!</h4>
                                <p className="text-sm text-muted-foreground">
                                    Great progress! Keep up the momentum.
                                </p>
                            </div>
                        </div>
                        {nextTopic && (
                            <Link
                                href={`/learn/${nextTopic.slug}`}
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform"
                            >
                                Next Topic
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <Target className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-black text-lg">Finished reading?</h4>
                                <p className="text-sm text-muted-foreground">
                                    Mark as complete to track your progress.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleComplete}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            Mark Complete
                        </button>
                    </div>
                )}
            </div>

            {/* Celebration Modal */}
            <AnimatePresence>
                {showCelebration && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm"
                        onClick={() => setShowCelebration(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-primary/20 border border-emerald-500/30 text-center max-w-md mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                animate={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                                className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center"
                            >
                                <Trophy className="w-10 h-10 text-emerald-400" />
                            </motion.div>
                            <h2 className="text-2xl font-black mb-2">🎉 Topic Completed!</h2>
                            <p className="text-muted-foreground mb-6">
                                You're making excellent progress on your learning journey.
                            </p>
                            {nextTopic && (
                                <Link
                                    href={`/learn/${nextTopic.slug}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform"
                                    onClick={() => setShowCelebration(false)}
                                >
                                    Continue to Next
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/**
 * NextTopicPreview - Preview of the next topic in sequence
 */
interface NextTopicPreviewProps {
    context: TopicContext;
    className?: string;
}

export function NextTopicPreview({ context, className }: NextTopicPreviewProps) {
    const { navigation, path } = context;

    if (!navigation.next) {
        // No more topics - path complete celebration
        return (
            <div className={cn(
                "p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-primary/10 border border-amber-500/20",
                className
            )}>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <Star className="w-7 h-7 text-amber-400" />
                    </div>
                    <div>
                        <h4 className="font-black text-lg text-amber-400">
                            {navigation.nextPhase ? 'Phase Complete!' : 'Path Complete!'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {navigation.nextPhase
                                ? `Ready to advance to ${navigation.nextPhase.title}`
                                : `You've mastered the ${path.title}!`}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const { next } = navigation;

    return (
        <Link
            href={`/learn/${next.slug}`}
            className={cn(
                "block p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group",
                className
            )}
        >
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">
                <ArrowRight className="w-3.5 h-3.5" />
                Up Next
            </div>
            <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {next.title}
            </h4>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className={cn(
                    "px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase",
                    difficultyStyles[next.difficulty]
                )}>
                    {next.difficulty}
                </span>
                <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {next.estimatedMinutes} min read
                </span>
            </div>
        </Link>
    );
}

/**
 * LearningProgressSidebar - Sidebar for article pages showing context
 */
interface LearningProgressSidebarProps {
    slug: string;
    className?: string;
}

export function LearningProgressSidebar({ slug, className }: LearningProgressSidebarProps) {
    const { context, isCompleted, markComplete } = useTopicProgress(slug);
    const { getStreak, getTotalCompleted } = useLearning();
    const streak = getStreak();
    const totalCompleted = getTotalCompleted();

    if (!context) return null;

    const { path, phase, position, navigation, prerequisites } = context;
    const Icon = path.icon;

    return (
        <div className={cn("space-y-6", className)}>
            {/* Path Progress */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            Learning Path
                        </div>
                        <div className="font-bold text-sm truncate">{path.title}</div>
                    </div>
                </div>

                {/* Phase */}
                <div className="p-3 rounded-xl bg-white/5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold">{phase.title}</span>
                        <span className={cn(
                            "px-2 py-0.5 rounded-full border text-[9px] font-black uppercase",
                            difficultyStyles[context.topic.difficulty]
                        )}>
                            {context.topic.difficulty}
                        </span>
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                        Topic {position.phasePosition} of {position.phaseTotal}
                    </div>
                </div>

                {/* Global Progress */}
                <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Path Progress</span>
                    <span className="font-bold">{position.current}/{position.total}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(position.current / position.total) * 100}%` }}
                    />
                </div>
            </div>

            {/* Prerequisites */}
            {prerequisites.length > 0 && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Prerequisites
                    </div>
                    {prerequisites.map((prereq) => (
                        <Link
                            key={prereq.topic.slug}
                            href={`/learn/${prereq.topic.slug}`}
                            className={cn(
                                "flex items-center gap-2 p-2 rounded-lg text-xs font-bold transition-colors",
                                prereq.completed
                                    ? "text-emerald-400"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {prereq.completed ? (
                                <CheckCircle2 className="w-4 h-4" />
                            ) : (
                                <Lock className="w-4 h-4" />
                            )}
                            {prereq.topic.title}
                        </Link>
                    ))}
                </div>
            )}

            {/* Stats */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Your Progress
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/5 text-center">
                        <div className="text-xl font-black">{totalCompleted}</div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                            Topics Done
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/10 text-center">
                        <div className="flex items-center justify-center gap-1">
                            <Flame className="w-5 h-5 text-amber-400" />
                            <span className="text-xl font-black">{streak.current}</span>
                        </div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                            Day Streak
                        </div>
                    </div>
                </div>
            </div>

            {/* Mark Complete */}
            {!isCompleted && (
                <button
                    onClick={markComplete}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-background rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform"
                >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark Complete
                </button>
            )}

            {/* Next Topic */}
            {navigation.next && (
                <Link
                    href={`/learn/${navigation.next.slug}`}
                    className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all group"
                >
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
                            Next Topic
                        </div>
                        <div className="font-bold text-sm truncate group-hover:text-primary transition-colors">
                            {navigation.next.title}
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
            )}
        </div>
    );
}

/**
 * RelatedTopics - Shows related topics from the same path
 */
interface RelatedTopicsProps {
    context: TopicContext;
    className?: string;
}

export function RelatedTopics({ context, className }: RelatedTopicsProps) {
    const { phase, topic, path } = context;
    const { isTopicCompleted } = useLearning();

    // Get other topics in the same phase
    const relatedTopics = phase.topics.filter(t => t.slug !== topic.slug).slice(0, 3);

    if (relatedTopics.length === 0) return null;

    return (
        <div className={cn("space-y-4", className)}>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Related Topics in {phase.title}
            </h4>
            <div className="space-y-2">
                {relatedTopics.map((related) => {
                    const completed = isTopicCompleted(related.slug);
                    return (
                        <Link
                            key={related.slug}
                            href={`/learn/${related.slug}`}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
                        >
                            {completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                                <BookOpen className="w-4 h-4 text-muted-foreground" />
                            )}
                            <span className="flex-1 text-sm font-bold truncate group-hover:text-primary transition-colors">
                                {related.title}
                            </span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
