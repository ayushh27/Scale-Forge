import { Article } from "@/hooks/useArticles";

export const SYSTEM_DESIGN_ARTICLES: Article[] = [
    {
        id: "sd-foundational-overview",
        slug: "why-system-design-matters",
        title: "System Design: Architecting the Future",
        description: "Moving from coding to architecture. Why the most valuable engineers are those who can design for scale.",
        category: "System Design",
        difficulty: "Beginner",
        tags: ["Foundations", "Architecture", "Scalability"],
        viewCount: 38000,
        updatedAt: "2024-04-12",
        author: "Principal Architect",
        content: `
# System Design: Architecting for Scale

As you progress from a Junior to a Senior Engineer, your value shifts. It's no longer just about *how* you write a function, but *where* that function lives in a distributed network.

## 1. Why System Design is Critical
When you build an app for 10 users, you can ignore architecture. When you build for 10 million, the laws of physics and networking apply:
- **Availability:** If one server dies, does the whole site go down?
- **Scalability:** Can your database handle 10x the traffic by just adding more nodes?
- **Reliability:** When a network packet is lost, does your user lose their money in a bank transfer?

## 2. Core Pillars of Good Design
1. **Scalability (Vertical vs. Horizontal):** Adding power to one machine vs. adding more machines.
2. **Availability vs. Consistency (CAP Theorem):** Choosing between the system being "always up" or "always accurate."
3. **Partition Tolerance:** Real-world networks break. Your design must survive it.

---

## 3. The SDE-2/SDE-3 Interview Focus
Interviewers aren't looking for a perfect diagram. they are testing your **Reasoning**:
- **Estimation:** Can you calculate the storage needed for 1 billion photos?
- **Component Choice:** Why use NoSQL over SQL? Why Redis over Memcached?
- **Failure Modes:** What happens if the primary database is disconnected?

## 4. The Path to Mastery
1. **The Basics (Beginner):** DNS, Load Balancers, Proxies.
2. **Databases (Intermediate):** Replication, Sharding, Consistency levels.
3. **Communication (Intermediate):** REST vs. gRPC, Message Queues (Kafka).
4. **Advanced Architectures:** Microservices, Event-Driven Design, Serverless.
        `
    },
    {
        id: "sd-url-shortener",
        slug: "designing-a-scalable-url-shortener",
        title: "System Design: Scalable URL Shortener (Bitly Clone)",
        description: "Detailed architecture for a URL shortening service handling millions of writes and billions of reads with global latency optimization.",
        category: "System Design",
        difficulty: "Intermediate",
        tags: ["Scalability", "Hashing", "NoSQL", "High Availability"],
        viewCount: 22000,
        updatedAt: "2024-03-26",
        author: "System Architect",
        content: `
# System Design: Scalable URL Shortener

Designing a URL shortener like Bitly or TinyURL is a classic interview question that tests your ability to handle **high-read throughput**, **data persistence**, and **global low-latency redirection**.

## 1. Requirements & Constraints
### Service Expectations
- **High Availability:** Redirection must be atomic and always accessible.
- **Minimal Latency:** Redirection must occur at the "Edge" where possible.
- **Persistence:** Links never expire unless requested by a user.

### Mathematical Scale
- **Read/Write Ratio:** 100:1 (Read-heavy).
- **Traffic:** 500 Million new URLs per month.
- **Estimated Reads:** 50 Billion redirects per month.

---

## 2. The Core Mechanism: ID Generation
The challenge is generating a short string (e.g., \`sf.io/abc123\`) for a long URL.

### Base62 Encoding
We use [a-z, A-Z, 0-9] characters. A 7-character string gives us:
$62^7 = 3,521,614,606,208$ unique IDs (~3.5 Trillion).

### Strategy: Centralized Counter (Zookeeper/Redis)
To avoid collisions in a distributed system, application servers request "ID Ranges" from a central coordinator like **Apache Zookeeper**.
1. Server A asks for 1-1000.
2. Server B asks for 1001-2000.
3. If Server A crashes, range 1-1000 is lost (acceptable trade-off for simplicity).

---

## 3. Database Layer: Choosing the Right Schema
Since we don't need complex relations, a **Key-Value Store** or **Wide-Column NoSQL** (Cassandra/DynamoDB) is ideal.

| Partition Key | Sort Key | Value (Original URL) | Metadata (Owner, CreatedAt) |
|---------------|----------|----------------------|-----------------------------|
| hash_id       | -        | https://google.com  | { "user": 42 }             |

---

## 4. Global Performance: Redirection at the Edge
To achieve <100ms latency globally, we utilize a **CDN (Content Delivery Network)** as a cache.
1. User clicks \`sf.io/xyz\`.
2. Request hits the nearest CDN PoP (Point of Presence).
3. If PoP has the mapping, it redirects immediately (\`302 Found\`).
4. If not, it pulls from the Origin Server and caches the result.

---

## 5. Trade-offs: 301 vs 302 Redirection
- **301 (Permanent):** Browser caches the redirect forever. Best for latency but impossible to track analytics on the origin.
- **302 (Temporary):** Browser asks the origin every time. Slightly higher latency but allows the service to capture **Click Analytics** (IP, Browser, Region).
- **Consensus:** Most commercial shorteners use **302**.

---

## 6. Real-World Pitfalls
- **Hotspots:** Specific links (e.g., a viral tweet) can overwhelm a single database shard. Solution: **Replicate hot keys** across multiple nodes.
- **Spam:** Malicious users may use the service for phishing. Integration with **Link Safety APIs** is required during the "Write" phase.
    `
    },
    {
        id: "sd-load-balancer",
        slug: "load-balancing-strategies",
        title: "Load Balancers: Traffic Distribution Strategies",
        description: "Deep dive into Layer 4 vs Layer 7 load balancing, health checks, and global traffic management.",
        category: "System Design",
        difficulty: "Intermediate",
        tags: ["Infrastructure", "Availability", "Networking"],
        viewCount: 18500,
        updatedAt: "2024-04-01",
        author: "SRE Lead",
        content: `
# Load Balancing: The Backbone of High Availability

A Load Balancer (LB) acts as a traffic cop, sitting in front of your servers and routing client requests across all servers capable of fulfilling those requests.

## 1. OSI Model: Layer 4 vs Layer 7
### Layer 4 (Transport Layer)
- **Mechanism:** Acts based on IP and Port.
- **Performance:** High throughput (just packet forwarding).
- **Limit:** Cannot see HTTP headers or cookies.

### Layer 7 (Application Layer)
- **Mechanism:** Can read HTTP headers, paths, and query parameters.
- **Performance:** Slightly slower (requires SSL termination and parsing).
- **Power:** Permits **Path-based routing** (e.g., \`/api/orders\` goes to Order Service).

---

## 2. Common Distribution Algorithms
| Algorithm | Description | Best Use Case |
|-----------|-------------|---------------|
| **Round Robin** | Sequential rotation. | Equal server hardware. |
| **Weighted RR** | Assigns capacity weights. | Heterogeneous server fleet. |
| **Least Conn** | Routes to server with fewest active links. | Long-running queries (DBs). |
| **IP Hash** | Map client IP to specific server. | Stateless session persistence. |

---

## 3. Health Checks & Failovers
A load balancer must never send traffic to a dead server.
- **Passive:** Detects failing requests in real-time.
- **Active:** Periodically sends "heartbeats" (e.g., \`GET /health\`).

---

## 4. Implementation Concept (Nginx Pattern)
\`\`\`nginx
upstream backend_servers {
    least_conn; # Use Least Connections algorithm
    server srv1.example.com weight=3;
    server srv2.example.com;
    server srv3.example.com backup;
}

server {
    location / {
        proxy_pass http://backend_servers;
    }
}
\`\`\`

---

## 5. Trade-offs: Centralized vs Client-Side LB
- **Centralized (External):** Managed services like AWS ELB. High cost, easy to use.
- **Client-Side:** Service discovery tools (Consul/Eureka) allow the client to pick a server. Lower latency, higher client-side complexity.

---

## 6. Interview Insights
Interviewers look for **Global Traffic Management (GSLB)**. Explain how DNS can resolve to different IP addresses based on the user's geographical location using **Anycast IP**.
    `
    },
    {
        id: "sd-consistent-hashing",
        slug: "consistent-hashing-distributed-systems",
        title: "Consistent Hashing: The Backbone of Distributed Load Balancing",
        description: "An in-depth look at how consistent hashing minimizes data movement during cluster scaling.",
        category: "System Design",
        difficulty: "Advanced",
        tags: ["Distributed Systems", "Hashing", "Scalability", "Load Balancing"],
        viewCount: 15400,
        updatedAt: "2024-04-10",
        author: "Staff Engineer",
        content: `
# Consistent Hashing in Distributed Systems

In a large-scale distributed system, data is often partitioned across a cluster of nodes. Standard hashing (\`hash(key) % n\`) works fine until you need to scale. 

## 1. The Problem with Standard Hashing
If you have 3 nodes ($n=3$) and you add a 4th node, nearly all keys will remap because the divisor has changed ($n+1$). In a caching system, this triggers a **Cache Storm** as almost every request suddenly becomes a "miss."

## 2. The Solution: The Hash Ring
Consistent Hashing maps both **objects** and **nodes** onto the same 360-degree logical ring using the same hash function.

### The Mechanism
1. **Node Mapping:** Each server is hashed to a position on the ring.
2. **Key Mapping:** A key (e.g., \`user_123\`) is hashed to a position on the ring.
3. **Assignment:** To find which server holds the key, you travel **clockwise** from the key's position until you hit the first server.

## 3. Handling Node Changes
- **Add Node:** Only the keys that were previously mapped to the "next" node but now fall after the "new" node need to move. On average, only $k/n$ keys move.
- **Remove Node:** Only the keys on the failed node move to the next clockwise neighbor.

---

## 4. Virtual Nodes (The Pro Move)
A raw ring can be **unbalanced**—one server might end up with 70% of the traffic because of hash distribution gaps.
- **Virtual Nodes:** We map each physical server to 100-200 different spots on the ring (e.g., \`ServerA_1\`, \`ServerA_2\`, etc.).
- **Benefit:** If a node fails, its load is distributed evenly across **all** other nodes, rather than overwhelming just one neighbor.

---

## 5. Real-World Applications
- **Amazon DynamoDB:** Uses consistent hashing for data partitioning.
- **Apache Cassandra:** Uses it to decide which nodes in the cluster store which rows.
- **Akamai CDN:** Uses it to balance traffic across global edge servers.

## 6. Mathematical Efficiency
Consistent Hashing ensures that when a node is added/removed, only **$1/n$** of the keys need to be rehashed. This is the definition of stable scaling.
        `
    },
    {
        id: "sd-monolith-vs-microservices",
        slug: "monolith-vs-microservices-architectural-guide",
        title: "Monolith vs. Microservices: The Ultimate Trade-off",
        description: "An unbiased engineering look at when to decouple your services and when to keep things simple.",
        category: "System Design",
        difficulty: "Intermediate",
        tags: ["Architecture", "Microservices", "Design Patterns"],
        viewCount: 22500,
        updatedAt: "2024-04-13",
        author: "Engineering Manager",
        content: `
# Decoupling the Truth: Monolith vs. Microservices

There is a common industry myth that "Microservices = Good, Monolith = Bad." In reality, many of the world's most successful companies (like early Instagram or Basecamp) thrived on monoliths.

## 1. The Monolith (The Starting Point)
A single codebase and a single database for the entire application.
- **Pros:** Fast development, easy debugging, unified deployment.
- **Cons:** Becomes a "Big Ball of Mud" as teams grow; scaling parts independently is impossible.

## 2. Microservices (The Scale Solution)
Decoupling features into independent services that communicate over a network (usually via HTTP or Message Queues).
- **Pros:** Scalability, team independence, technology flexibility.
- **Cons:** **Extreme Complexity**. Network latency, distributed logging, and difficult transactions.

---

## 3. When to Switch?
Don't move to microservices until your **Team Size** or **Deployment Frequency** requires it.
- **Rule of Thumb:** If 50+ developers are tripping over each other's code in one repo, it's time to decouple.

## 4. The Hybrid Approach: Modular Monolith
Organize your single codebase into strict modules. It gives you the clean boundaries of microservices without the network and deployment overhead.
        `
    }
];
