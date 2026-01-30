"use client";

import { useState, useEffect, useCallback, useMemo, createContext, useContext, ReactNode } from 'react';
import {
    UserLearningProgress,
    PathProgress,
    LearningPath,
    LearningTopic,
    LEARNING_PATHS,
    getNextRecommendedTopic,
    calculatePathProgress,
    getContinueLearning,
    getTopicContext,
    TopicContext,
    DifficultyLevel
} from '@/data/learning-paths';

const STORAGE_KEY = 'scaleforge_learning_progress';
const STREAK_KEY = 'scaleforge_streak_data';

interface LearningContextValue {
    // Progress data
    progress: UserLearningProgress;

    // Path-level operations
    getPathProgress: (pathId: string) => PathProgress | undefined;
    calculatePathCompletion: (pathId: string) => number;
    startPath: (pathId: string) => void;

    // Topic-level operations
    markTopicComplete: (pathId: string, topicSlug: string) => void;
    markTopicStarted: (pathId: string, topicSlug: string) => void;
    isTopicCompleted: (topicSlug: string) => boolean;
    getTopicContext: (slug: string) => TopicContext | null;

    // Continue learning
    getContinueLearning: () => { path: LearningPath; topic: LearningTopic } | null;
    getNextTopic: (pathId: string) => LearningTopic | null;

    // Stats
    getTotalCompleted: () => number;
    getStreak: () => { current: number; longest: number };

    // Time tracking
    logTimeSpent: (pathId: string, minutes: number) => void;
}

const LearningContext = createContext<LearningContextValue | null>(null);

export function useLearning() {
    const context = useContext(LearningContext);
    if (!context) {
        throw new Error('useLearning must be used within a LearningProvider');
    }
    return context;
}

// Default progress state
const defaultProgress: UserLearningProgress = {
    paths: {},
    totalCompleted: 0,
    totalTimeSpent: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: '',
};

interface LearningProviderProps {
    children: ReactNode;
}

export function LearningProvider({ children }: LearningProviderProps) {
    const [progress, setProgress] = useState<UserLearningProgress>(defaultProgress);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                setProgress(parsed);
            }

            // Update streak data
            updateStreak();
            setIsLoaded(true);
        } catch (e) {
            console.error('Failed to load learning progress:', e);
            setIsLoaded(true);
        }
    }, []);

    // Save to localStorage whenever progress changes
    const saveProgress = useCallback((newProgress: UserLearningProgress) => {
        setProgress(newProgress);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
        } catch (e) {
            console.error('Failed to save learning progress:', e);
        }
    }, []);

    // Update daily streak
    const updateStreak = useCallback(() => {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        setProgress(prev => {
            if (prev.lastActiveDate === today) {
                // Already active today
                return prev;
            }

            let newStreak = prev.currentStreak;

            if (prev.lastActiveDate === yesterday) {
                // Continuing streak
                newStreak = prev.currentStreak + 1;
            } else if (prev.lastActiveDate !== today) {
                // Streak broken
                newStreak = 1;
            }

            const newProgress = {
                ...prev,
                currentStreak: newStreak,
                longestStreak: Math.max(prev.longestStreak, newStreak),
                lastActiveDate: today,
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
            return newProgress;
        });
    }, []);

    // Get path progress
    const getPathProgress = useCallback((pathId: string): PathProgress | undefined => {
        return progress.paths[pathId];
    }, [progress.paths]);

    // Calculate path completion percentage
    const calculatePathCompletion = useCallback((pathId: string): number => {
        const path = LEARNING_PATHS[pathId];
        if (!path) return 0;

        const pathProgress = progress.paths[pathId];
        const completedTopics = pathProgress?.completedTopics || [];

        return calculatePathProgress(path, completedTopics);
    }, [progress.paths]);

    // Start a learning path
    const startPath = useCallback((pathId: string) => {
        const path = LEARNING_PATHS[pathId];
        if (!path) return;

        const now = new Date().toISOString();

        // Only initialize if not already started
        if (progress.paths[pathId]) {
            // Update last accessed
            const newProgress = {
                ...progress,
                paths: {
                    ...progress.paths,
                    [pathId]: {
                        ...progress.paths[pathId],
                        lastAccessedAt: now,
                    },
                },
                lastPath: pathId,
            };
            saveProgress(newProgress);
            return;
        }

        const pathProgress: PathProgress = {
            pathId,
            startedAt: now,
            completedTopics: [],
            currentPhase: 'beginner',
            currentTopic: path.phases.beginner.topics[0]?.slug,
            timeSpent: 0,
            lastAccessedAt: now,
        };

        const newProgress = {
            ...progress,
            paths: {
                ...progress.paths,
                [pathId]: pathProgress,
            },
            lastPath: pathId,
            lastTopic: path.phases.beginner.topics[0]?.slug,
        };

        saveProgress(newProgress);
    }, [progress, saveProgress]);

    // Mark topic as complete
    const markTopicComplete = useCallback((pathId: string, topicSlug: string) => {
        const path = LEARNING_PATHS[pathId];
        if (!path) return;

        const pathProgress = progress.paths[pathId] || {
            pathId,
            startedAt: new Date().toISOString(),
            completedTopics: [],
            currentPhase: 'beginner' as DifficultyLevel,
            timeSpent: 0,
            lastAccessedAt: new Date().toISOString(),
        };

        // Don't duplicate
        if (pathProgress.completedTopics.includes(topicSlug)) return;

        const completedTopics = [...pathProgress.completedTopics, topicSlug];

        // Determine current phase based on completions
        let currentPhase: DifficultyLevel = 'beginner';
        const beginnerComplete = path.phases.beginner.topics.every(t =>
            completedTopics.includes(t.slug)
        );
        const intermediateComplete = path.phases.intermediate.topics.every(t =>
            completedTopics.includes(t.slug)
        );

        if (beginnerComplete && intermediateComplete) {
            currentPhase = 'advanced';
        } else if (beginnerComplete) {
            currentPhase = 'intermediate';
        }

        // Get next topic
        const nextTopic = getNextRecommendedTopic(path, completedTopics);

        const newProgress: UserLearningProgress = {
            ...progress,
            paths: {
                ...progress.paths,
                [pathId]: {
                    ...pathProgress,
                    completedTopics,
                    currentPhase,
                    currentTopic: nextTopic?.slug,
                    lastAccessedAt: new Date().toISOString(),
                },
            },
            totalCompleted: progress.totalCompleted + 1,
            lastPath: pathId,
            lastTopic: nextTopic?.slug || topicSlug,
        };

        saveProgress(newProgress);
        updateStreak();
    }, [progress, saveProgress, updateStreak]);

    // Mark topic as started (for "continue" tracking)
    const markTopicStarted = useCallback((pathId: string, topicSlug: string) => {
        const pathProgress = progress.paths[pathId];

        const newProgress: UserLearningProgress = {
            ...progress,
            paths: {
                ...progress.paths,
                [pathId]: {
                    ...(pathProgress || {
                        pathId,
                        startedAt: new Date().toISOString(),
                        completedTopics: [],
                        currentPhase: 'beginner' as DifficultyLevel,
                        timeSpent: 0,
                    }),
                    currentTopic: topicSlug,
                    lastAccessedAt: new Date().toISOString(),
                },
            },
            lastPath: pathId,
            lastTopic: topicSlug,
        };

        saveProgress(newProgress);
        updateStreak();
    }, [progress, saveProgress, updateStreak]);

    // Check if topic is completed
    const isTopicCompleted = useCallback((topicSlug: string): boolean => {
        return Object.values(progress.paths).some(p =>
            p.completedTopics.includes(topicSlug)
        );
    }, [progress.paths]);

    // Get topic context
    const getTopicContextForSlug = useCallback((slug: string): TopicContext | null => {
        const completedTopics = Object.values(progress.paths).flatMap(p => p.completedTopics);
        return getTopicContext(slug, completedTopics);
    }, [progress.paths]);

    // Get continue learning suggestion
    const getContinueLearningFn = useCallback(() => {
        return getContinueLearning(progress);
    }, [progress]);

    // Get next topic for a path
    const getNextTopic = useCallback((pathId: string): LearningTopic | null => {
        const path = LEARNING_PATHS[pathId];
        if (!path) return null;

        const pathProgress = progress.paths[pathId];
        const completedTopics = pathProgress?.completedTopics || [];

        return getNextRecommendedTopic(path, completedTopics);
    }, [progress.paths]);

    // Get total completed count
    const getTotalCompleted = useCallback((): number => {
        return Object.values(progress.paths).reduce(
            (sum, p) => sum + p.completedTopics.length,
            0
        );
    }, [progress.paths]);

    // Get streak data
    const getStreak = useCallback(() => ({
        current: progress.currentStreak,
        longest: progress.longestStreak,
    }), [progress.currentStreak, progress.longestStreak]);

    // Log time spent
    const logTimeSpent = useCallback((pathId: string, minutes: number) => {
        const pathProgress = progress.paths[pathId];
        if (!pathProgress) return;

        const newProgress = {
            ...progress,
            paths: {
                ...progress.paths,
                [pathId]: {
                    ...pathProgress,
                    timeSpent: pathProgress.timeSpent + minutes,
                },
            },
            totalTimeSpent: progress.totalTimeSpent + minutes,
        };

        saveProgress(newProgress);
    }, [progress, saveProgress]);

    const value: LearningContextValue = {
        progress,
        getPathProgress,
        calculatePathCompletion,
        startPath,
        markTopicComplete,
        markTopicStarted,
        isTopicCompleted,
        getTopicContext: getTopicContextForSlug,
        getContinueLearning: getContinueLearningFn,
        getNextTopic,
        getTotalCompleted,
        getStreak,
        logTimeSpent,
    };

    return (
        <LearningContext.Provider value={value}>
            {children}
        </LearningContext.Provider>
    );
}

// Hook to use learning context with a specific path
export function usePathProgress(pathId: string) {
    const {
        getPathProgress,
        calculatePathCompletion,
        startPath,
        getNextTopic,
        markTopicComplete,
    } = useLearning();

    const progress = getPathProgress(pathId);
    const completion = calculatePathCompletion(pathId);
    const nextTopic = getNextTopic(pathId);
    const path = LEARNING_PATHS[pathId];

    return {
        path,
        progress,
        completion,
        nextTopic,
        startPath: () => startPath(pathId),
        markComplete: (topicSlug: string) => markTopicComplete(pathId, topicSlug),
        isStarted: !!progress,
        isComplete: completion === 100,
    };
}

// Hook to use learning context with current topic
export function useTopicProgress(slug: string) {
    const {
        getTopicContext,
        isTopicCompleted,
        markTopicComplete,
        markTopicStarted,
    } = useLearning();

    const context = getTopicContext(slug);
    const completed = isTopicCompleted(slug);

    return {
        context,
        isCompleted: completed,
        markComplete: () => {
            if (context) {
                markTopicComplete(context.path.id, slug);
            }
        },
        markStarted: () => {
            if (context) {
                markTopicStarted(context.path.id, slug);
            }
        },
    };
}

export { LEARNING_PATHS };
