# ScaleForge Structured Learning System

This document describes the structured learning system that transforms the platform from isolated documentation into guided learning paths.

## Philosophy

The learning system is designed to:
1. **Guide progression** - Clear path from beginner to advanced
2. **Track progress** - Persistent progress across sessions
3. **Provide context** - Every topic knows its place in the journey
4. **Celebrate achievement** - Rewards and streaks for engagement
5. **Reduce overwhelm** - Curated, intentional topic ordering

---

## Core Data Structures

### Learning Path

Each learning path is derived from a Hub and contains:

```typescript
interface LearningPath {
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
```

### Learning Topic

Each topic has:

```typescript
interface LearningTopic {
    id: string;
    slug: string;
    title: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedMinutes: number;
    prerequisites: string[]; // Array of topic slugs
    outcomes: string[]; // What you'll learn
    hubId: string;
    phase: DifficultyLevel;
    order: number;
}
```

### Topic Context

When viewing a topic, full context is available:

```typescript
interface TopicContext {
    topic: LearningTopic;
    path: LearningPath;
    phase: LearningPhase;
    position: {
        current: number;  // e.g., 5
        total: number;    // e.g., 12
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
    isLocked: boolean;
}
```

---

## Progress Tracking

### User Progress State

```typescript
interface UserLearningProgress {
    paths: Record<string, PathProgress>;
    totalCompleted: number;
    totalTimeSpent: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string;
    lastPath?: string;
    lastTopic?: string;
}
```

### Path Progress

```typescript
interface PathProgress {
    pathId: string;
    startedAt: string;
    completedTopics: string[];
    currentPhase: DifficultyLevel;
    currentTopic?: string;
    timeSpent: number;
    lastAccessedAt: string;
}
```

---

## Hooks

### `useLearning()`

Main context hook for learning system.

```tsx
const {
    // Progress data
    progress,
    
    // Path operations
    getPathProgress,
    calculatePathCompletion,
    startPath,
    
    // Topic operations
    markTopicComplete,
    markTopicStarted,
    isTopicCompleted,
    getTopicContext,
    
    // Continue learning
    getContinueLearning,
    getNextTopic,
    
    // Stats
    getTotalCompleted,
    getStreak,
    
    // Time tracking
    logTimeSpent,
} = useLearning();
```

### `usePathProgress(pathId)`

Convenience hook for path-specific operations.

```tsx
const {
    path,
    progress,
    completion,     // 0-100 percentage
    nextTopic,
    startPath,
    markComplete,
    isStarted,
    isComplete,
} = usePathProgress('dsa');
```

### `useTopicProgress(slug)`

Convenience hook for topic-specific operations.

```tsx
const {
    context,        // Full TopicContext
    isCompleted,
    markComplete,
    markStarted,
} = useTopicProgress('mastering-arrays-and-memory');
```

---

## Components

### Path-Level Components

#### `<PathProgressCard>`

Shows learning path overview with progress.

```tsx
<PathProgressCard 
    path={learningPath} 
    variant="full" // or "compact"
/>
```

Features:
- Topic count and duration
- Progress bar
- Start/Continue button
- Completion percentage

#### `<ContinueLearningCard>`

Shows personalized "pick up where you left off" card.

```tsx
<ContinueLearningCard />
```

Features:
- Current streak display
- Last topic preview
- Continue button
- Total completed count

#### `<PathRoadmap>`

Visual roadmap showing all topics in a path.

```tsx
<PathRoadmap path={learningPath} />
```

Features:
- Three-phase progression
- Completed indicators
- "Next" topic highlighting
- Estimated time per topic

### Topic-Level Components

#### `<TopicBreadcrumb>`

Navigation breadcrumb for topic context.

```tsx
<TopicBreadcrumb context={topicContext} />
```

Shows: Learning Paths > Path Name > Phase > Position

#### `<TopicCompletionBar>`

Mark topic complete with celebration.

```tsx
<TopicCompletionBar slug="mastering-arrays" />
```

Features:
- Complete/Uncomplete states
- Next topic link
- Celebration modal animation

#### `<NextTopicPreview>`

Preview of the next topic in sequence.

```tsx
<NextTopicPreview context={topicContext} />
```

Shows next topic or "Phase/Path Complete" message.

#### `<LearningProgressSidebar>`

Comprehensive sidebar for article pages.

```tsx
<LearningProgressSidebar slug="mastering-arrays" />
```

Includes:
- Path and phase info
- Progress bar
- Prerequisites status
- Streak and stats
- Mark complete button
- Next topic link

#### `<TopicNavigationCard>`

Previous/Next topic navigation.

```tsx
<TopicNavigationCard context={topicContext} />
```

#### `<TopicContextCard>`

Compact context display.

```tsx
<TopicContextCard context={topicContext} />
```

#### `<RelatedTopics>`

Related topics from same phase.

```tsx
<RelatedTopics context={topicContext} />
```

---

## Usage Patterns

### On Article Pages

```tsx
import { 
    TopicBreadcrumb,
    TopicCompletionBar,
    LearningProgressSidebar,
    NextTopicPreview
} from '@/components/learning';
import { useTopicProgress } from '@/hooks/useLearningProgress';

export default function ArticlePage({ slug }) {
    const { context, markStarted } = useTopicProgress(slug);
    
    // Track that user started reading
    useEffect(() => {
        markStarted();
    }, []);
    
    return (
        <PageLayout>
            <div className="flex gap-8">
                <main className="flex-1">
                    {/* Breadcrumb */}
                    {context && <TopicBreadcrumb context={context} />}
                    
                    {/* Article Content */}
                    <ArticleReader content={article.content}>
                        {children}
                    </ArticleReader>
                    
                    {/* Completion & Next */}
                    <TopicCompletionBar slug={slug} />
                    {context && <NextTopicPreview context={context} />}
                </main>
                
                {/* Sidebar */}
                <aside className="w-80">
                    <LearningProgressSidebar slug={slug} />
                </aside>
            </div>
        </PageLayout>
    );
}
```

### On Hub Pages

```tsx
import { PathProgressCard, PathRoadmap } from '@/components/learning';
import { LEARNING_PATHS } from '@/hooks/useLearningProgress';

export default function HubPage({ hubId }) {
    const path = LEARNING_PATHS[hubId];
    
    return (
        <PageLayout>
            <PathProgressCard path={path} variant="full" />
            <PathRoadmap path={path} />
        </PageLayout>
    );
}
```

### On Dashboard/Home

```tsx
import { ContinueLearningCard, PathProgressCard } from '@/components/learning';
import { LEARNING_PATHS } from '@/hooks/useLearningProgress';

export default function DashboardPage() {
    return (
        <PageLayout>
            {/* Continue where you left off */}
            <ContinueLearningCard />
            
            {/* All paths */}
            <div className="grid grid-cols-2 gap-6">
                {Object.values(LEARNING_PATHS).map(path => (
                    <PathProgressCard 
                        key={path.id} 
                        path={path} 
                        variant="compact" 
                    />
                ))}
            </div>
        </PageLayout>
    );
}
```

---

## Streaks System

The streak system encourages daily engagement:

- **Current Streak**: Consecutive days with at least one topic interaction
- **Longest Streak**: Personal best for motivation
- **Reset Logic**: Streak resets if user misses a day

Streaks update automatically when:
- User marks a topic complete
- User starts reading a topic

---

## Prerequisite System

Topics can declare prerequisites:

```typescript
{
    slug: 'mastering-dynamic-programming',
    prerequisites: ['recursion-and-backtracking'],
    // ...
}
```

The system:
1. Shows prerequisites on topic pages
2. Indicates completed/incomplete status
3. Optionally "locks" topics (isLocked flag)
4. Provides navigation to prerequisite topics

---

## Phase Progression

Learning paths have three phases:
1. **Beginner** - Foundation topics
2. **Intermediate** - Core concepts
3. **Advanced** - Expert-level material

Phase advancement:
- Tracked via `currentPhase` in progress
- Updates automatically as topics complete
- Visual indicators in roadmap view

---

## LocalStorage Persistence

All progress is stored in localStorage:

```javascript
// Key: scaleforge_learning_progress
{
    paths: {
        dsa: {
            pathId: 'dsa',
            startedAt: '2024-01-15T10:00:00Z',
            completedTopics: ['foundations-of-dsa', 'mastering-arrays'],
            currentPhase: 'beginner',
            currentTopic: 'strings-mastery',
            timeSpent: 45,
            lastAccessedAt: '2024-01-20T15:30:00Z'
        }
    },
    totalCompleted: 5,
    currentStreak: 3,
    longestStreak: 7,
    lastActiveDate: '2024-01-20',
    lastPath: 'dsa',
    lastTopic: 'strings-mastery'
}
```

---

## Future Enhancements

1. **Backend sync** - Move from localStorage to API
2. **Learning analytics** - Track reading time, engagement
3. **Spaced repetition** - Review reminders for completed topics
4. **Certificates** - Generate on path completion
5. **Learning goals** - Daily/weekly targets
6. **Social features** - Leaderboards, cohort progress
