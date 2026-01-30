# ScaleForge Reading Experience System

This document describes the reading experience components and patterns designed for immersive, long-form technical content consumption.

## Philosophy

The reading experience is designed to:
1. **Reduce cognitive load** - Minimize distractions, focus on content
2. **Provide navigation context** - Always know where you are in the document
3. **Track progress** - Visual feedback on reading completion
4. **Optimize for dark mode** - Reduce eye strain for long reading sessions
5. **Mobile-first** - Seamless experience across all devices

---

## Core Components

### `<ReadingProvider>`

Context provider that manages reading state, scroll position, and content metadata.

```tsx
import { ReadingProvider } from '@/components/reading';

<ReadingProvider content={markdownContent}>
  {/* Reading components have access to context */}
</ReadingProvider>
```

**Props:**
- `content?: string` - Raw content for parsing headings and calculating word count
- `headings?: Heading[]` - Pre-parsed headings array

**Context Values (via `useReading()`):**
```tsx
const {
  scrollProgress,      // 0-1 scroll position
  readingProgress,     // Adjusted for actual reading
  estimatedTimeLeft,   // Minutes remaining
  headings,            // Array of { id, text, level }
  activeHeadingId,     // Currently visible heading
  scrollToHeading,     // (id: string) => void
  totalWords,          // Word count
  estimatedReadTime,   // Total minutes
  isScrolling,         // True while user scrolls
  hasScrolledPast,     // (percentage: number) => boolean
} = useReading();
```

---

### `<ArticleReader>`

Complete reading experience wrapper that integrates all reading components.

```tsx
import { ArticleReader } from '@/components/reading';

export default function ArticlePage() {
  return (
    <ArticleReader
      content={article.content}
      rightSidebar={<NotesPanel />}
      showFloatingTOC
    >
      <h1>Article Title</h1>
      <ReactMarkdown>{article.content}</ReactMarkdown>
    </ArticleReader>
  );
}
```

**Props:**
- `content?: string` - For parsing headings and stats
- `headings?: Heading[]` - Pre-parsed headings
- `leftSidebar?: ReactNode` - Additional left sidebar content
- `rightSidebar?: ReactNode` - Right sidebar (notes, related)
- `meta?: object` - Article metadata
- `showFloatingTOC?: boolean` - Show mobile floating TOC
- `className?: string` - Custom styling

**Includes:**
- Collapsible sidebars (auto-open on desktop)
- Table of contents with scroll spy
- Reading progress bar
- Mobile floating TOC button
- Mobile bottom action bar
- Reading statistics

---

### `<ReadingProgressBar>`

Animated progress indicator showing scroll position.

```tsx
<ReadingProgressBar variant="top" />
```

**Props:**
- `variant?: 'top' | 'inline'` - Display mode
- `showPercentage?: boolean` - Show percentage text
- `className?: string`

---

### `<TableOfContents>`

Auto-syncing table of contents with active heading highlighting.

```tsx
<TableOfContents 
  variant="sidebar"
  showNumbers
  onNavigate={(id) => setMobileOpen(false)}
/>
```

**Props:**
- `variant?: 'sidebar' | 'inline' | 'floating'` - Display style
- `showNumbers?: boolean` - Show section numbers
- `onNavigate?: (id: string) => void` - Callback on navigation
- `headings?: Heading[]` - Override context headings

**Features:**
- Smooth scroll indicator animation
- Active section highlighting
- Level-aware indentation for nested headings
- Click to navigate

---

### `<FloatingTOC>`

Mobile-optimized floating table of contents button.

```tsx
<FloatingTOC />
```

Appears as a floating button showing current section, expands to full TOC on tap.

---

### `<ReadingStats>`

Display reading time and progress statistics.

```tsx
<ReadingStats variant="compact" />
<ReadingStats variant="full" />
```

**Variants:**
- `compact`: Single-line progress indicator
- `full`: Complete stats with word count, time, progress bar

---

## Content Enhancement Components

### `<SectionHighlight>`

Highlights sections as they come into view.

```tsx
<SectionHighlight id="introduction" variant="border">
  <h2>Introduction</h2>
  <p>Section content...</p>
</SectionHighlight>
```

**Variants:**
- `subtle`: Light background tint
- `border`: Left border accent
- `glow`: Subtle shadow glow

---

### `<FadeInSection>`

Content that fades in as the user scrolls.

```tsx
<FadeInSection direction="up" delay={0.2}>
  <div>Fades in from below</div>
</FadeInSection>
```

**Props:**
- `direction?: 'up' | 'down' | 'left' | 'right' | 'none'`
- `delay?: number` - Animation delay in seconds

---

### `<PullQuote>`

Highlighted quotation block for emphasis.

```tsx
<PullQuote author="Martin Fowler" source="Refactoring">
  Any fool can write code that a computer can understand. 
  Good programmers write code that humans can understand.
</PullQuote>
```

---

### `<KeyTakeaway>`

Callout box for important points.

```tsx
<KeyTakeaway title="Remember" variant="tip">
  Always validate user input on both client and server.
</KeyTakeaway>
```

**Variants:**
- `info`: Blue accent
- `warning`: Amber accent
- `success`: Green accent
- `tip`: Primary color accent

---

### `<ReadingBreak>`

Visual separator between sections.

```tsx
<ReadingBreak variant="dots" />
```

**Variants:**
- `dots`: Three dot separator
- `line`: Gradient line
- `space`: Vertical whitespace only

---

### `<AnchorHeading>`

Heading with anchor link support and copy functionality.

```tsx
<AnchorHeading level={2} id="implementation">
  Implementation Details
</AnchorHeading>
```

Shows # symbol on hover, click to copy link.

---

## CSS Classes

### Typography Classes

```css
.reading-content     /* Enhanced reading typography */
.doc-content         /* Base documentation styles */
```

### Progress & Stats

```css
.reading-progress      /* Fixed progress bar container */
.reading-progress-bar  /* Progress fill */
.reading-stats         /* Stats display */
```

### Table of Contents

```css
.toc-container        /* TOC wrapper */
.toc-item             /* Individual item */
.toc-item-active      /* Active/current item */
.toc-item-level-3     /* Nested item */
```

### Section Styling

```css
.reading-section         /* Section wrapper */
.reading-section-active  /* Currently visible section */
.reading-focus-mode      /* Enable focus mode (dims inactive content) */
```

---

## Usage Patterns

### Basic Article Page

```tsx
import { ArticleReader } from '@/components/reading';
import ReactMarkdown from 'react-markdown';

export default function ArticlePage({ article }) {
  return (
    <PageLayout>
      <ArticleReader content={article.content}>
        <PageHeader 
          title={article.title}
          breadcrumbs={[...]}
        />
        <ReactMarkdown className="reading-content">
          {article.content}
        </ReactMarkdown>
      </ArticleReader>
    </PageLayout>
  );
}
```

### Documentation Page with Notes

```tsx
import { ArticleReader, KeyTakeaway, ReadingBreak } from '@/components/reading';

export default function DocPage() {
  return (
    <ArticleReader
      content={content}
      rightSidebar={<StudyNotes articleId={id} />}
    >
      <article className="reading-content">
        <h1>Document Title</h1>
        
        <p>Introduction paragraph...</p>
        
        <KeyTakeaway title="Prerequisites">
          Make sure you understand X before continuing.
        </KeyTakeaway>
        
        <h2 id="section-1">First Section</h2>
        <p>Content...</p>
        
        <ReadingBreak />
        
        <h2 id="section-2">Second Section</h2>
        <p>More content...</p>
      </article>
    </ArticleReader>
  );
}
```

### Custom Reading Experience

```tsx
import { 
  ReadingProvider, 
  ReadingProgressBar,
  TableOfContents,
  useReading 
} from '@/components/reading';

function CustomReader({ content, children }) {
  return (
    <ReadingProvider content={content}>
      <ReadingProgressBar />
      
      <div className="flex gap-8">
        <aside className="w-64 sticky top-24">
          <TableOfContents showNumbers />
          <ReadingStatsDisplay />
        </aside>
        
        <main className="flex-1 reading-content">
          {children}
        </main>
      </div>
    </ReadingProvider>
  );
}

function ReadingStatsDisplay() {
  const { estimatedTimeLeft, readingProgress } = useReading();
  
  return (
    <div className="p-4 bg-white/5 rounded-xl">
      <p>{estimatedTimeLeft} min left</p>
      <div className="progress-bar">
        <div style={{ width: `${readingProgress * 100}%` }} />
      </div>
    </div>
  );
}
```

---

## Accessibility

The reading system includes:
- Keyboard navigation for TOC
- ARIA labels on controls
- Reduced motion support (`prefers-reduced-motion`)
- Focus indicators
- Semantic heading structure
- Screen reader announcements for progress

---

## Dark Mode Optimization

Reading content is optimized for comfortable dark mode reading:
- Reduced contrast (85% max for body text)
- Warmer heading colors
- Softer code block backgrounds
- Gradient progress indicators

---

## Performance

- Scroll observers use `IntersectionObserver` for efficient tracking
- Progress calculations are memoized
- Sidebar sidebars use CSS transforms for animations
- Mobile overlays use `will-change` for GPU acceleration
