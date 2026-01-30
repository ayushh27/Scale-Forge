import { Article } from "@/hooks/useArticles";

export const LANGUAGES_ARTICLES: Article[] = [
    {
        id: "lang-foundational-overview",
        slug: "mastering-programming-languages-beyond-syntax",
        title: "Programming Mastery: Beyond the Syntax",
        description: "Why the best engineers focus on language internals rather than just learning new frameworks.",
        category: "Languages",
        difficulty: "Beginner",
        tags: ["Foundations", "Languages", "Internal Mechanics"],
        viewCount: 35000,
        updatedAt: "2024-04-12",
        author: "Chief Software Engineer",
        content: `
# Programming Mastery: Beyond the Syntax

In the fast-paced world of software, a new framework appears every week. But the underlying principles of programming languages rarely change. Mastery comes from understanding **how** a language talks to the machine.

## 1. Why Internals Matter
If you only know the syntax, you are a coder. If you know the internals, you are an engineer.
- **Performance:** Why is a \`map\` faster than a loop in some languages?
- **Stability:** Understanding "Garbage Collection" prevents memory leaks in production.
- **Portability:** Knowing how C++ compiles vs. how Python is interpreted helps you choose the right tool for the job.

## 2. The Mental Model: Language Families
1. **Low-Level (C, C++, Rust):** Close to the metal. You manage memory. Speed is king.
2. **Managed (Java, C#, Go):** The language manages memory (GC). Balance between speed and developer productivity.
3. **Interpreted/Dynamic (Python, JS, Ruby):** High level of abstraction. Optimized for fast iteration and developer joy.

---

## 3. Hierarchical Mastery Path
1. **The Basics (Beginner):** Types, Scopes, Control Flow, Basic Functions.
2. **Object Orientation & Functional Patterns:** Interfaces, Closures, Currying, Inheritance vs. Composition.
3. **Advanced Internals:** Memory Layout (Heap vs. Stack), JIT Compilation, Concurrency Models (Threads vs. Event Loops).

## 4. The Interview Strategy
When asked about a language in an interview, don't just explain *what* it does—explain *why* it was designed that way. (e.g., "Go was designed for Google-scale concurrency, which is why it uses goroutines instead of heavy OS threads.")
        `
    },
    {
        id: "lang-go-concurrency",
        slug: "mastering-concurrency-in-go",
        title: "The Go Concurrency Model",
        description: "Understanding Goroutines, Channels, and the CSP model for building high-performance backend services.",
        category: "Languages",
        difficulty: "Advanced",
        tags: ["Go", "Concurrency", "Backend"],
        viewCount: 12500,
        updatedAt: "2024-03-29",
        author: "Gopher Lead",
        content: `
## Introduction to CSP
Go's concurrency is based on **Communicating Sequential Processes (CSP)**. The core philosophy is: *"Do not communicate by sharing memory; instead, share memory by communicating."*

### 1. Goroutines
Goroutines are extremely lightweight threads managed by the Go runtime.
- **Stack size:** Starts at 2KB (grows/shrinks as needed).
- **Scheduling:** Managed by the M:P:G scheduler (OS thread : Processor : Goroutine).

\`\`\`go
func main() {
    go sayHello() // Starts a new goroutine
    fmt.Println("Main function")
}
\`\`\`

### 2. Channels
Channels are the pipes that connect concurrent goroutines.
- **Unbuffered:** Send and receive block until both parties are ready.
- **Buffered:** Sends only block when the buffer is full.

\`\`\`go
ch := make(chan string, 2)
ch <- "Scale"
ch <- "Forge"
fmt.Println(<-ch)
\`\`\`

### 3. Select Statement
The \`select\` statement lets a goroutine wait on multiple communication operations.

\`\`\`go
select {
case msg1 := <-c1:
    fmt.Println("Received", msg1)
case msg2 := <-c2:
    fmt.Println("Received", msg2)
case <-time.After(time.Second):
    fmt.Println("Timeout")
}
\`\`\`

## Common Patterns
- **Worker Pools:** Limiting concurrency.
- **Fan-in / Fan-out:** Distributing and aggregating tasks.
- **Context Package:** Handling timeouts and cancellations across goroutines.
    `
    },
    {
        id: "lang-ts-advanced-types",
        slug: "advanced-typescript-patterns",
        title: "Advanced TypeScript: Generics & Utility Types",
        description: "Move beyond interfaces and master mapped types, conditional types, and complex generic constraints.",
        category: "Languages",
        difficulty: "Intermediate",
        tags: ["TypeScript", "Frontend", "Types"],
        viewCount: 9800,
        updatedAt: "2024-03-30",
        author: "TS Architect",
        content: `
## Why Advanced Typing Matters?
Strict typing isn't just about preventing errors; it's about creating **self-documenting APIs** and ensuring **type safety** in large-scale applications.

### 1. Generics
Generics allow you to create reusable components that work with a variety of types.

\`\`\`typescript
interface ApiResponse<T> {
    data: T;
    status: number;
    error?: string;
}

function fetchData<T>(url: string): Promise<ApiResponse<T>> {
    return fetch(url).then(res => res.json());
}
\`\`\`

### 2. Conditional Types
Choose types based on a condition, much like ternary operators for values.

\`\`\`typescript
type IsString<T> = T extends string ? true : false;
type A = IsString<string>; // true
type B = IsString<number>; // false
\`\`\`

### 3. Utility Types
TypeScript provides several built-in utilities:
- **\`Partial<T>\`:** All properties optional.
- **\`Pick<T, K>\`:** Select specific properties.
- **\`ReturnType<T>\`:** Get the return type of a function.

## Interview Insights
- Explain **Type Erasure:** How TS types don't exist in the compiled JS.
- **Interface vs Types:** When to use which (use Interfaces for public APIs and Types for complex unions/intersections).
    `
    },
    {
        id: "lang-memory-management",
        slug: "understanding-garbage-collection-and-manual-memory",
        title: "Memory: The Stack, The Heap, and the Collector",
        description: "An engineering deep-dive into how languages handle data storage and cleanup.",
        category: "Languages",
        difficulty: "Advanced",
        tags: ["Memory", "Garbage Collection", "Rust", "Java"],
        viewCount: 15400,
        updatedAt: "2024-04-13",
        author: "System Internals specialist",
        content: `
# Memory: The Life and Death of an Object

Every piece of data your program uses has to live somewhere. Understanding the Stack and the Heap is the difference between a high-performance system and one that crashes with an \`OutOfMemoryError\`.

## 1. The Stack vs. The Heap
### The Stack (Fast & Simple)
- **Use:** Stores local variables and function calls.
- **Mechanism:** LIFO (Last-In-First-Out).
- **Control:** Automatically managed by the compiler.
- **Limit:** Small and fixed size (leads to \`StackOverflow\`).

### The Heap (Flexible & Large)
- **Use:** Stores objects and large data structures that live beyond a function call.
- **Mechanism:** Dynamic allocation.
- **Control:** Managed by the developer (C++) or the Garbage Collector (Java/Python).

---

## 2. Garbage Collection (GC)
Managed languages like Java and Python use a "Collector" to find objects that are no longer used and delete them.
- **Mark and Sweep:** The most common algorithm. It "marks" used objects and "sweeps" the rest.
- **The Stop-The-World Problem:** When the GC runs, it often pauses the whole application, causing "Latency Spikes."

## 3. The Rust Revolution: RAII & Ownership
Rust solved memory safety without a Garbage Collector by using **Ownership**.
- **Scope-based Cleanup:** Memory is freed exactly when the variable goes out of scope.
- **No Pauses:** Since there's no GC, Rust has predictable, real-time performance.

---

## 4. Real-World Pitfall: Memory Leaks
Even with a Garbage Collector, you can have a leak!
- **Hidden References:** If you add an object to a static list and never remove it, the GC can never delete it.
- **Closure Captures:** In JavaScript, accidentally capturing large objects in a closure can keep them alive forever.
        `
    }
];
