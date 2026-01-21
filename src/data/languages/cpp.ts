import { Article } from "@/hooks/useArticles";

export const CPP_ARTICLES: Article[] = [
    {
        id: "cpp-basics-exhaustive",
        slug: "mastering-cpp-pointers-and-raii",
        title: "C++ Fundamentals: Memory & RAII",
        description: "Exhaustive guide to ownership, smart pointers, and why manual memory management is a superpower.",
        category: "Languages",
        difficulty: "Intermediate",
        tags: ["C++", "Memory", "Pointers", "RAII"],
        viewCount: 22000,
        updatedAt: "2024-04-14",
        author: "Scaleforge CPP Team",
        content: `
# C++ Foundations: Respect the Machine

C++ gives you direct control over hardware. With great power comes the responsibility of managing your own memory.

## 1. RAII (Resource Acquisition Is Initialization)
This is the most important concept in C++. Resources (Memory, File handles, Mutexes) are tied to a variable's **lifetime**. When the variable goes out of scope, the destructor cleans up.
- **Result:** No memory leaks if used correctly.

---

## 2. Smart Pointers (C++11+)
Never use \`new\` and \`delete\` in modern C++.
- **std::unique_ptr:** Sole ownership. No overhead.
- **std::shared_ptr:** Reference counted ownership.
- **std::weak_ptr:** Reference without ownership (prevents cycles).

---

## 3. The STL (Standard Template Library)
- **std::vector:** Contiguous memory. $O(1)$ access.
- **std::map:** Red-Black Tree. $O(\log N)$ lookup.
- **std::unordered_map:** Hash Map. $O(1)$ average lookup.

---

## 4. Move Semantics (\`&&\`)
Instead of copying a huge buffer, "Steal" the pointer from the old object and set the old one to null. This makes C++ exceptionally fast for passing object around.

---

## 5. Production Tip
Use **Valgrind** or **AddressSanitizer (ASan)** to find memory leaks during development. In C++, a small leak can bring down a server in hours.
        `
    },
    {
        id: "cpp-advanced-templates",
        slug: "cpp-template-metaprogramming-and-optimization",
        title: "Advanced C++: Templates & Zero-Cost Abstractions",
        description: "Exhaustive guide to compile-time programming, SFINAE, and low-latency optimization.",
        category: "Languages",
        difficulty: "Advanced",
        tags: ["C++", "Templates", "Metaprogramming", "Performance"],
        viewCount: 18400,
        updatedAt: "2024-04-14",
        author: "Systems Specialist",
        content: `
# Advanced C++: Programming the Compiler

C++ Templates allow you to write code that generates other code at **Compile Time**.

## 1. Template Specialization
Writing different code for different types while keeping the same interface.
\`\`\`cpp
template <typename T>
class Serializer { ... };

template <>
class Serializer<std::string> { ... }; // Specialized for strings
\`\`\`

---

## 2. SFINAE (Substitution Failure Is Not An Error)
A technique used to enable/disable specific function overloads based on the properties of the type passed in.
- **Modern way:** Use **Concepts (C++20)** instead. They make template errors actually readable!

---

## 3. Cache Friendliness (Data Oriented Design)
Advanced C++ isn't just about code; it's about hardware.
- Linked Lists are slow because they jump around memory.
- Vectors are fast because they stay in the CPU Cache (L1/L2).
- **Pro-Tip:** If performance is critical, always use a **Vector of Structs** over a **Struct of Vectors**.

---

## 4. Multi-threading in C++
- \`std::atomic\`: Lock-free programming for high-frequency trading.
- \`std::mutex\`: Standard locking.
- \`std::future\` and \`std::promise\`: Async patterns.
        `
    }
];
