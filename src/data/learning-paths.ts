import { LucideIcon } from "lucide-react";
import { HUB_REGISTRY, HubData } from "./hubs";

// Types for structured learning system

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface LearningTopic {
    id: string;
    slug: string;
    title: string;
    description: string;
    difficulty: DifficultyLevel;
    estimatedMinutes: number;
    prerequisites: string[]; // Array of topic slugs
    outcomes: string[]; // What you'll learn
    hubId: string;
    phase: DifficultyLevel;
    order: number; // Position within phase
}

export interface LearningPath {
    id: string;
    hubId: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    totalTopics: number;
    estimatedHours: number;
    phases: {
        beginner: LearningPhase;
        intermediate: LearningPhase;
        advanced: LearningPhase;
    };
}

export interface LearningPhase {
    title: string;
    description: string;
    topics: LearningTopic[];
    requiredToAdvance: number; // Minimum topics to complete before next phase
}

export interface UserLearningProgress {
    // Track per-path progress
    paths: Record<string, PathProgress>;
    // Global stats
    totalCompleted: number;
    totalTimeSpent: number; // minutes
    currentStreak: number; // days
    longestStreak: number;
    lastActiveDate: string; // ISO date
    // Continue learning context
    lastPath?: string;
    lastTopic?: string;
}

export interface PathProgress {
    pathId: string;
    startedAt: string;
    completedTopics: string[]; // slugs
    currentPhase: DifficultyLevel;
    currentTopic?: string;
    timeSpent: number; // minutes
    lastAccessedAt: string;
}

export interface TopicContext {
    topic: LearningTopic;
    path: LearningPath;
    phase: LearningPhase;
    position: {
        current: number;
        total: number;
        phasePosition: number;
        phaseTotal: number;
    };
    navigation: {
        previous?: LearningTopic;
        next?: LearningTopic;
        nextPhase?: LearningPhase;
    };
    prerequisites: {
        topic: LearningTopic;
        completed: boolean;
    }[];
    isCompleted: boolean;
    isLocked: boolean; // True if prerequisites not met
}

// Helper function to convert hub data to learning paths
export function hubToLearningPath(hub: HubData): LearningPath {
    const phases = {
        beginner: createLearningPhase(hub, 'beginner'),
        intermediate: createLearningPhase(hub, 'intermediate'),
        advanced: createLearningPhase(hub, 'advanced'),
    };

    const totalTopics =
        phases.beginner.topics.length +
        phases.intermediate.topics.length +
        phases.advanced.topics.length;

    // Estimate 20-30 mins per topic
    const estimatedHours = Math.ceil(totalTopics * 25 / 60);

    return {
        id: hub.id,
        hubId: hub.id,
        title: hub.title,
        description: hub.description,
        icon: hub.icon,
        color: hub.color,
        totalTopics,
        estimatedHours,
        phases,
    };
}

function createLearningPhase(hub: HubData, level: DifficultyLevel): LearningPhase {
    const phase = hub.progression[level];

    return {
        title: phase.title,
        description: phase.description,
        topics: phase.topics.map((topic, index) => ({
            id: `${hub.id}-${level}-${index}`,
            slug: extractSlugFromHref(topic.href),
            title: topic.label,
            description: '', // Can be enriched from article data
            difficulty: level,
            estimatedMinutes: level === 'beginner' ? 20 : level === 'intermediate' ? 30 : 40,
            prerequisites: index > 0
                ? [extractSlugFromHref(phase.topics[index - 1].href)]
                : level !== 'beginner'
                    ? getLastTopicOfPreviousPhase(hub, level)
                    : [],
            outcomes: [], // Can be enriched from article data
            hubId: hub.id,
            phase: level,
            order: index,
        })),
        requiredToAdvance: Math.ceil(phase.topics.length * 0.75), // 75% completion required
    };
}

function extractSlugFromHref(href: string): string {
    return href.split('/').pop() || '';
}

function getLastTopicOfPreviousPhase(hub: HubData, currentLevel: DifficultyLevel): string[] {
    if (currentLevel === 'beginner') return [];

    const prevLevel = currentLevel === 'intermediate' ? 'beginner' : 'intermediate';
    const prevPhase = hub.progression[prevLevel];

    if (prevPhase.topics.length === 0) return [];

    return [extractSlugFromHref(prevPhase.topics[prevPhase.topics.length - 1].href)];
}

// Generate all learning paths from hub registry
export const LEARNING_PATHS: Record<string, LearningPath> = Object.fromEntries(
    Object.entries(HUB_REGISTRY).map(([key, hub]) => [key, hubToLearningPath(hub)])
);

// Get topic context for a given slug
export function getTopicContext(
    slug: string,
    completedTopics: string[] = []
): TopicContext | null {
    // Find the topic across all paths
    for (const path of Object.values(LEARNING_PATHS)) {
        for (const [phaseKey, phase] of Object.entries(path.phases)) {
            const topicIndex = phase.topics.findIndex(t => t.slug === slug);

            if (topicIndex !== -1) {
                const topic = phase.topics[topicIndex];
                const allTopics = [
                    ...path.phases.beginner.topics,
                    ...path.phases.intermediate.topics,
                    ...path.phases.advanced.topics,
                ];
                const globalIndex = allTopics.findIndex(t => t.slug === slug);

                // Check if prerequisites are met
                const prereqStatus = topic.prerequisites.map(prereqSlug => {
                    const prereqTopic = allTopics.find(t => t.slug === prereqSlug);
                    return {
                        topic: prereqTopic!,
                        completed: completedTopics.includes(prereqSlug),
                    };
                }).filter(p => p.topic);

                const isLocked = prereqStatus.some(p => !p.completed) && topicIndex > 0;

                // Get navigation
                const previous = topicIndex > 0
                    ? phase.topics[topicIndex - 1]
                    : getLastTopicOfPrevPhase(path, phaseKey as DifficultyLevel);

                const next = topicIndex < phase.topics.length - 1
                    ? phase.topics[topicIndex + 1]
                    : getFirstTopicOfNextPhase(path, phaseKey as DifficultyLevel);

                const nextPhase = getNextPhase(path, phaseKey as DifficultyLevel);

                return {
                    topic,
                    path,
                    phase,
                    position: {
                        current: globalIndex + 1,
                        total: allTopics.length,
                        phasePosition: topicIndex + 1,
                        phaseTotal: phase.topics.length,
                    },
                    navigation: {
                        previous,
                        next,
                        nextPhase,
                    },
                    prerequisites: prereqStatus,
                    isCompleted: completedTopics.includes(slug),
                    isLocked,
                };
            }
        }
    }

    return null;
}

function getLastTopicOfPrevPhase(path: LearningPath, currentPhase: DifficultyLevel): LearningTopic | undefined {
    if (currentPhase === 'beginner') return undefined;

    const prevPhase = currentPhase === 'intermediate'
        ? path.phases.beginner
        : path.phases.intermediate;

    return prevPhase.topics[prevPhase.topics.length - 1];
}

function getFirstTopicOfNextPhase(path: LearningPath, currentPhase: DifficultyLevel): LearningTopic | undefined {
    if (currentPhase === 'advanced') return undefined;

    const nextPhase = currentPhase === 'beginner'
        ? path.phases.intermediate
        : path.phases.advanced;

    return nextPhase.topics[0];
}

function getNextPhase(path: LearningPath, currentPhase: DifficultyLevel): LearningPhase | undefined {
    if (currentPhase === 'advanced') return undefined;

    return currentPhase === 'beginner'
        ? path.phases.intermediate
        : path.phases.advanced;
}

// Calculate path progress percentage
export function calculatePathProgress(path: LearningPath, completedTopics: string[]): number {
    const allTopics = [
        ...path.phases.beginner.topics,
        ...path.phases.intermediate.topics,
        ...path.phases.advanced.topics,
    ];

    const completed = allTopics.filter(t => completedTopics.includes(t.slug)).length;
    return allTopics.length > 0 ? (completed / allTopics.length) * 100 : 0;
}

// Get recommended next topic for a path
export function getNextRecommendedTopic(
    path: LearningPath,
    completedTopics: string[]
): LearningTopic | null {
    const allTopics = [
        ...path.phases.beginner.topics,
        ...path.phases.intermediate.topics,
        ...path.phases.advanced.topics,
    ];

    // Find first uncompleted topic
    return allTopics.find(t => !completedTopics.includes(t.slug)) || null;
}

// Get continue learning suggestions
export function getContinueLearning(
    progress: UserLearningProgress
): { path: LearningPath; topic: LearningTopic } | null {
    if (!progress.lastPath || !progress.lastTopic) {
        // No recent activity - recommend starting a path
        const firstPath = Object.values(LEARNING_PATHS)[0];
        if (firstPath && firstPath.phases.beginner.topics.length > 0) {
            return {
                path: firstPath,
                topic: firstPath.phases.beginner.topics[0],
            };
        }
        return null;
    }

    const path = LEARNING_PATHS[progress.lastPath];
    if (!path) return null;

    const pathProgress = progress.paths[path.id];
    const completedTopics = pathProgress?.completedTopics || [];

    const nextTopic = getNextRecommendedTopic(path, completedTopics);
    if (nextTopic) {
        return { path, topic: nextTopic };
    }

    return null;
}
