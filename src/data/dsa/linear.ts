import { Article } from "@/hooks/useArticles";

export const LINEAR_DSA_ARTICLES: Article[] = [
    {
        id: "dsa-arrays-exhaustive",
        slug: "mastering-arrays-and-memory",
        title: "Mastering Arrays: From Basics to Optimization",
        description: "Deep dive into array memory layout, operations, and common optimization patterns in SDE interviews.",
        category: "DSA",
        difficulty: "Beginner",
        tags: ["Arrays", "Fundamentals", "DSA"],
        viewCount: 15400,
        updatedAt: "2024-03-24",
        author: "Scaleforge DSA Team",
        version: "1.0.0",
        prerequisites: ["dsa-foundational-overview"],
        relatedTopics: ["dsa-strings-exhaustive", "dsa-stacks-queues-exhaustive", "dsa-sliding-window-exhaustive"],
        content: `
# Mastering Arrays: The Foundation of Memory

In computer science, an array is the most fundamental data structure. It is a collection of items stored at **contiguous memory locations**, which allows for exceptionally fast access.

## 1. Why Arrays Matter
Arrays are the backing structure for almost every other linear data structure (Stacks, Queues, Strings).
- **Random Access:** You can jump to any element in $O(1)$ time.
- **Cache Locality:** Because data is contiguous, CPUs can pre-fetch them into the cache, making arrays significantly faster than Linked Lists for large iterations.

---

## 2. Operations & Performance
| Operation | Complexity | Note |
|-----------|------------|------|
| **Access** | $O(1)$ | Direct memory address calculation. |
| **Search** | $O(N)$ / $O(\log N)$ | Linear search vs. Binary Search (if sorted). |
| **Insertion** | $O(N)$ | Must shift all subsequent elements. |
| **Deletion** | $O(N)$ | Must shift all subsequent elements. |

---

## 3. Real-World Applications
- **Lookup Tables:** High-frequency access to static data.
- **Buffers:** Temporarily storing data from a network stream.
- **Dynamic Programming:** Storing state subproblems (DP Tables).
- **Matrices:** 2D arrays are core to Image Processing and Machine Learning.

---

## 4. Interview-Critical Patterns
1. **Two Pointers:** Solving problems like "Reverse Array" or "Two Sum (Sorted)" in $O(N)$.
2. **Sliding Window:** Finding the maximum sum subarray of size $K$.
3. **Prefix Sum:** Answering range sum queries in $O(1)$ after $O(N)$ pre-processing.

---

## 5. Common Pitfalls
- **Off-by-One:** Using \`arr[length]\` instead of \`arr[length-1]\`.
- **Space Waste:** Pre-allocating massive arrays that are mostly empty ("Sparse Arrays").
- **Cost of Resizing:** Dynamic arrays (ArrayList/Vectors) take $O(N)$ time to double in size when full.
        `
    },
    {
        id: "dsa-stacks-queues-exhaustive",
        slug: "stacks-and-queues-architectural-patterns",
        title: "Stacks & Queues: LIFO vs FIFO Mastery",
        description: "Exhaustive guide to buffer management: from function call stacks to message queues and load balancing.",
        category: "DSA",
        difficulty: "Intermediate",
        tags: ["Stack", "Queue", "LIFO", "FIFO", "Interviews"],
        viewCount: 18500,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        version: "1.0.0",
        prerequisites: ["dsa-arrays-exhaustive"],
        relatedTopics: ["dsa-linked-lists-exhaustive", "dsa-recursion-backtracking-exhaustive"],
        content: `
# Stacks & Queues: The Gatekeepers of Data Flow

While simple on the surface, Stacks and Queues are the internal engine of every operating system and compiler.

## 1. Conceptual Introduction
- **Stack (LIFO):** Last-In, First-Out. Imagine a stack of plates.
- **Queue (FIFO):** First-In, First-Out. Imagine a line at a store.

---

## 2. Real-World Motivation
### Stacks
- **Compiler Design:** Parsing expressions (Shunting-yard algorithm).
- **Undo/Redo:** The "undo" stack stores previous states.
- **Recursion:** The OS uses a "Call Stack" to keep track of function returns.
### Queues
- **Web Servers:** Managing incoming HTTP requests.
- **Task Scheduling:** Asynchronous background jobs (Sidekiq, Redis).
- **Printers:** Multiple users sending jobs to one printer.

---

## 3. Implementation Strategies
- **Using Arrays:** Fast, but requires resizing logic.
- **Using Linked Lists:** Dynamic size, but slightly more memory overhead per element.

---

## 4. Interview Patterns
- **Monotonic Stack:** Find the "next greater element" in $O(N)$.
- **BFS (Breadth-First Search):** Uses a Queue to explore graph levels.
- **Queue using Two Stacks:** A classic design question testing your understanding of data movement.

---

## 5. Advanced: Deque (Double-Ended Queue)
A Deque allows insertion and deletion from both ends.
- **Use Case:** Sliding Window Maximum problem. By maintaining a deque of indices, we can solve this in $O(N)$ time.

---

## 6. Common Pitfalls
- **Stack Overflow:** Infinite recursion blowing the memory limit.
- **Wait/Block on Empty Queue:** In multi-threaded systems, ensure your queue handles "Empty" states without crashing (Blocking Queues).
        `
    },
    {
        id: "dsa-hashing-exhaustive",
        slug: "hashing-and-hash-tables-deep-dive",
        title: "Hashing: The Art of Constant Time Access",
        description: "Exhaustive documentation on hash functions, collision resolution, and real-world distributed hashing.",
        category: "DSA",
        difficulty: "Intermediate",
        tags: ["Hashing", "Hash Map", "Collisions", "Security"],
        viewCount: 20500,
        updatedAt: "2024-04-14",
        author: "Scaleforge Backend Team",
        version: "1.0.0",
        prerequisites: ["dsa-foundational-overview", "dsa-arrays-exhaustive"],
        relatedTopics: ["dsa-heaps-exhaustive", "dsa-consistent-hashing"],
        content: `
# Hashing: The Invisible Engine

Hashing is arguably the most important concept in efficient software engineering. It powers everything from \`dictionaries\` to secure password storage.

## 1. How it Works
A **Hash Function** takes an input (key) and turns it into a fixed-size integer (index).
\`\`\`
Index = HashFunction(Key) % ArraySize
\`\`\`
This allows us to store and retrieve data in **$O(1)$ average time**.

---

## 2. Real-World Motivation
- **Database Indexing:** Finding a row by ID in milliseconds.
- **Caching:** Using Redis (a distributed hash map) to store session data.
- **Unique Identification:** Git uses SHA-1 hashing to identify code commits.
- **Consistent Hashing:** Used in Load Balancers like Nginx to route users to the same server.

---

## 3. The Challenge: Collisions
When two different keys produce the same index, we have a collision.
1. **Chaining:** Use a Linked List at each index. $(O(1 + \lambda))$
2. **Open Addressing:** Find the next empty slot (Linear Probing).
3. **Double Hashing:** Use a second hash function to find the next slot.

---

## 4. Designing a Good Hash Function
- **Deterministic:** Same input always gives same output.
- **Fast:** Computation must be near-instant.
- **Uniform:** Spreads keys evenly across the array.

---

## 5. Interview-Specific Insights
- **Standard Library:** Mention that Java uses \`HashMap\` with Red-Black tree conversion for long chains (to keep worst-case at $O(\log N)$).
- **Load Factor:** The ratio of elements to slots. When load factor > 0.75, most libraries **rehash** (resize) the table.

---

## 6. Common Pitfalls
- **Mutable Keys:** If you change an object's ID *after* putting it in a map, you can never find it again (the hash changed).
- **Security:** Poor hash functions are vulnerable to "Hash Flooding" attacks. Use cryptographically secure hashes (like SipHash) for user-facing inputs.
        `
    },
    {
        id: "dsa-strings-exhaustive",
        slug: "strings-data-structure-mastery",
        title: "String Mastery: Patterns, Manipulation & Memory",
        description: "Exhaustive guide to strings: from immutable memory buffers to advanced pattern matching used in search engines.",
        category: "DSA",
        difficulty: "Intermediate",
        tags: ["Strings", "Memory", "Patterns", "Sliding Window"],
        viewCount: 22000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core Team",
        version: "1.0.0",
        prerequisites: ["dsa-arrays-exhaustive"],
        relatedTopics: ["dsa-trie-exhaustive", "dsa-sliding-window-exhaustive"],
        content: `
# String Mastery: Architecture of Text

In modern engineering, strings are the primary data format for everything from JSON APIs to DNA sequencing. Understanding their memory layout and algorithmic complexity is the difference between a high-performance system and one that crashes under load.

## 1. Conceptual Introduction
A string is traditionally an array of characters. However, in modern high-level languages (Java, Python, JavaScript), strings are **Immutable Objects**. This means once a string is created, it cannot be changed in-place.

---

## 2. Real-World Motivation
Why should you care about string optimization?
- **Search Engines:** Identifying patterns in billions of web pages (KMP/Z-Algorithm).
- **Text Editors:** Managing thousands of inserts/deletes per second (Ropes/Gap Buffers).
- **Bioinformatics:** Matching DNA sequences (Longest Common Subsequence).
- **URL Routing:** Matching request paths to controller logic.

---

## 3. The Memory Trap: Immutability
When you do \`str = str + "!"\` in a loop, you are not adding a character. You are:
1. Allocating a new memory block.
2. Copying the old string.
3. Adding the new character.
4. Garbage collecting the old string.
**Complexity:** $O(N^2)$ for $N$ additions.

**Production Solution:** Use a \`StringBuilder\` (Java/C#) or join a list/array (Python/JS).

---

## 4. Essential Interview Patterns

### Pattern A: Symmetry (Palindromes)
The standard "Two Pointers" approach.
\`\`\`typescript
function isPalindrome(s: string): boolean {
    let left = 0, right = s.length - 1;
    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    while (left < right) {
        if (clean[left++] !== clean[right--]) return false;
    }
    return true;
}
\`\`\`

### Pattern B: Anagrams (Hashing/Frequency)
Using a hash map or a frequency array (size 26 for lowercase English) to count characters.
**Trade-off:**
- **Sorting:** $O(N \log N)$ time, $O(1)$ space.
- **Hashing:** $O(N)$ time, $O(1)$ space (fixed size array).

---

## 5. Optimized Solution: Search Patterns
### The KMP Algorithm (Knuth-Morris-Pratt)
Instead of backtracking on every mismatch, KMP uses a "Partial Match Table" (LPS) to skip characters.
- **Naive Search:** $O(N \times M)$
- **KMP Search:** $O(N + M)$

---

## 6. Edge Cases & Pitfalls
- **UTF-16 vs UTF-8:** Characters like 🔥 use 2 units in JS strings (\`length\` is 2).
- **Empty Strings:** Always check \`if (!s)\`.
- **Case Sensitivity:** Normalize your inputs before comparison.
- **In-place reversal:** In languages like C++, you can reverse in-place ($O(1)$ space). In JS, you must create a new string ($O(N)$ space).

---

## 7. Interview Insights
- **Key Hint:** If a string problem asks for "all possible orderings," think **Backtracking**.
- **Key Hint:** If it asks for "longest substring with condition," think **Sliding Window**.
- **Key Hint:** If you're matching multiple words at once, use a **Trie**.
        `
    },
    {
        id: "dsa-linked-lists-exhaustive",
        slug: "linked-lists-production-implementation",
        title: "Linked Lists: Beyond the Pointer Basics",
        description: "Production-grade guide to Singly, Doubly, and Circular Linked Lists with cycle detection and LRU applications.",
        category: "DSA",
        difficulty: "Intermediate",
        tags: ["Linked List", "Memory", "Cycle Detection", "Pointers"],
        viewCount: 19800,
        updatedAt: "2024-04-14",
        author: "Scaleforge Ops",
        version: "1.0.0",
        prerequisites: ["dsa-foundational-overview"],
        relatedTopics: ["dsa-stacks-queues-exhaustive", "be-caching-patterns"],
        content: `
# Linked Lists: Strategic Data Flow

Unlike arrays, Linked Lists are not stored in contiguous memory. They are a collection of "Nodes" scattered in memory, connected by pointers.

## 1. Real-World Motivation
- **LRU Cache:** Using a Doubly Linked List + Hash Map to evict items in $O(1)$.
- **Music Playlists:** Circular Linked Lists for "Repeat All" functionality.
- **Undo/Redo:** Navigating back and forth through states.
- **OS Scheduling:** Managing processes in a queue.

---

## 2. Trade-offs (Array vs. List)
| Feature | Array | Linked List |
|---------|-------|-------------|
| **Random Access** | O(1) | O(N) |
| **Insert/Delete (Start)** | O(N) | O(1) |
| **Memory Locality** | High (Cache-friendly) | Low (Cache misses) |
| **Space Overhead** | Low | High (Pointer storage) |

---

## 3. High-Frequency Interview Problems

### Cycle Detection (Floyd’s Tortoise & Hare)
Using two pointers (slow and fast) to detect if a list loops back on itself.
\`\`\`typescript
function hasCycle(head: ListNode | null): boolean {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow!.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}
\`\`\`

### Reversing a List (The "Grandfather" of LL problems)
Iterative approach is better than recursive (to avoid stack overflow on long lists).
\`\`\`typescript
function reverseList(head: ListNode | null): ListNode | null {
    let prev = null, curr = head;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
\`\`\`

---

## 4. Advanced Concepts: Doubly Linked Lists
Each node has \`next\` and \`prev\`.
- **Benefit:** Can delete a node in $O(1)$ if you have a reference to the node itself (no need to track the previous node manually).
- **Core of LRU:** When a node is accessed, you "unhook" it from its current position and "move it to front"—both $O(1)$ operations.

---

## 5. Common Pitfalls
- **Losing the Head:** Updating the head pointer and losing the reference to the rest of the list.
- **Dangling Pointers:** In languages like C++, forgetting to \`null\` out pointers after deletion.
- **Next of Null:** Accessing \`node.next.val\` when \`node.next\` is null. **Always check \`if (node.next)\`**.

---

## 6. Interview Insights
- **The "Dummy Node" Hack:** Use a \`dummy\` node (\`new ListNode(0)\`) to handle edge cases where you might need to insert at the beginning or delete the head. It simplifies code by 50%.
- **Multiple Pointers:** Many LL problems (finding middle, Nth node from end) are solved using two pointers with a specific gap between them.
        `
    }
];
