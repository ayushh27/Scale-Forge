import { Article } from "@/hooks/useArticles";

export const GRAPH_DSA_ARTICLES: Article[] = [
    {
        id: "dsa-graphs-exhaustive",
        slug: "mastering-graphs-and-network-topology",
        title: "Graphs: The Architecture of Connectivity",
        description: "Exhaustive guide to Graph Theory: representation, traversal (BFS/DFS), and real-world network applications.",
        category: "DSA",
        difficulty: "Advanced",
        tags: ["Graphs", "BFS", "DFS", "Connectivity"],
        viewCount: 28000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# Graphs: Modelling the Connected World

A Graph is a set of vertices (nodes) and edges (connections). If Linked Lists were a line, and Trees were a hierarchy, Graphs are a web.

## 1. Real-World Motivation
- **Social Networks:** Who is friends with whom? (LinkedIn/Facebook).
- **Google Maps:** Intersections are nodes, roads are edges.
- **Dependency Graphs:** Package managers (npm/pip) resolving library versions.
- **Recommender Systems:** "Users who bought X also bought Y."

---

## 2. Representation: Adjacency Matrix vs. List
| Type | Memory | Edge Lookup | Best For |
|------|--------|-------------|----------|
| **Matrix** | $O(V^2)$ | $O(1)$ | Dense graphs. |
| **List** | $O(V + E)$ | $O(V)$ | Sparse graphs (Real world). |

---

## 3. Basic Traversals
### BFS (Breadth-First Search)
Explores "layer by layer". Uses a **Queue**.
- **Use Case:** Finding the **shortest path** in an unweighted graph.
### DFS (Depth-First Search)
Explores "deep as possible" before backtracking. Uses a **Stack** or **Recursion**.
- **Use Case:** Detecting cycles, solving puzzles (sudoku), topological sorting.

---

## 4. Advanced: Union-Find (Disjoint Set Union)
A data structure that keeps track of elements split into non-overlapping sets.
- **Goal:** \`find(i)\` and \`union(i, j)\` in near $O(1)$ time using **Path Compression** and **Union by Rank**.
- **Use Case:** Finding connected components in a network or Kruskal's algorithm (MST).

---

## 5. Topological Sorting
Ordering nodes such that for every edge $U \to V$, $U$ comes before $V$.
- **Requirement:** Directed Acyclic Graph (DAG).
- **Use Case:** Task scheduling, build order in CI/CD.

---

## 6. Interview Insights
- **Key Hint:** If the problem asks for "Connectivity," think DFS or Union-Find.
- **Key Hint:** If it asks for "Shortest distance in unweighted," think BFS.
- **Cycle Detection:** In a Directed graph, use recursion stack; in Undirected, check if a visited node isn't the parent.
        `
    },
    {
        id: "dsa-graph-shortest-path-exhaustive",
        slug: "shortest-path-algorithms-dijkstra-bellman-ford",
        title: "Shortest Paths: Dijkstra, Bellman-Ford & Floyd-Warshall",
        description: "Exhaustive guide to finding the most efficient route through weighted networks.",
        category: "DSA",
        difficulty: "Advanced",
        tags: ["Dijkstra", "Bellman-Ford", "Floyd-Warshall", "Graphs"],
        viewCount: 21500,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# Shortest Paths: The Logic of Navigation

When you open Google Maps, you are triggering a massive shortest-path computation. Selecting the right algorithm depends on one question: **Are there negative edge weights?**

## 1. Dijkstra’s Algorithm (The Gold Standard)
- **Goal:** Shortest path from source to all other nodes.
- **State:** Uses a **Min-Priority Queue**.
- **Constraint:** Does NOT work with negative weights.
- **Complexity:** $O((V+E) \log V)$ with a Binary Heap.

## 2. Bellman-Ford (The Resilient One)
- **Goal:** Same as Dijkstra, but handles negative weights.
- **State:** Relaxes all edges $|V|-1$ times.
- **Special Feature:** Can detect **Negative Cycles** (infinite loops of value reduction).
- **Complexity:** $O(V \times E)$.

## 3. Floyd-Warshall (All-Pairs)
- **Goal:** Shortest path between **every pair** of nodes in a graph.
- **Mechanism:** Dynamic Programming ($O(V^3)$).
- **Best For:** Small, dense graphs where you need a lookup table for all distances.

---

## 4. Real-World Motivation
- **Network Routing:** Protocols like OSPF use Dijkstra to route packets.
- **Arbitrage Detection:** Traders use Bellman-Ford to find negative cycles in currency exchange rates to make "infinite" profit (until they crash the market).

---

## 5. Interview-Specific Insights
- **Decision Matrix:** 
    - Unweighted? $\to$ BFS.
    - Weighted (Positive)? $\to$ Dijkstra.
    - Negative Edges? $\to$ Bellman-Ford.
    - All-Pairs? $\to$ Floyd-Warshall.
- **State Space:** Sometimes the "Graph" isn't nodes/edges. It's a grid or a set of states (e.g., "Word Ladder"). Always ask: "What is my node? What is my edge?"
        `
    }
];
