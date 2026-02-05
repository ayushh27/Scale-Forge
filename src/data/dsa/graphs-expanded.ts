import { Article } from "@/hooks/useArticles";

export const GRAPHS_EXPANDED: Article = {
    id: "dsa-graphs-master",
    slug: "graphs-complete-guide",
    title: "Graph Data Structures & Algorithms",
    description: "Graphs are non-linear data structures consisting of vertices (nodes) and edges (connections). Essential for networks, social graphs, maps, and complex relationships.",
    category: "DSA",
    difficulty: "Advanced",
    tags: ["Graphs", "BFS", "DFS", "Dijkstra", "Networks"],
    viewCount: 45000,
    updatedAt: "2026-02-05",
    author: "ScaleForge DSA Team",
    version: "2.0.0",
    prerequisites: ["trees-complete-guide", "stack-queue-complete-guide"],
    relatedTopics: ["dynamic-programming", "greedy"],
    content: `
# Graph Data Structures & Algorithms

**Last Updated:** 05 Feb, 2026

Graphs are non-linear data structures consisting of vertices (nodes) connected by edges. They model complex relationships and networks, making them essential for social networks, maps, recommendation systems, and network routing.

## 📌 Introduction

### What Problem Does It Solve?

Graphs solve the problem of **representing and analyzing complex relationships** where connections between entities matter as much as the entities themselves.

**Real-World Problems:**
- **Social Networks**: Friend connections, followers
- **Maps**: Cities connected by roads
- **Internet**: Web pages linked by hyperlinks
- **Dependencies**: Package dependencies, task scheduling
- **Recommendations**: "Users who bought X also bought Y"

### Why It Matters in Real Systems

1. **Network Analysis**: Understanding connectivity and flow
2. **Pathfinding**: GPS navigation, game AI
3. **Dependency Resolution**: Build systems, package managers
4. **Recommendation Engines**: Netflix, Amazon, Spotify
5. **Fraud Detection**: Analyzing transaction patterns

### Where Used in Industry

| Company | Use Case |
|---------|----------|
| **Google** | PageRank algorithm, Maps routing |
| **Facebook** | Social graph, friend suggestions |
| **LinkedIn** | Professional network, job recommendations |
| **Uber/Lyft** | Route optimization, driver matching |
| **Netflix** | Content recommendation graph |

---

## 🧠 Concept Deep Dive

### Theory: Simple → Advanced

#### Level 1: Basic Understanding

**Graph Components:**

\\\`\\\`\\\`
Vertices (Nodes): A, B, C, D
Edges (Connections): (A,B), (A,C), (B,D), (C,D)

Undirected Graph:
    A --- B
    |     |
    C --- D

Directed Graph (Digraph):
    A → B
    ↓   ↓
    C → D
\\\`\\\`\\\`

**Key Terminology:**
- **Vertex (Node)**: Entity in the graph
- **Edge**: Connection between vertices
- **Degree**: Number of edges connected to a vertex
- **Path**: Sequence of vertices connected by edges
- **Cycle**: Path that starts and ends at same vertex
- **Connected**: Path exists between any two vertices

#### Level 2: Graph Types

**1. Directed vs Undirected**
\\\`\\\`\\\`
Undirected: A -- B (bidirectional)
Directed:   A → B (one-way)
\\\`\\\`\\\`

**2. Weighted vs Unweighted**
\\\`\\\`\\\`
Unweighted: A -- B (no cost)
Weighted:   A --(5)-- B (cost = 5)
\\\`\\\`\\\`

**3. Cyclic vs Acyclic**
\\\`\\\`\\\`
Cyclic: A → B → C → A (has cycle)
Acyclic (DAG): A → B → C (no cycles)
\\\`\\\`\\\`

**4. Connected vs Disconnected**
\\\`\\\`\\\`
Connected: All vertices reachable
Disconnected: Some vertices isolated
\\\`\\\`\\\`

#### Level 3: Graph Representation

**1. Adjacency Matrix**
\\\`\\\`\\\`
     A  B  C  D
A  [ 0  1  1  0 ]
B  [ 1  0  0  1 ]
C  [ 1  0  0  1 ]
D  [ 0  1  1  0 ]

Space: O(V²)
Edge lookup: O(1)
Add edge: O(1)
\\\`\\\`\\\`

**2. Adjacency List**
\\\`\\\`\\\`
A → [B, C]
B → [A, D]
C → [A, D]
D → [B, C]

Space: O(V + E)
Edge lookup: O(degree)
Add edge: O(1)
\\\`\\\`\\\`

**3. Edge List**
\\\`\\\`\\\`
[(A, B), (A, C), (B, D), (C, D)]

Space: O(E)
Edge lookup: O(E)
\\\`\\\`\\\`

### Edge Cases

1. **Empty Graph**: No vertices or edges
2. **Single Vertex**: No edges
3. **Self-Loop**: Edge from vertex to itself
4. **Multiple Edges**: Multiple connections between same vertices
5. **Disconnected Components**: Separate subgraphs

---

## ⏱️ Time & Space Analysis

### Graph Algorithms Complexity

| Algorithm | Time | Space | Use Case |
|-----------|------|-------|----------|
| **BFS** | O(V + E) | O(V) | Shortest path (unweighted) |
| **DFS** | O(V + E) | O(V) | Cycle detection, topological sort |
| **Dijkstra** | O((V + E) log V) | O(V) | Shortest path (weighted, non-negative) |
| **Bellman-Ford** | O(VE) | O(V) | Shortest path (negative weights) |
| **Floyd-Warshall** | O(V³) | O(V²) | All-pairs shortest path |
| **Kruskal's MST** | O(E log E) | O(V) | Minimum spanning tree |
| **Prim's MST** | O((V + E) log V) | O(V) | Minimum spanning tree |
| **Topological Sort** | O(V + E) | O(V) | Task scheduling (DAG) |

*V = vertices, E = edges*

### Trade-offs

**Adjacency Matrix vs List:**

| Feature | Matrix | List |
|---------|--------|------|
| **Space** | O(V²) - wasteful for sparse | O(V + E) - efficient |
| **Edge Check** | O(1) | O(degree) |
| **Iterate Neighbors** | O(V) | O(degree) |
| **Best For** | Dense graphs | Sparse graphs |

---

## 💻 Implementation

### Graph Representation

#### C++ (Adjacency List)
\\\`\\\`\\\`cpp
#include <iostream>
#include <vector>
#include <queue>
#include <stack>
#include <unordered_set>
using namespace std;

class Graph {
private:
    int V;  // Number of vertices
    vector<vector<int>> adj;  // Adjacency list
    
public:
    Graph(int vertices) : V(vertices) {
        adj.resize(V);
    }
    
    void addEdge(int u, int v, bool directed = false) {
        adj[u].push_back(v);
        if (!directed) {
            adj[v].push_back(u);
        }
    }
    
    // BFS Traversal
    void BFS(int start) {
        vector<bool> visited(V, false);
        queue<int> q;
        
        visited[start] = true;
        q.push(start);
        
        while (!q.empty()) {
            int vertex = q.front();
            q.pop();
            cout << vertex << " ";
            
            for (int neighbor : adj[vertex]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
        cout << endl;
    }
    
    // DFS Traversal (Recursive)
    void DFS(int start) {
        vector<bool> visited(V, false);
        DFSUtil(start, visited);
        cout << endl;
    }
    
    void DFSUtil(int vertex, vector<bool>& visited) {
        visited[vertex] = true;
        cout << vertex << " ";
        
        for (int neighbor : adj[vertex]) {
            if (!visited[neighbor]) {
                DFSUtil(neighbor, visited);
            }
        }
    }
    
    // Detect Cycle (Undirected Graph)
    bool hasCycle() {
        vector<bool> visited(V, false);
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                if (hasCycleUtil(i, visited, -1)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    bool hasCycleUtil(int v, vector<bool>& visited, int parent) {
        visited[v] = true;
        
        for (int neighbor : adj[v]) {
            if (!visited[neighbor]) {
                if (hasCycleUtil(neighbor, visited, v)) {
                    return true;
                }
            } else if (neighbor != parent) {
                return true;  // Back edge found
            }
        }
        return false;
    }
};
\\\`\\\`\\\`

### Dijkstra's Algorithm

#### Java
\\\`\\\`\\\`java
import java.util.*;

class Edge {
    int dest, weight;
    
    Edge(int dest, int weight) {
        this.dest = dest;
        this.weight = weight;
    }
}

class Graph {
    private int V;
    private List<List<Edge>> adj;
    
    Graph(int vertices) {
        V = vertices;
        adj = new ArrayList<>(V);
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
    }
    
    void addEdge(int src, int dest, int weight) {
        adj.get(src).add(new Edge(dest, weight));
        adj.get(dest).add(new Edge(src, weight));  // Undirected
    }
    
    // Dijkstra's Shortest Path
    int[] dijkstra(int start) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        pq.offer(new int[]{start, 0});
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0];
            int d = curr[1];
            
            if (d > dist[u]) continue;
            
            for (Edge edge : adj.get(u)) {
                int v = edge.dest;
                int weight = edge.weight;
                
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.offer(new int[]{v, dist[v]});
                }
            }
        }
        
        return dist;
    }
}
\\\`\\\`\\\`

#### Python
\\\`\\\`\\\`python
from collections import defaultdict, deque
import heapq

class Graph:
    def __init__(self, vertices):
        self.V = vertices
        self.adj = defaultdict(list)
    
    def add_edge(self, u, v, weight=1, directed=False):
        self.adj[u].append((v, weight))
        if not directed:
            self.adj[v].append((u, weight))
    
    def bfs(self, start):
        """Breadth-First Search"""
        visited = set()
        queue = deque([start])
        visited.add(start)
        result = []
        
        while queue:
            vertex = queue.popleft()
            result.append(vertex)
            
            for neighbor, _ in self.adj[vertex]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return result
    
    def dfs(self, start):
        """Depth-First Search"""
        visited = set()
        result = []
        
        def dfs_util(v):
            visited.add(v)
            result.append(v)
            
            for neighbor, _ in self.adj[v]:
                if neighbor not in visited:
                    dfs_util(neighbor)
        
        dfs_util(start)
        return result
    
    def dijkstra(self, start):
        """Dijkstra's Shortest Path"""
        dist = {i: float('inf') for i in range(self.V)}
        dist[start] = 0
        
        pq = [(0, start)]  # (distance, vertex)
        
        while pq:
            d, u = heapq.heappop(pq)
            
            if d > dist[u]:
                continue
            
            for v, weight in self.adj[u]:
                if dist[u] + weight < dist[v]:
                    dist[v] = dist[u] + weight
                    heapq.heappush(pq, (dist[v], v))
        
        return dist
    
    def topological_sort(self):
        """Topological Sort (for DAG)"""
        visited = set()
        stack = []
        
        def dfs_util(v):
            visited.add(v)
            for neighbor, _ in self.adj[v]:
                if neighbor not in visited:
                    dfs_util(neighbor)
            stack.append(v)
        
        for i in range(self.V):
            if i not in visited:
                dfs_util(i)
        
        return stack[::-1]

# Usage
g = Graph(5)
g.add_edge(0, 1, 4)
g.add_edge(0, 2, 1)
g.add_edge(2, 1, 2)
g.add_edge(1, 3, 1)
g.add_edge(2, 3, 5)

print("BFS:", g.bfs(0))
print("DFS:", g.dfs(0))
print("Dijkstra:", g.dijkstra(0))
\\\`\\\`\\\`

#### JavaScript/TypeScript
\\\`\\\`\\\`typescript
class Graph {
    private V: number;
    private adj: Map<number, Array<[number, number]>>;
    
    constructor(vertices: number) {
        this.V = vertices;
        this.adj = new Map();
        for (let i = 0; i < vertices; i++) {
            this.adj.set(i, []);
        }
    }
    
    addEdge(u: number, v: number, weight: number = 1, directed: boolean = false): void {
        this.adj.get(u)?.push([v, weight]);
        if (!directed) {
            this.adj.get(v)?.push([u, weight]);
        }
    }
    
    bfs(start: number): number[] {
        const visited = new Set<number>();
        const queue: number[] = [start];
        const result: number[] = [];
        visited.add(start);
        
        while (queue.length > 0) {
            const vertex = queue.shift()!;
            result.push(vertex);
            
            for (const [neighbor] of this.adj.get(vertex) || []) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        
        return result;
    }
    
    dfs(start: number): number[] {
        const visited = new Set<number>();
        const result: number[] = [];
        
        const dfsUtil = (v: number) => {
            visited.add(v);
            result.push(v);
            
            for (const [neighbor] of this.adj.get(v) || []) {
                if (!visited.has(neighbor)) {
                    dfsUtil(neighbor);
                }
            }
        };
        
        dfsUtil(start);
        return result;
    }
    
    dijkstra(start: number): Map<number, number> {
        const dist = new Map<number, number>();
        for (let i = 0; i < this.V; i++) {
            dist.set(i, Infinity);
        }
        dist.set(start, 0);
        
        const pq: Array<[number, number]> = [[0, start]];
        
        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]);
            const [d, u] = pq.shift()!;
            
            if (d > (dist.get(u) || Infinity)) continue;
            
            for (const [v, weight] of this.adj.get(u) || []) {
                const newDist = (dist.get(u) || 0) + weight;
                if (newDist < (dist.get(v) || Infinity)) {
                    dist.set(v, newDist);
                    pq.push([newDist, v]);
                }
            }
        }
        
        return dist;
    }
}
\\\`\\\`\\\`

---

## 🏢 Real-World Usage

### System Examples

#### 1. **Social Network (Friend Suggestions)**
\\\`\\\`\\\`python
def friend_suggestions(graph, user):
    """
    Suggest friends: friends of friends who aren't already friends
    """
    friends = set(graph[user])
    suggestions = set()
    
    for friend in friends:
        for friend_of_friend in graph[friend]:
            if friend_of_friend != user and friend_of_friend not in friends:
                suggestions.add(friend_of_friend)
    
    return list(suggestions)

# Social graph
social_graph = {
    'Alice': ['Bob', 'Charlie'],
    'Bob': ['Alice', 'David'],
    'Charlie': ['Alice', 'Eve'],
    'David': ['Bob'],
    'Eve': ['Charlie']
}

print(friend_suggestions(social_graph, 'Alice'))  # ['David', 'Eve']
\\\`\\\`\\\`

#### 2. **Package Dependency Resolution**
\\\`\\\`\\\`javascript
function resolveDependencies(packages) {
    // Topological sort to determine install order
    const graph = new Map();
    const inDegree = new Map();
    
    // Build graph
    for (const [pkg, deps] of Object.entries(packages)) {
        if (!graph.has(pkg)) graph.set(pkg, []);
        if (!inDegree.has(pkg)) inDegree.set(pkg, 0);
        
        for (const dep of deps) {
            if (!graph.has(dep)) graph.set(dep, []);
            graph.get(dep).push(pkg);
            inDegree.set(pkg, (inDegree.get(pkg) || 0) + 1);
        }
    }
    
    // Kahn's algorithm (topological sort)
    const queue = [];
    for (const [pkg, degree] of inDegree) {
        if (degree === 0) queue.push(pkg);
    }
    
    const order = [];
    while (queue.length > 0) {
        const pkg = queue.shift();
        order.push(pkg);
        
        for (const dependent of graph.get(pkg) || []) {
            inDegree.set(dependent, inDegree.get(dependent) - 1);
            if (inDegree.get(dependent) === 0) {
                queue.push(dependent);
            }
        }
    }
    
    return order;
}

const packages = {
    'app': ['express', 'mongoose'],
    'express': ['body-parser'],
    'mongoose': [],
    'body-parser': []
};

console.log(resolveDependencies(packages));
// ['mongoose', 'body-parser', 'express', 'app']
\\\`\\\`\\\`

#### 3. **GPS Navigation (Shortest Path)**
\\\`\\\`\\\`cpp
// Dijkstra for GPS routing
struct Road {
    int dest;
    int distance;  // in km
};

vector<int> findShortestRoute(vector<vector<Road>>& map, int start, int end) {
    int n = map.size();
    vector<int> dist(n, INT_MAX);
    vector<int> parent(n, -1);
    
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    
    dist[start] = 0;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (u == end) break;
        if (d > dist[u]) continue;
        
        for (auto& road : map[u]) {
            int v = road.dest;
            int w = road.distance;
            
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                parent[v] = u;
                pq.push({dist[v], v});
            }
        }
    }
    
    // Reconstruct path
    vector<int> path;
    for (int v = end; v != -1; v = parent[v]) {
        path.push_back(v);
    }
    reverse(path.begin(), path.end());
    
    return path;
}
\\\`\\\`\\\`

---

## 🎯 Interview Angle

### Common Traps

1. **Forgetting Visited Set**
   \\\`\\\`\\\`python
   # ❌ Wrong - infinite loop in cyclic graph
   def dfs(graph, node):
       print(node)
       for neighbor in graph[node]:
           dfs(graph, neighbor)
   
   # ✅ Correct - track visited
   def dfs(graph, node, visited=None):
       if visited is None:
           visited = set()
       if node in visited:
           return
       visited.add(node)
       print(node)
       for neighbor in graph[node]:
           dfs(graph, neighbor, visited)
   \\\`\\\`\\\`

2. **Dijkstra with Negative Weights**
   \\\`\\\`\\\`java
   // ❌ Wrong - Dijkstra doesn't work with negative weights
   // Use Bellman-Ford instead
   
   // ✅ Correct for negative weights
   int[] bellmanFord(int[][] edges, int V, int start) {
       int[] dist = new int[V];
       Arrays.fill(dist, Integer.MAX_VALUE);
       dist[start] = 0;
       
       // Relax edges V-1 times
       for (int i = 0; i < V - 1; i++) {
           for (int[] edge : edges) {
               int u = edge[0], v = edge[1], w = edge[2];
               if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                   dist[v] = dist[u] + w;
               }
           }
       }
       
       return dist;
   }
   \\\`\\\`\\\`

3. **Topological Sort on Cyclic Graph**
   \\\`\\\`\\\`cpp
   // Topological sort only works on DAG (Directed Acyclic Graph)
   // Always check for cycles first!
   
   bool hasCycle(vector<vector<int>>& adj, int V) {
       vector<int> color(V, 0);  // 0: white, 1: gray, 2: black
       
       function<bool(int)> dfs = [&](int u) {
           color[u] = 1;  // Mark as visiting
           
           for (int v : adj[u]) {
               if (color[v] == 1) return true;  // Back edge = cycle
               if (color[v] == 0 && dfs(v)) return true;
           }
           
           color[u] = 2;  // Mark as visited
           return false;
       };
       
       for (int i = 0; i < V; i++) {
           if (color[i] == 0 && dfs(i)) return true;
       }
       return false;
   }
   \\\`\\\`\\\`

### Question Variations

| Pattern | Example Problem | Key Technique |
|---------|----------------|---------------|
| **Traversal** | Number of Islands | BFS/DFS |
| **Shortest Path** | Network Delay Time | Dijkstra |
| **Cycle Detection** | Course Schedule | DFS with colors |
| **Topological Sort** | Task Scheduling | Kahn's algorithm |
| **MST** | Connecting Cities | Kruskal's or Prim's |
| **Bipartite** | Is Graph Bipartite? | BFS with 2-coloring |
| **Union-Find** | Number of Provinces | Disjoint set |

### Interview Pro Tips

1. **Always clarify:**
   - Directed or undirected?
   - Weighted or unweighted?
   - Can there be cycles?
   - Connected or disconnected?
   - Sparse or dense?

2. **Common techniques:**
   - **BFS**: Shortest path (unweighted), level-order
   - **DFS**: Cycle detection, topological sort, connected components
   - **Dijkstra**: Shortest path (weighted, non-negative)
   - **Union-Find**: Connected components, MST

3. **Edge cases:**
   - Empty graph
   - Single vertex
   - Disconnected components
   - Self-loops
   - Negative weight cycles

---

## 📝 Practice Problems

### Easy
1. **Find if Path Exists in Graph** - BFS/DFS
2. **Number of Provinces** - DFS or Union-Find
3. **Find Center of Star Graph** - Degree count
4. **Find the Town Judge** - In-degree/out-degree
5. **All Paths From Source to Target** - DFS backtracking

### Medium
1. **Number of Islands** - BFS/DFS on grid
2. **Clone Graph** - DFS with hash map
3. **Course Schedule** - Cycle detection
4. **Course Schedule II** - Topological sort
5. **Pacific Atlantic Water Flow** - Multi-source BFS
6. **Network Delay Time** - Dijkstra
7. **Cheapest Flights Within K Stops** - Modified Dijkstra

### Hard
1. **Word Ladder** - BFS with transformations
2. **Alien Dictionary** - Topological sort
3. **Critical Connections in a Network** - Tarjan's algorithm
4. **Swim in Rising Water** - Binary search + BFS
5. **Shortest Path Visiting All Nodes** - BFS + bitmask

---

## 🔗 Additional Resources

- [Visualize Graphs](https://visualgo.net/en/graphds)
- [LeetCode Graph Problems](https://leetcode.com/tag/graph/)
- [Graph Algorithms Visualization](https://www.cs.usfca.edu/~galles/visualization/Dijkstra.html)

---

## 📚 Next Steps

After mastering graphs:
1. **Advanced Graph Algorithms** - Floyd-Warshall, A* search
2. **Network Flow** - Max flow, min cut
3. **Graph Theory** - Eulerian paths, Hamiltonian cycles
4. **Dynamic Programming on Graphs** - Traveling salesman

---

*Remember: Graphs are everywhere. Master them, and you master the art of modeling complex relationships.*
    `
};
