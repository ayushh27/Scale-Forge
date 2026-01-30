# Engineering-Grade Interactive Components

This document describes the enhanced interactive components designed for software engineering documentation. All components are performance-conscious, purposeful, and aligned with how engineers reason about problems.

## Overview

Two main categories of components were added:

1. **Enhanced Code Blocks** - Rich code display with multi-language support
2. **System Design Components** - Architecture, data flow, and trade-off analysis

---

## Enhanced Code Block

Located at: `@/components/markdown/EnhancedCodeBlock`

### Features

| Feature | Description |
|---------|-------------|
| Multi-language tabs | Switch between implementations in different languages |
| Line highlighting | Highlight specific lines for emphasis |
| Line annotations | Add tooltips to specific lines with warnings/info |
| Complexity badges | Display O(n) time/space complexity |
| Collapsible | Collapse long code blocks |
| Explanation panel | Expandable contextual explanation |
| Copy functionality | One-click copy to clipboard |

### Basic Usage

```tsx
import { EnhancedCodeBlock } from '@/components/markdown';

<EnhancedCodeBlock
    language="typescript"
    value={`function binarySearch(arr: number[], target: number): number {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`}
    highlightLines={[4, 5, 6]}
    complexity="O(log n)"
    spaceComplexity="O(1)"
    explanation="Binary search divides the search space in half each iteration,
        making it highly efficient for sorted arrays."
/>
```

### Multi-Language Tabs

```tsx
<EnhancedCodeBlock
    language="typescript"
    value="// default code"
    variants={[
        {
            language: 'typescript',
            label: 'TypeScript',
            code: `function add(a: number, b: number): number { return a + b; }`
        },
        {
            language: 'python',
            label: 'Python',
            code: `def add(a: int, b: int) -> int:\n    return a + b`
        },
        {
            language: 'go',
            label: 'Go',
            code: `func add(a, b int) int {\n    return a + b\n}`
        }
    ]}
/>
```

### Line Annotations

```tsx
<EnhancedCodeBlock
    language="javascript"
    value={codeString}
    annotations={[
        { line: 3, type: 'highlight', tooltip: 'This is the key operation' },
        { line: 7, type: 'warning', tooltip: 'Edge case: empty array' },
        { line: 10, type: 'add', tooltip: 'New optimization added' },
        { line: 12, type: 'remove' }, // Shows strikethrough
        { line: 15, type: 'focus' }
    ]}
/>
```

### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `language` | string | required | Programming language |
| `value` | string | required | Code content |
| `showLineNumbers` | boolean | true | Show line numbers |
| `fileName` | string | - | Display filename |
| `highlightLines` | number[] | [] | Lines to highlight |
| `focusLines` | number[] | [] | Lines to subtly focus |
| `annotations` | LineAnnotation[] | [] | Line-specific annotations |
| `variants` | CodeVariant[] | [] | Multi-language variants |
| `caption` | string | - | Description below code |
| `explanation` | string | - | Expandable explanation |
| `complexity` | string | - | Time complexity |
| `spaceComplexity` | string | - | Space complexity |
| `collapsible` | boolean | false | Enable collapse |
| `defaultCollapsed` | boolean | false | Start collapsed |

---

## System Design Components

Located at: `@/components/system-design`

### Architecture Breakdown

Displays system components with their relationships.

```tsx
import { ArchitectureBreakdown } from '@/components/system-design';

<ArchitectureBreakdown
    title="URL Shortener Architecture"
    description="High-level system overview"
    components={[
        {
            name: 'API Gateway',
            type: 'gateway',
            description: 'Rate limiting and authentication',
            tech: 'Kong',
            responsibilities: ['Route requests', 'Validate tokens']
        },
        {
            name: 'URL Service',
            type: 'service',
            description: 'Core shortening logic',
            tech: 'Node.js'
        },
        {
            name: 'Redis Cache',
            type: 'cache',
            description: 'Hot URL lookups',
            tech: 'Redis Cluster'
        },
        {
            name: 'PostgreSQL',
            type: 'database',
            description: 'Persistent URL storage',
            tech: 'PostgreSQL 15'
        }
    ]}
/>
```

#### Component Types

- `service` - Blue - Backend services
- `database` - Purple - Data storage
- `cache` - Amber - Caching layer
- `queue` - Emerald - Message queues
- `gateway` - Rose - API gateways
- `loadbalancer` - Cyan - Load balancers
- `client` - Slate - Client applications

---

### Data Flow

Visualizes request/response flows through the system.

```tsx
import { DataFlow } from '@/components/system-design';

<DataFlow
    title="URL Creation Flow"
    description="What happens when a user shortens a URL"
    steps={[
        {
            step: 1,
            action: 'User submits long URL',
            from: 'Client',
            to: 'API Gateway',
            protocol: 'HTTPS',
            data: '{ url: "https://example.com/very/long/path" }'
        },
        {
            step: 2,
            action: 'Validate and authenticate',
            from: 'API Gateway',
            to: 'Auth Service',
            note: 'Rate limiting applied here'
        },
        {
            step: 3,
            action: 'Generate short code',
            from: 'URL Service',
            to: 'ID Generator',
            protocol: 'gRPC'
        },
        {
            step: 4,
            action: 'Persist mapping',
            from: 'URL Service',
            to: 'PostgreSQL',
            protocol: 'SQL',
            data: 'INSERT INTO urls (code, target) VALUES (...)'
        }
    ]}
/>
```

---

### Trade-Off Analysis

Interactive comparison of different approaches.

```tsx
import { TradeOffAnalysis } from '@/components/system-design';

<TradeOffAnalysis
    title="Database Selection"
    context="Choosing the right database for our use case"
    tradeoffs={[
        {
            option: 'PostgreSQL',
            pros: ['Strong consistency', 'Rich querying', 'Mature ecosystem'],
            cons: ['Horizontal scaling complex', 'Higher latency at scale'],
            bestFor: 'Transactional workloads',
            complexity: 'Medium',
            performance: 'High',
            recommended: true
        },
        {
            option: 'MongoDB',
            pros: ['Flexible schema', 'Easy horizontal scaling'],
            cons: ['Eventual consistency', 'Complex transactions'],
            bestFor: 'Document-heavy workloads',
            complexity: 'Low',
            performance: 'High'
        },
        {
            option: 'Cassandra',
            pros: ['Massive scale', 'High availability'],
            cons: ['Limited query flexibility', 'Learning curve'],
            bestFor: 'Write-heavy, distributed systems',
            complexity: 'High',
            performance: 'High'
        }
    ]}
/>
```

---

### Failure Scenarios

Documents what can go wrong and how to handle it.

```tsx
import { FailureScenarios } from '@/components/system-design';

<FailureScenarios
    title="Potential Failure Modes"
    scenarios={[
        {
            scenario: 'Database Connection Timeout',
            description: 'Primary database becomes unreachable',
            impact: 'Critical',
            mitigation: 'Implement circuit breaker, fallback to read replica',
            detection: 'Health checks every 5s, alert on 3 consecutive failures',
            recovery: 'Automatic failover to standby, manual investigation'
        },
        {
            scenario: 'Cache Stampede',
            description: 'Many requests hit DB when cache expires',
            impact: 'High',
            mitigation: 'Probabilistic early expiration, request coalescing',
            detection: 'Monitor cache hit ratio, DB query latency'
        },
        {
            scenario: 'Rate Limit Exhaustion',
            description: 'Legitimate users blocked during traffic spikes',
            impact: 'Medium',
            mitigation: 'Adaptive rate limiting, user whitelisting'
        }
    ]}
/>
```

---

### Deep Dive (Expandable Panel)

For additional context that shouldn't clutter the main content.

```tsx
import { DeepDive } from '@/components/system-design';

<DeepDive title="Performance Considerations" icon="performance">
    <p>When dealing with high-throughput scenarios, consider:</p>
    <ul>
        <li>Connection pooling to reduce overhead</li>
        <li>Batch inserts for write-heavy operations</li>
        <li>Read replicas for scaling queries</li>
    </ul>
</DeepDive>

<DeepDive title="Security Implications" icon="security">
    <p>Always validate input URLs to prevent:</p>
    <ul>
        <li>Open redirect vulnerabilities</li>
        <li>SSRF attacks</li>
        <li>Malicious content distribution</li>
    </ul>
</DeepDive>

<DeepDive title="Alternative Approaches" icon="alternative" defaultOpen>
    <p>Instead of Base62 encoding, you could use:</p>
    <ul>
        <li>UUID with prefix (longer but unique)</li>
        <li>Hashids (reversible, customizable)</li>
        <li>Snowflake IDs (time-ordered, distributed)</li>
    </ul>
</DeepDive>
```

#### Icon Options

- `performance` - Amber lightning bolt
- `security` - Rose shield
- `alternative` - Purple git branch
- `deep` - Blue layers (default)

---

## Integration in Markdown

These components can be integrated into article pages by parsing special markdown blocks:

```markdown
:::architecture
title: System Overview
components:
  - name: API Server
    type: service
    ...
:::

:::dataflow
...
:::

:::tradeoff
...
:::
```

The article renderer can detect these blocks and render the appropriate component.

---

## Best Practices

1. **Be purposeful** - Only use interactive elements when they add value
2. **Performance first** - Components use `AnimatePresence` for efficient animations
3. **Progressive disclosure** - Complex info is hidden behind expandable panels
4. **Engineering focus** - All features align with how engineers think about systems
5. **Accessibility** - All interactive elements are keyboard accessible

---

## File Structure

```
src/components/
├── markdown/
│   ├── CodeBlock.tsx           # Original code block
│   ├── EnhancedCodeBlock.tsx   # Enhanced with all features
│   └── index.ts                # Exports
└── system-design/
    ├── SystemDesignComponents.tsx
    └── index.ts
```
