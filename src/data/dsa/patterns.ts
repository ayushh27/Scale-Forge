import { Article } from "@/hooks/useArticles";

export const PATTERN_DSA_ARTICLES: Article[] = [
    {
        id: "dsa-recursion-backtracking-exhaustive",
        slug: "mastering-recursion-and-backtracking",
        title: "Recursion & Backtracking: Exploring all Possibilities",
        description: "Exhaustive guide to recursive thinking, stack frames, and pruning state-space trees.",
        category: "DSA",
        difficulty: "Intermediate",
        tags: ["Recursion", "Backtracking", "State Space", "DFS"],
        viewCount: 19500,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# Recursion & Backtracking: The Depth of Discovery

Recursion is a method where the solution to a problem depends on solutions to smaller instances of the same problem. Backtracking is a refinement that allows us to explore all solutions and "back up" when we hit a dead end.

## 1. Conceptual Introduction
- **Recursion:** A function calling itself with a "Base Case" to stop.
- **Backtracking:** "Trial and Error" on a tree of choices.

---

## 2. Real-World Motivation
- **Sudoku Solvers:** Filling a grid by trying numbers and backtracking on conflict.
- **Circuit Design:** Finding valid paths for wiring.
- **File System Search:** Navigating nested directories.
- **N-Queens Problem:** Classic constraint satisfaction problem.

---

## 3. The Three Rules of Recursion
1. **Base Case:** When to stop.
2. **Recursive Step:** How to break the problem down.
3. **State Management:** Passing variables (like index or current path) down the call stack.

---

## 4. Backtracking Template
\`\`\`typescript
function backtrack(state, choices) {
    if (isGoal(state)) {
        addResult(state);
        return;
    }

    for (let choice of choices) {
        if (isValid(choice, state)) {
            makeChoice(choice, state); // Step In
            backtrack(state, choices);
            undoChoice(choice, state); // Step Out (Backtrack)
        }
    }
}
\`\`\`

---

## 5. Optimization: Pruning
Pruning is the act of stopping a recursive branch early if we know it can't lead to a solution.
- **Example:** In the Sum of Subset problem, if the current sum already exceeds the target, stop exploring that branch.

---

## 6. Common Pitfalls
- **Infinite Recursion:** Forgetting the base case (results in \`RangeError: Maximum call stack size exceeded\`).
- **Memory Overhead:** Every call adds a "Stack Frame". For very deep problems, use an iterative approach or increase stack size.
- **Not "Cleaning Up":** In backtracking, if you modify a global or shared object and forget to revert it (undo), subsequent branches will be corrupted.
        `
    },
    {
        id: "dsa-dynamic-programming-exhaustive",
        slug: "dynamic-programming-patterns-memoization-tabulation",
        title: "Dynamic Programming: The Art of Storing the Past",
        description: "Exhaustive guide to DP: identifying subproblems, state transitions, and space optimization.",
        category: "DSA",
        difficulty: "Advanced",
        tags: ["DP", "Memoization", "Tabulation", "Optimization"],
        viewCount: 31000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# Dynamic Programming: Intelligent Brute Force

Dynamic Programming (DP) is simply **Recursion + Memoization**. It solves complex problems by breaking them into overlapping subproblems and storing the results to avoid redundant work.

## 1. How to Identify a DP Problem?
1. **Optimal Substructure:** The optimal solution can be built from optimal solutions of subproblems.
2. **Overlapping Subproblems:** The same subproblem is solved multiple times (e.g., \`fib(3)\` is needed for both \`fib(4)\` and \`fib(5)\`).

---

## 2. Real-World Motivation
- **Google Search:** Diff algorithms use DP to find the "Edit Distance" between two strings.
- **Logistics:** The Knapsack problem for cargo loading.
- **Financial modeling:** Options pricing and risk analysis.
- **Genomics:** Sequence alignment for DNA matching.

---

## 3. Top-Down (Memoization) vs. Bottom-Up (Tabulation)
- **Top-Down:** Start with the big problem, store results as you go. Closer to natural recursive thinking.
- **Bottom-Up:** Start with the smallest subproblems and build up $(O(1)$ stack space). Generally faster and more memory-efficient.

---

## 4. The 4-Step DP Framework
1. **Define State:** What does \`dp[i]\` represent? (e.g., "Max profit at day i").
2. **State Transition:** \`dp[i] = max(dp[i-1], dp[i-2] + current)\`.
3. **Base Cases:** \`dp[0] = 0\`.
4. **Final Result:** Usually \`dp[n]\`.

---

## 5. Space Optimization Trick
If \`dp[i]\` only depends on \`dp[i-1]\` and \`dp[i-2]\`, you don't need an entire array. You just need **two variables**. This reduces space from $O(N)$ to **$O(1)$**.

---

## 6. Interview Insights
- **Key Hint:** If the problem asks for "Minimum," "Maximum," or "Number of ways to," it's likely a DP problem.
- **The "0/1 Knapsack" Pattern:** Once you master this, you can solve 50% of DP interview questions.
        `
    },
    {
        id: "dsa-greedy-exhaustive",
        slug: "greedy-algorithms-local-vs-global-optimum",
        title: "Greedy Algorithms: The Power of Local Decisions",
        description: "Exhaustive guide to when greedy works, when it fails, and how it powers compression and networking.",
        category: "DSA",
        difficulty: "Intermediate",
        tags: ["Greedy", "Optimization", "Huffman", "Dijkstra"],
        viewCount: 16800,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# Greedy Algorithms: Building the Best Path

A Greedy algorithm makes the locally optimal choice at each step with the hope of finding a global optimum.

## 1. When does Greedy work?
1. **Greedy Choice Property:** You can build a global solution by making local choices.
2. **Optimal Substructure:** Same as DP.

---

## 2. Real-World Motivation
- **Huffman Coding:** Data compression (zip files) uses a greedy approach to build a frequency tree.
- **Dijkstra’s Algorithm:** Always picking the next "closest" node.
- **Prim/Kruskal:** Finding the Minimum Spanning Tree of a network.

---

## 3. Famous Failure: The Coin Change Problem
If you have coins {1, 3, 4} and want to make 6:
- **Greedy:** Takes 4, then 1, then 1 (3 coins).
- **Global Optimum:** Takes 3, then 3 (2 coins).
**Lesson:** Greedy doesn't always work! You must prove it works or use DP for correctness.

---

## 4. Interview Insights
- **Sorting is the first step:** 90% of greedy problems require you to sort the input first (e.g., sorting by end-time for interval scheduling).
- **Fractional Knapsack:** Unlike 0/1 knapsack, the fractional version can be solved greedily by sorting by "Value Per Weight".

---

## 5. Common Pitfalls
- **Assuming Correctness:** Never assume greedy works without testing against small counter-examples.
- **Sorting Overhead:** Don't forget that sorting costs $O(N \log N)$.
        `
    },
    {
        id: "dsa-divide-conquer-exhaustive",
        slug: "divide-and-conquer-recursive-mastery",
        title: "Divide & Conquer: Scaling with Recursion",
        description: "Exhaustive guide to splitting large problems into solvable sub-tasks. MergeSort, QuickSort, and Binary Search.",
        category: "DSA",
        difficulty: "Intermediate",
        tags: ["Divide and Conquer", "Recursion", "Sorting", "Search"],
        viewCount: 18200,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# Divide & Conquer: The Strategy of Scale

Divide and Conquer is a paradigm where you break a problem into subproblems, solve them independently, and merge their results.

## 1. The Three Stages
1. **Divide:** Split the problem into smaller pieces.
2. **Conquer:** Solve the subproblems recursively.
3. **Combine:** Merge the sub-solutions into the final result.

---

## 2. Real-World Motivation
- **Database Sorting:** Large tables are sorted using Merge Sort (stable).
- **Parallel Processing:** MapReduce (Google's massive data engine) is essentially a distributed Divide & Conquer.
- **Graphic Engines:** QuickHull for finding convex hulls in 3D space.
- **Fast Fourier Transform (FFT):** Core to audio processing and image compression.

---

## 3. High-Frequency Algorithms
### Merge Sort
- **Divide:** Split array in half.
- **Conquer:** Recursively sort each half.
- **Combine:** Merge two sorted halves in $O(N)$.
- **Complexity:** $O(N \log N)$ time, $O(N)$ space.

### Binary Search
- **Divide:** Check the middle element.
- **Conquer:** Discard half of the array.
- **Complexity:** $O(\log N)$ time.

---

## 4. Interview Insights
- **Stability:** Merge Sort is stable (preserves order of equals); QuickSort is usually not.
- **QuickSort Pivot:** Explain that Picking a "Random Pivot" is critical to avoid $O(N^2)$ worst-case scenarios on sorted inputs.
- **Space:** Mention that Merge Sort's $O(N)$ space requirement is its biggest weakness compared to QuickSort's $O(1)$/ $O(\log N)$ auxiliary space.
        `
    },
    {
        id: "dsa-sliding-window-exhaustive",
        slug: "sliding-window-optimization-patterns",
        title: "Sliding Window: Linear Time Mastery",
        description: "Exhaustive documentation on sliding window techniques for subarrays and substrings.",
        category: "DSA",
        difficulty: "Intermediate",
        tags: ["Sliding Window", "Optimization", "Arrays", "Strings"],
        viewCount: 22400,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# Sliding Window: The Art of Efficiency

The Sliding Window technique is the standard optimization for problems involving contiguous subarrays or subsegments of a data structure.

## 1. Naive vs. Optimized
Imagine finding the maximum sum of $K$ consecutive elements.
- **Naive (O(N*K)):** For every element, look ahead $K$ times and sum.
- **Optimized (O(N)):** Add the next element, subtract the previous element. The "window" moves across the array.

---

## 2. Real-World Motivation
- **TCP Congestion Control:** Managing how many packets are "in-flight" before an ACK is received.
- **Audio/Video streaming:** Maintaining a buffer of recent frames.
- **Log analysis:** Finding errors in the last 10 minutes of logs.

---

## 3. The Two Flavors
### Fixed Window
The size $K$ is constant.
\`\`\`typescript
function maxSubarraySum(arr, k) {
    let maxSum = 0, windowSum = 0;
    for (let i = 0; i < k; i++) windowSum += arr[i];
    maxSum = windowSum;

    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}
\`\`\`

### Variable Window (Shrink/Expand)
The size changes based on a condition (e.g., "Find shortest subarray summing to $\ge X$").

---

## 4. Interview Tips
- **Keyword:** If the problem asks for a *subset*, *subarray*, or *substring* and mentions *longest/shortest/maximum*.
- **Complexity:** Usually results in $O(N)$ time as each element is visited at most twice (once for expansion, once for shrinkage).
        `
    },
    {
        id: "dsa-01-knapsack-exhaustive",
        slug: "exhaustive-01-knapsack-guide",
        title: "0/1 Knapsack: The DP Master Problem",
        description: "Exhaustive guide to the most famous dynamic programming problem and its variations.",
        category: "DSA",
        difficulty: "Advanced",
        tags: ["DP", "Optimization", "Knapsack"],
        viewCount: 28500,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# 0/1 Knapsack: The Archetype of DP

The 0/1 Knapsack problem is the definitive test of an engineer's understanding of **Overlapping Subproblems** and **Optimal Substructure**.

## 1. Problem Statement
Given weights and values of $N$ items, put these items in a knapsack of capacity $W$ to get the maximum total value. You cannot break items.

## 2. Real-World Analogy
- **Resource Allocation:** Choosing projects to fund with a limited budget.
- **Server Management:** Fitting as many high-value tasks into a VM with limited RAM.

---

## 3. The "Include or Exclude" Logic
For every item, you have two choices:
1. **Include it:** Value = \`current_val + solve(remaining_capacity - current_weight)\`.
2. **Exclude it:** Value = \`solve(remaining_capacity)\`.
Take the **Max** of these two.

---

## 4. Space-Optimized Implementation (Go)
\`\`\`go
func SolveKnapsack(W int, weights []int, values []int) int {
    dp := make([]int, W+1)
    for i := 0; i < len(values); i++ {
        for w := W; w >= weights[i]; w-- {
            dp[w] = max(dp[w], dp[w-weights[i]] + values[i])
        }
    }
    return dp[W]
}
\`\`\`

---

## 5. Complexity Analysis
- **Time:** $O(N \times W)$.
- **Space:** $O(W)$ (Optimized from $O(N \times W)$).

---

## 6. Common Pitfalls
- **Fractional?** If you can break items, use **Greedy** ($O(N \log N)$), not DP.
- **Large Capacity:** If $W$ is very large (e.g., $10^9$), this DP approach fails. Use **Meet-in-the-Middle** ($O(2^{n/2})$).
        `
    }
];
