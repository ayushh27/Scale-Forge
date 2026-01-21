import { Article } from "@/hooks/useArticles";

export const GO_ARTICLES: Article[] = [
    {
        id: "go-basics-exhaustive",
        slug: "go-syntax-and-fundamentals",
        title: "Go: Syntax, Type Safety & Pragmatism",
        description: "Why Go is the language of the cloud. Mastering statically typed, compiled code for reliability.",
        category: "Languages",
        difficulty: "Beginner",
        tags: ["Go", "Foundations", "Basics"],
        viewCount: 25000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Go Team",
        content: `
# Go Foundations: Engineering Simplicity

Go was designed at Google to solve "Software Engineering at Scale." It prioritizes fast compilation and ease of maintenance.

## 1. Composition over Inheritance
Go has no classes. It has **structs** and **interfaces**.
- **Interfaces:** Are satisfied implicitly. If your struct has the methods, it implements the interface. No \`implements\` keyword needed.

\`\`\`go
type Reader interface {
    Read(p []byte) (n int, err error)
}
\`\`\`

---

## 2. Values vs. Pointers
- **Pass-by-value:** Creates a copy. Safe, but slow for huge objects.
- **Pass-by-pointer (\`*\`):** Shares memory. Fast, but watch for race conditions.

---

## 3. Error Handling (The "Go Way")
Go doesn't use exceptions. Errors are **values**.
\`\`\`go
res, err := doSomething()
if err != nil {
    return fmt.Errorf("failed to do X: %w", err)
}
\`\`\`
**Why?** Explicit error handling prevents "mystery crashes" in production.

---

## 4. Production Tips
- Use \`go modules\` for dependency management.
- Keep your interfaces small (often just 1 pattern).
        `
    },
    {
        id: "go-concurrency-exhaustive",
        slug: "mastering-concurrency-in-go",
        title: "Go Concurrency: Channels & Goroutines",
        description: "Exhaustive guide to the CSP model. Understanding how Go handles millions of concurrent tasks.",
        category: "Languages",
        difficulty: "Advanced",
        tags: ["Go", "Concurrency", "Channels", "Gophers"],
        viewCount: 22000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# Go Concurrency: The Art of CSP

Go's biggest strength is its concurrency model: **Communicating Sequential Processes (CSP)**.

## 1. Goroutines
A Goroutine is a "Lightweight Thread". 
- Starts with just 2KB of stack.
- Managed by the Go Runtime (G), not the OS kernel (M).
- **Production Fact:** You can run 100,000 Goroutines on a laptop without crashing.

---

## 2. Channels: The Pipe
"Do not communicate by sharing memory; share memory by communicating."
- **Unbuffered:** Sync transmission. Sender waits for Receiver.
- **Buffered:** Async transmission. Sender only waits if buffer is full.

---

## 3. The Select Statement
The swiss-army knife of Go concurrency. It allows a Gopher to wait on multiple channel operations.
\`\`\`go
select {
case msg := <-chatCh:
    fmt.Println("New Chat:", msg)
case <-time.After(1 * time.Second):
    fmt.Println("Timeout!")
}
\`\`\`

---

## 4. Race Conditions
Even with channels, you can have race conditions.
- Use \`go test -race ./...\` to catch them in development.
- Use \`sync.Mutex\` for simple shared state protection.
        `
    }
];
