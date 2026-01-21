import { Article } from "@/hooks/useArticles";

export const JAVA_ARTICLES: Article[] = [
    {
        id: "java-basics-exhaustive",
        slug: "java-oop-and-the-jvm-foundations",
        title: "Java: The JVM & Enterprise OOP",
        description: "Exhaustive guide to Java's Write Once Run Anywhere philosophy. Understanding the JVM and proper OOP.",
        category: "Languages",
        difficulty: "Beginner",
        tags: ["Java", "JVM", "OOP", "Basics"],
        viewCount: 22000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Java Team",
        content: `
# Java Foundations: The JVM & Enterprise Logic

Java is the backbone of banking and large-scale enterprise systems because of its stability and the power of the **Java Virtual Machine (JVM)**.

## 1. How the JVM Works
- **Compilation:** Java files (.java) $\to$ Bytecode (.class).
- **Execution:** JVM interprets bytecode OR uses the **JIT (Just-In-Time)** compiler to turn hot spots into machine code.

---

## 2. Strong OOP Principles (SOLID)
Java is the "Poster Child" for SOLID principles:
1. **S**ingle Responsibility.
2. **O**pen/Closed.
3. **L**iskov Substitution.
4. **I**nterface Segregation.
5. **D**ependency Inversion (Spring Framework is built on this).

---

## 3. Memory Management: The Heap
- **Young Gen (Eden):** Where new objects are born.
- **Old Gen:** Where long-lived objects survive.
- **Metaspace:** Where class metadata is stored (replaces PermGen).

---

## 4. Modern Java: Streams API
Since Java 8, we can write functional-style code.
\`\`\`java
List<String> result = names.stream()
    .filter(s -> s.startsWith("A"))
    .map(String::toUpperCase)
    .collect(Collectors.toList());
\`\`\`

---

## 5. Production Tip
Use **Maven** or **Gradle** for builds. Java's power is in its ecosystem, but managing JAR files manually is a nightmare.
        `
    },
    {
        id: "java-advanced-multithreading",
        slug: "mastering-java-concurrency-and-the-jmm",
        title: "Advanced Java: Concurrency & The JMM",
        description: "Deep dive into Java Memory Model, CompletableFuture, and high-performance multithreading.",
        category: "Languages",
        difficulty: "Advanced",
        tags: ["Java", "Concurrency", "Multithreading", "Performance"],
        viewCount: 19800,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# Advanced Java: Scaling Threads

Java was one of the first languages to bake multithreading into the core language.

## 1. The Java Memory Model (JMM)
JMM defines how threads interact through memory. Without proper synchronization, a thread might see "stale" data because of CPU caching.
- **volatile:** Ensures a variable is always read from main memory, not a thread's cache.
- **synchronized:** Atomic blocks that lock access.

---

## 2. CompletableFuture (Async Java)
Java 8 introduced a powerful way to handle non-blocking logic.
\`\`\`java
CompletableFuture.supplyAsync(() -> fetchUser(id))
    .thenCompose(user -> fetchOrders(user))
    .thenAccept(System.out::println);
\`\`\`

---

## 3. GC Tuning & Virtual Threads (Project Loom)
- **GC Tuning:** For low latency, use **G1GC** or **ZGC**.
- **Virtual Threads (Java 21):** Light-weight threads similar to Go's Goroutines. You can now spawn millions of threads without the $O(1MB)$ stack overhead of OS threads.

---

## 4. Design Patterns
Master these for Senior interviews:
- **Singleton** (Use an Enum for thread-safety!).
- **Factory** & **Abstract Factory**.
- **Proxy** (Used for Spring AOP).
- **Strategy**.
        `
    }
];
