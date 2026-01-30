# ScaleForge Layout System - Foundation Architecture

This document describes the centralized layout system implemented for ScaleForge to ensure consistent, responsive, and maintainable layouts across all pages.

## Core Philosophy

1. **Mobile-First Responsive Design**: All layouts start from mobile and scale up
2. **No Fixed Widths**: Use max-widths and percentages for fluid layouts
3. **Conditional Panel Rendering**: Sidebars only occupy space when visible
4. **Consistent Spacing**: Use design tokens for all spacing values
5. **Semantic Structure**: Use proper HTML elements and accessibility patterns

---

## Design Tokens (CSS Variables)

Located in `globals.css`, these tokens define the foundation:

### Layout Dimensions
```css
--header-height: 80px;          /* Desktop navbar height */
--header-height-mobile: 64px;   /* Mobile navbar height */
--sidebar-width: 280px;         /* Default sidebar width */
--container-max: 1800px;        /* Maximum content width */
```

### Container Widths
```css
--container-prose: 65ch;  /* Optimal reading width */
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1400px;
```

### Spacing Scale (8px base)
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

---

## Layout Components

### `<PageLayout>`

The foundational wrapper for all pages. Handles navbar offset and minimum height.

```tsx
import { PageLayout } from '@/components/layout';

export default function MyPage() {
  return (
    <PageLayout mobileBottomPadding animate>
      {/* Page content */}
    </PageLayout>
  );
}
```

**Props:**
- `noPadding?: boolean` - Remove top padding for custom headers
- `mobileBottomPadding?: boolean` - Add bottom space for mobile action bars
- `animate?: boolean` - Enable page transition animation (default: true)
- `className?: string` - Additional classes

---

### `<ContentContainer>`

Constrains content width for optimal readability. Use this for page sections and content areas.

```tsx
import { ContentContainer } from '@/components/layout';

<ContentContainer size="md" padding center>
  <article>
    {/* Article content */}
  </article>
</ContentContainer>
```

**Props:**
- `size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'` - Max width constraint
  - `sm`: 640px (prose reading)
  - `md`: 768px (default - articles)
  - `lg`: 1024px (mixed content)
  - `xl`: 1280px (wide layouts)
  - `full`: No constraint
- `center?: boolean` - Center horizontally (default: true)
- `padding?: boolean` - Responsive side padding (default: true)

---

### `<SidebarLayout>`

Flexible layout with optional left and right sidebars. Sidebars only reserve space when visible.

```tsx
import { SidebarLayout } from '@/components/layout';

<SidebarLayout
  leftSidebar={<TableOfContents />}
  rightSidebar={<NotesPanel />}
  leftCollapsible
  rightDesktopOnly
>
  <article className="doc-content">
    {/* Main content */}
  </article>
</SidebarLayout>
```

**Props:**
- `leftSidebar?: ReactNode` - Left sidebar content
- `rightSidebar?: ReactNode` - Right sidebar content
- `leftCollapsible?: boolean` - Allow collapsing left sidebar (default: true)
- `rightDesktopOnly?: boolean` - Show right sidebar on xl+ only (default: true)
- `mainMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'` - Main content max width when no sidebars visible

**Behavior:**
- **Mobile**: Sidebars become off-canvas drawers
- **Tablet (md-lg)**: Left sidebar collapsible, right hidden
- **Desktop (xl+)**: All sidebars visible

---

### `<PageHeader>`

Consistent page headers with responsive typography.

```tsx
import { PageHeader } from '@/components/layout';
import { BookOpen, Shield } from 'lucide-react';

<PageHeader
  title="Article Title"
  subtitle="Description of the content"
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Learn', href: '/learn' },
    { label: 'Current Page' }
  ]}
  badge={{ 
    label: 'Engineering Hub', 
    icon: BookOpen,
    variant: 'primary'
  }}
  tags={[
    { label: 'Advanced', variant: 'danger', icon: Shield }
  ]}
/>
```

**Props:**
- `title: string | ReactNode` - Main title
- `subtitle?: string | ReactNode` - Description
- `breadcrumbs?: Array<{ label: string; href?: string }>` - Navigation path
- `badge?: BadgeConfig` - Primary badge above title
- `tags?: BadgeConfig[]` - Additional tags
- `meta?: ReactNode` - Metadata section
- `actions?: ReactNode` - Action buttons
- `animate?: boolean` - Enable entrance animation

---

## CSS Utility Classes

### Container Classes
```css
.page-container      /* Max 1800px, centered, responsive padding */
.content-container   /* Max 1280px, centered, responsive padding */
.content-container-lg /* Max 1024px */
.content-container-md /* Max 768px */
.content-container-prose /* Max 65ch (optimal reading) */
```

### Sidebar Layout Classes
```css
.layout-with-sidebar /* Flex container for sidebar layouts */
.layout-sidebar      /* Sticky sidebar with auto-hide on mobile */
.layout-main         /* Flexible main content area */
.layout-main-centered /* Main with max-width constraint */
```

### Section Spacing
```css
.section     /* Standard section padding (64px) */
.section-sm  /* Small section padding (48px) */
.section-lg  /* Large section padding (96px) */
```

### Page/Scroll Offset
```css
.page-offset   /* Padding top for fixed header */
.scroll-offset /* Scroll margin for header-aware anchors */
```

### Stack Utilities
```css
.stack     /* Flex column */
.stack-sm  /* Gap: 16px */
.stack-md  /* Gap: 32px */
.stack-lg  /* Gap: 48px */
.stack-xl  /* Gap: 64px */
```

### Grid Utilities
```css
.grid-auto     /* Auto-fill grid, min 280px columns */
.grid-auto-sm  /* Min 200px columns */
.grid-auto-lg  /* Min 320px columns */
```

### Visibility Utilities
```css
.show-mobile / .hide-mobile   /* Toggle at 768px */
.show-desktop / .hide-desktop /* Toggle at 1024px */
```

---

## Usage Patterns

### Basic Page
```tsx
import { PageLayout, ContentContainer, PageHeader } from '@/components/layout';

export default function MyPage() {
  return (
    <PageLayout>
      <ContentContainer size="lg" className="py-12">
        <PageHeader 
          title="Page Title" 
          breadcrumbs={[...]} 
        />
        {/* Content */}
      </ContentContainer>
    </PageLayout>
  );
}
```

### Documentation Page (with sidebars)
```tsx
import { PageLayout, SidebarLayout, PageHeader } from '@/components/layout';

export default function DocPage() {
  return (
    <PageLayout mobileBottomPadding>
      <SidebarLayout
        leftSidebar={<TableOfContents />}
        rightSidebar={<StudyNotes />}
      >
        <PageHeader title="Document Title" />
        <article className="doc-content">
          {/* Document content */}
        </article>
      </SidebarLayout>
    </PageLayout>
  );
}
```

### Hub/Category Page
```tsx
import { PageLayout, ContentContainer } from '@/components/layout';

export default function HubPage() {
  return (
    <PageLayout>
      <ContentContainer size="xl" className="section">
        {/* Hub content */}
      </ContentContainer>
    </PageLayout>
  );
}
```

---

## Responsive Breakpoints

| Breakpoint | Width    | Target Device        |
|------------|----------|----------------------|
| (default)  | 0px+     | Mobile phones        |
| `sm`       | 640px+   | Large phones         |
| `md`       | 768px+   | Tablets portrait     |
| `lg`       | 1024px+  | Tablets landscape    |
| `xl`       | 1280px+  | Laptops              |
| `2xl`      | 1536px+  | Desktops             |

---

## Migration Guide

When updating existing pages to use the new layout system:

1. **Replace page wrappers**:
   ```tsx
   // Before
   <div className="min-h-screen pt-20">
   
   // After
   <PageLayout>
   ```

2. **Replace container divs**:
   ```tsx
   // Before
   <div className="container mx-auto px-6">
   
   // After
   <ContentContainer size="xl">
   ```

3. **Use design token spacing**:
   ```tsx
   // Before
   className="py-12 gap-8"
   
   // After (using CSS classes or token values)
   className="section gap-[var(--space-8)]"
   ```

4. **Remove fixed widths**:
   ```tsx
   // Before
   className="w-[280px] lg:w-[320px]"
   
   // After
   className="w-full max-w-sm lg:max-w-md"
   ```

---

## Best Practices

1. **Never use fixed pixel widths** for main content
2. **Always use `min-w-0`** on flex children that may overflow
3. **Use design tokens** for spacing consistency
4. **Test at mobile first** then expand to larger screens
5. **Sidebars should be optional** - content must work without them
6. **Use semantic HTML** - main, aside, article, section, nav
