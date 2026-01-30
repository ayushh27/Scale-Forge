"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
    ChevronRight,
    CheckCircle2,
    Lock,
    Flame,
    Target,
    Clock,
    TrendingUp,
    BookOpen,
    ArrowRight,
    Play
} from 'lucide-react';
import {
    LearningPath,
    LearningTopic,
    DifficultyLevel,
    TopicContext
} from '@/data/learning-paths';
import { useLearning, usePathProgress } from '@/hooks/useLearningProgress';

// Difficulty badge colors
const difficultyStyles = {
    beginner: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    intermediate: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    advanced: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
};

const difficultyLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
};

/**
 * PathProgressCard - Shows learning path progress overview
 */
interface PathProgressCardProps {
    path: LearningPath;
    className?: string;
    variant?: 'compact' | 'full';
}

export function PathProgressCard({ path, className, variant = 'full' }: PathProgressCardProps) {
    const { progress, completion, nextTopic, isStarted, startPath } = usePathProgress(path.id);
    const Icon = path.icon;

    if (variant === 'compact') {
        return (
            <Link
                href={nextTopic ? `/learn/${nextTopic.slug}` : `/hub/${path.id}`}
                className={cn(
                    "block p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group",
                    className
                )}
            >
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        `bg-${path.color}-500/10 border border-${path.color}-500/20`
                    )}>
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">
                            {path.title}
                        </h4>
                        <div className="h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-500"
                                style={{ width: `${completion}%` }}
                            />
                        </div>
                    </div>
                    <span className="text-xs font-bold text-muted-foreground">
                        {Math.round(completion)}%
                    </span>
                </div>
            </Link>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-start gap-4">
                <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0",
                    `bg-${path.color}-500/10 border border-${path.color}-500/20`
                )}>
                    <Icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-black text-lg tracking-tight">{path.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {path.description}
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-xl bg-white/5">
                    <div className="text-xl font-black">{path.totalTopics}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Topics</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5">
                    <div className="text-xl font-black">{path.estimatedHours}h</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Duration</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-primary/10">
                    <div className="text-xl font-black text-primary">{Math.round(completion)}%</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Complete</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${completion}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    />
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <span>{progress?.completedTopics.length || 0} completed</span>
                    <span>{path.totalTopics - (progress?.completedTopics.length || 0)} remaining</span>
                </div>
            </div>

            {/* Action Button */}
            {nextTopic ? (
                <Link
                    href={`/learn/${nextTopic.slug}`}
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary text-background rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform"
                >
                    {isStarted ? (
                        <>
                            Continue Learning
                            <ArrowRight className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            Start Path
                            <Play className="w-4 h-4" />
                        </>
                    )}
                </Link>
            ) : (
                <div className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-500/10 text-emerald-400 rounded-xl font-black text-sm uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4" />
                    Path Completed
                </div>
            )}
        </motion.div>
    );
}

/**
 * ContinueLearningCard - Shows where to pick up
 */
interface ContinueLearningCardProps {
    className?: string;
}

export function ContinueLearningCard({ className }: ContinueLearningCardProps) {
    const { getContinueLearning, getStreak, getTotalCompleted } = useLearning();
    const suggestion = getContinueLearning();
    const streak = getStreak();
    const totalCompleted = getTotalCompleted();

    if (!suggestion) {
        return (
            <div className={cn(
                "p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20",
                className
            )}>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-black text-lg">Start Your Journey</h3>
                        <p className="text-sm text-muted-foreground">Choose a learning path to begin</p>
                    </div>
                </div>
                <Link
                    href="/hub"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-background rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform"
                >
                    Explore Paths
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    const { path, topic } = suggestion;
    const Icon = path.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 space-y-5",
                className
            )}
        >
            {/* Header with Streak */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-black text-lg">Continue Learning</h3>
                        <p className="text-xs text-muted-foreground font-bold">{totalCompleted} topics completed</p>
                    </div>
                </div>
                {streak.current > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
                        <Flame className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-black text-amber-400">{streak.current} day streak</span>
                    </div>
                )}
            </div>

            {/* Current Topic */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
                    <Icon className="w-3 h-3" />
                    {path.title}
                </div>
                <h4 className="font-bold text-lg mb-2">{topic.title}</h4>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className={cn(
                        "px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase",
                        difficultyStyles[topic.difficulty]
                    )}>
                        {difficultyLabels[topic.difficulty]}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {topic.estimatedMinutes} min
                    </span>
                </div>
            </div>

            {/* Action */}
            <Link
                href={`/learn/${topic.slug}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-background rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform"
            >
                Continue
                <ArrowRight className="w-4 h-4" />
            </Link>
        </motion.div>
    );
}

/**
 * TopicNavigationCard - Shows previous/next topic navigation
 */
interface TopicNavigationCardProps {
    context: TopicContext;
    className?: string;
}

export function TopicNavigationCard({ context, className }: TopicNavigationCardProps) {
    const { navigation, position, path } = context;
    const Icon = path.icon;

    return (
        <div className={cn("space-y-4", className)}>
            {/* Progress Header */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            {path.title}
                        </div>
                        <div className="text-sm font-bold">
                            Topic {position.current} of {position.total}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-black text-primary">
                        {Math.round((position.current / position.total) * 100)}%
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Progress
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-3">
                {navigation.previous ? (
                    <Link
                        href={`/learn/${navigation.previous.slug}`}
                        className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group"
                    >
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
                            ← Previous
                        </div>
                        <div className="text-sm font-bold truncate group-hover:text-primary transition-colors">
                            {navigation.previous.title}
                        </div>
                    </Link>
                ) : (
                    <div />
                )}

                {navigation.next ? (
                    <Link
                        href={`/learn/${navigation.next.slug}`}
                        className="p-4 rounded-xl bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all group text-right"
                    >
                        <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">
                            Next →
                        </div>
                        <div className="text-sm font-bold truncate group-hover:text-primary transition-colors">
                            {navigation.next.title}
                        </div>
                    </Link>
                ) : navigation.nextPhase ? (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-right">
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">
                            Phase Complete! →
                        </div>
                        <div className="text-sm font-bold text-emerald-400 truncate">
                            {navigation.nextPhase.title}
                        </div>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
}

/**
 * TopicContextCard - Shows where topic fits in learning path
 */
interface TopicContextCardProps {
    context: TopicContext;
    className?: string;
}

export function TopicContextCard({ context, className }: TopicContextCardProps) {
    const { topic, path, phase, position, prerequisites, isCompleted, isLocked } = context;
    const Icon = path.icon;

    return (
        <div className={cn(
            "p-5 rounded-2xl border",
            isLocked
                ? "bg-rose-500/5 border-rose-500/20"
                : isCompleted
                    ? "bg-emerald-500/5 border-emerald-500/20"
                    : "bg-white/5 border-white/5",
            className
        )}>
            {/* Path Badge */}
            <div className="flex items-center gap-2 mb-4">
                <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    `bg-${path.color}-500/10`
                )}>
                    <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        {path.title}
                    </div>
                    <div className="text-xs font-bold">{phase.title}</div>
                </div>
                <span className={cn(
                    "px-2 py-1 rounded-full border text-[9px] font-black uppercase",
                    difficultyStyles[topic.difficulty]
                )}>
                    {difficultyLabels[topic.difficulty]}
                </span>
            </div>

            {/* Position */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Target className="w-3.5 h-3.5" />
                <span className="font-bold">
                    Topic {position.phasePosition} of {position.phaseTotal} in {phase.title}
                </span>
            </div>

            {/* Prerequisites */}
            {prerequisites.length > 0 && (
                <div className="space-y-2 mb-4">
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
                                    ? "bg-emerald-500/10 text-emerald-400"
                                    : "bg-white/5 text-muted-foreground hover:text-foreground"
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

            {/* Status */}
            {isCompleted && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    Completed
                </div>
            )}
            {isLocked && (
                <div className="flex items-center gap-2 text-rose-400 text-sm font-bold">
                    <Lock className="w-4 h-4" />
                    Complete prerequisites first
                </div>
            )}
        </div>
    );
}

/**
 * PathRoadmap - Visual roadmap of a learning path
 */
interface PathRoadmapProps {
    path: LearningPath;
    className?: string;
}

export function PathRoadmap({ path, className }: PathRoadmapProps) {
    const { progress } = usePathProgress(path.id);
    const completedTopics = progress?.completedTopics || [];

    const phases = [
        { level: 'beginner' as DifficultyLevel, phase: path.phases.beginner },
        { level: 'intermediate' as DifficultyLevel, phase: path.phases.intermediate },
        { level: 'advanced' as DifficultyLevel, phase: path.phases.advanced },
    ];

    return (
        <div className={cn("space-y-8", className)}>
            {phases.map(({ level, phase }, phaseIndex) => {
                const phaseCompleted = phase.topics.every(t => completedTopics.includes(t.slug));
                const phaseProgress = phase.topics.filter(t => completedTopics.includes(t.slug)).length;

                return (
                    <div key={level} className="space-y-4">
                        {/* Phase Header */}
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-black text-lg",
                                phaseCompleted
                                    ? "bg-emerald-500 text-white"
                                    : phaseProgress > 0
                                        ? "bg-primary/20 text-primary border-2 border-primary"
                                        : "bg-white/10 text-muted-foreground border-2 border-white/20"
                            )}>
                                {phaseCompleted ? <CheckCircle2 className="w-5 h-5" /> : phaseIndex + 1}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-black text-lg">{phase.title}</h3>
                                <p className="text-sm text-muted-foreground">{phase.description}</p>
                            </div>
                            <span className={cn(
                                "px-3 py-1 rounded-full border text-xs font-black uppercase",
                                difficultyStyles[level]
                            )}>
                                {phaseProgress}/{phase.topics.length}
                            </span>
                        </div>

                        {/* Topics */}
                        <div className="ml-5 border-l-2 border-white/10 pl-8 space-y-3">
                            {phase.topics.map((topic, topicIndex) => {
                                const isCompleted = completedTopics.includes(topic.slug);
                                const isNext = !isCompleted &&
                                    phase.topics.slice(0, topicIndex).every(t => completedTopics.includes(t.slug));

                                return (
                                    <Link
                                        key={topic.slug}
                                        href={`/learn/${topic.slug}`}
                                        className={cn(
                                            "relative flex items-center gap-4 p-4 rounded-xl transition-all group",
                                            isCompleted
                                                ? "bg-emerald-500/10 border border-emerald-500/20"
                                                : isNext
                                                    ? "bg-primary/10 border border-primary/20 hover:border-primary/40"
                                                    : "bg-white/5 border border-white/5 hover:border-white/10"
                                        )}
                                    >
                                        {/* Connection dot */}
                                        <div className={cn(
                                            "absolute -left-[2.1rem] w-3 h-3 rounded-full",
                                            isCompleted
                                                ? "bg-emerald-500"
                                                : isNext
                                                    ? "bg-primary animate-pulse"
                                                    : "bg-white/20"
                                        )} />

                                        {/* Icon */}
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center",
                                            isCompleted
                                                ? "bg-emerald-500/20"
                                                : "bg-white/10"
                                        )}>
                                            {isCompleted ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            ) : (
                                                <span className="text-xs font-black text-muted-foreground">
                                                    {topicIndex + 1}
                                                </span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-sm group-hover:text-primary transition-colors truncate">
                                                {topic.title}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                <Clock className="w-3 h-3" />
                                                {topic.estimatedMinutes} min
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <ChevronRight className={cn(
                                            "w-4 h-4 transition-transform group-hover:translate-x-1",
                                            isCompleted ? "text-emerald-400" : "text-muted-foreground"
                                        )} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
