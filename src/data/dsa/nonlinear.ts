import { Article } from "@/hooks/useArticles";

export const NONLINEAR_DSA_ARTICLES: Article[] = [
    {
        id: "dsa-trees-exhaustive",
        slug: "mastering-trees-and-hierarchical-data",
        title: "Trees: Hierarchical Architecture & Traversal",
        description: "Exhaustive guide to Binary Trees, BSTs, and Balance. From DOM trees to production routing.",
        category: "DSA",
        difficulty: "Intermediate",
        tags: ["Trees", "Binary Tree", "BST", "Recursion"],
        viewCount: 25000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# Trees: The Hierarchy of Data

A tree is a non-linear data structure representing a hierarchy. Unlike arrays or lists, trees can represent complex relationships like "Parent-Child" or "Folder-File".

## 1. Real-World Motivation
- **Document Object Model (DOM):** Browsers represent HTML as a tree.
- **File Systems:** Your hard drive's folder structure is a tree.
- **Routing Tables:** IP routing often uses Radix Trees.
- **Compilers:** Use Abstract Syntax Trees (ASTs) to represent code structure.

---

## 2. Binary Search Trees (BST) Mastery
A BST is a binary tree where:
- Left child node < Parent node.
- Right child node > Parent node.

**Complexity:**
- **Average:** $O(\log N)$ for search, insert, delete.
- **Worst-case:** $O(N)$ if the tree becomes a "Slinky" (unbalanced).

---

## 3. Tree Traversals (The "Big Three")
1. **In-order (Left, Root, Right):** Gives nodes in non-decreasing order for BST.
2. **Pre-order (Root, Left, Right):** Useful for cloning trees.
3. **Post-order (Left, Right, Root):** Useful for deleting trees or calculating folder sizes.

---

## 4. Advanced: Balancing (AVL & Red-Black)
In production (e.g., database indexes), we can't afford $O(N)$ worst-case. We use self-balancing trees.
- **AVL Tree:** Strict balancing. Better for read-heavy workloads.
- **Red-Black Tree:** More relaxed balancing. Better for write-heavy workloads (used in C++ \`std::map\` and Java \`TreeMap\`).

---

## 5. Interview Insights
- **Recursion is Key:** 90% of tree problems are solved recursively.
- **Levels:** If a problem mentions "Level by Level," use a **Queue (BFS)**.
- **Lowest Common Ancestor (LCA):** A favorite interview question for testing tree navigation logic.

---

## 6. Common Pitfalls
- **Null Checks:** Always handle \`if (!root)\`.
- **Stack Overflow:** Deep trees can cause recursion depth issues. Consider iterative solutions using a stack for very large trees.
        `
    },
    {
        id: "dsa-heaps-exhaustive",
        slug: "heaps-and-priority-queues-mastery",
        title: "Heaps: Priority as a First-Class Citizen",
        description: "Exhaustive guide to Min/Max Heaps, HeapSort, and Priority Queues in high-performance systems.",
        category: "DSA",
        difficulty: "Intermediate",
        tags: ["Heap", "Priority Queue", "Sorting", "Optimization"],
        viewCount: 17200,
        updatedAt: "2024-04-14",
        author: "Scaleforge Algo Lead",
        content: `
# Heaps & Priority Queues: Managing Chaos

A Heap is a specialized tree-based data structure that satisfies the **Heap Property**: In a Max-Heap, the parent is always $\ge$ children.

## 1. Why Heaps?
While a sorted array gives you the "Max" in $O(1)$, inserting a new element takes $O(N)$. A Heap gives you the "Max" in $O(1)$ and lets you insert/delete in **$O(\log N)$**.

---

## 2. Real-World Motivation
- **Task Scheduling:** The OS picks the highest priority task to run next.
- **Dijkstra’s Algorithm:** Grabbing the "closest" node from a set of candidates.
- **Data Streams:** Finding the "Top K" elements in a real-time feed of millions of events.
- **Memory Management:** The "Heap" in your programming language (though the name is historical, allocators often use tree structures).

---

## 3. Implementation: The Array Trick
Heaps are almost always implemented using arrays because they are **Complete Binary Trees**.
- Parent of $i \to \lfloor (i-1)/2 \rfloor$
- Left child of $i \to 2i + 1$
- Right child of $i \to 2i + 2$

---

## 4. Complexity Analysis
- **Insert:** $O(\log N)$
- **Extract Max/Min:** $O(\log N)$
- **Peak Max/Min:** $O(1)$
- **Heapify (Building from array):** $O(N)$ (Mathematical magic!)

---

## 5. Common Pitfalls
- **Heap vs. Sorted Array:** Remember, a heap is NOT fully sorted. It only guarantees parent-child relationships.
- **Wait/Notify:** In multi-threaded systems, Priority Queues must be thread-safe to avoid race conditions on the "top" element.
        `
    },
    {
        id: "dsa-trie-exhaustive",
        slug: "trie-data-structure-autocomplete-architecture",
        title: "Tries: The Prefix Tree Architecture",
        description: "Exhaustive guide to Prefix Trees used for Autocomplete, Spell Check, and IP Routing.",
        category: "DSA",
        difficulty: "Advanced",
        tags: ["Trie", "Prefix", "Strings", "Search Optimization"],
        viewCount: 14500,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# Tries: The Search Engine's Secret Weapon

A Trie (pronounced "try") is a k-ary search tree used for efficient retrieval of keys in a large dataset of strings.

## 1. Real-World Motivation
- **Autocomplete:** You type "sc" and the browser suggests "scaleforge".
- **Spell Check:** Quickly identifying if a word exists in a dictionary of 500k words.
- **IP Routing:** Longest prefix matching in network routers.
- **T9 Texting:** (Nostalgia!) Predicting words based on numeric keypad input.

---

## 2. Why use a Trie over a Hash Map?
- **Prefix Search:** Hash maps can't find all words starting with "pre" without checking every key. $O(N \times L)$.
- **Ordered Iteration:** Tries keep words in alphabetical order.
- **Space:** Common prefixes share memory space.

---

## 3. Complexity
- **Insert:** $O(L)$ where $L$ is word length.
- **Search:** $O(L)$.
- **Delete:** $O(L)$.
Note: Space is $O(\text{Total characters in all words})$.

---

## 4. Implementation Concept
Each node contains a map or array of 26 pointers (for English) and a boolean \`isEndOfWord\`.
\`\`\`typescript
class TrieNode {
    children: Map<string, TrieNode> = new Map();
    isEndOfWord: boolean = false;
}
\`\`\`

---

## 5. Interview Insights
- **Key Hint:** If the problem asks you to match many strings against each other or find common prefixes, Tries are the answer.
- **Memory Optimization:** Mention "Compressed Tries" (Radix Trees) where nodes with only one child are merged to save space.
        `
    }
];
