import { Article } from "@/hooks/useArticles";

export const JAVASCRIPT_ARTICLES: Article[] = [
    {
        id: "js-core-exhaustive",
        slug: "javascript-event-loop-and-v8-internals",
        title: "JS Internals: The Event Loop & V8",
        description: "How JavaScript is single-threaded yet high-performance. Master the Call Stack, Task Queue, and Microtasks.",
        category: "Languages",
        difficulty: "Advanced",
        tags: ["JavaScript", "V8", "Event Loop", "Performance"],
        viewCount: 28000,
        updatedAt: "2024-04-14",
        author: "Scaleforge JS Team",
        content: `
# JavaScript Internals: Scaling the Single Thread

JavaScript runs on the **V8 Engine** (in Chrome/Node) using a single-threaded **Event Loop**.

## 1. The Call Stack & Web APIs
When you call a function, it's pushed to the **Stack**. If it's asynchronous (like \`setTimeout\` or \`fetch\`), it is handed off to the browser's **Web APIs** (or Node's Libuv).

---

## 2. Microtasks vs. Macrotasks
This is a frequent Senior engineer interview question.
- **Macrotasks:** \`setTimeout\`, \`setInterval\`, \`setImmediate\`.
- **Microtasks:** \`Promises\`, \`process.nextTick\`, \`MutationObserver\`.
**The Rule:** The Event Loop processes the *entire* Microtask queue after every Macrotask. This is why Promises feel "faster" than timeouts.

---

## 3. V8 Memory Management
V8 uses **Generational Garbage Collection**.
- **Young Generation:** Small, fast, for new objects.
- **Old Generation:** Large, for objects that survived previous cleanup.
**Production Tip:** Avoid "Memory Leaks" by removing Event Listeners and nullifying large global objects.

---

## 4. JIT Compilation
V8 doesn't just interpret code; it compiles "Hot" functions directly into machine code at runtime. Writing **Monomorphic** code (passing the same shape of object to a function) helps V8 optimize your app.
        `
    },
    {
        id: "ts-advanced-typing",
        slug: "advanced-typescript-patterns-exhaustive",
        title: "TypeScript Mastery: Generics & Utility Types",
        description: "Moving beyond interfaces. Mastering Mapped Types, Conditional Types, and Type Inference.",
        category: "Languages",
        difficulty: "Advanced",
        tags: ["TypeScript", "Types", "Architecture"],
        viewCount: 22000,
        updatedAt: "2024-04-14",
        author: "Scaleforge TS Architect",
        content: `
# TypeScript Mastery: Architecting for Safety

TypeScript isn't just about adding \`:string\`. It's a powerful type-level programming language.

## 1. Discriminated Unions (The GOAT Pattern)
This is the single most important pattern for safe React/Node state management.
\`\`\`typescript
type APIState = 
  | { status: 'loading' }
  | { status: 'success', data: string }
  | { status: 'error', error: Error };

function process(state: APIState) {
    if (state.status === 'success') {
        console.log(state.data); // TS knows 'data' exists here
    }
}
\`\`\`

---

## 2. Generics & Constraints
Generics allow you to write reusable code that maintains type safety.
\`\`\`typescript
function fetchWrapper<T>(url: string): Promise<T> {
    return fetch(url).then(res => res.json());
}
\`\`\`

---

## 3. Utility Types (The Power Tools)
- **Pick<T, K>:** Create a type by picking specific keys.
- **Partial<T>:** Make all properties optional.
- **ReturnType<T>:** Get the return type of a function automatically.

---

## 4. Production Tips
- Use \`unknown\` instead of \`any\` for unpredictable inputs.
- Enable \`strict: true\` in \`tsconfig.json\`. If you're not using strict mode, you're not really using TypeScript.
        `
    }
];
