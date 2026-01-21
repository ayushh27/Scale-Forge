import { Article } from "@/hooks/useArticles";

export const SD_COMPONENT_ARTICLES: Article[] = [
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

## 1. Layer 4 (TCP) vs Layer 7 (HTTP)
### Layer 4 (Transport Layer)
- **Acts on:** IP address and Port.
- **Speed:** Faster (doesn't look at data).
- **Pros:** High throughput, consumes less CPU.
- **Cons:** No smart routing (cannot route based on URL path).

### Layer 7 (Application Layer)
- **Acts on:** HTTP headers, cookies, URL paths.
- **Speed:** Slower (needs to parse the packet).
- **Pros:** Smart routing (e.g., \`/images\` to Image Server), SSL termination.
- **Cons:** Resource intensive.

---

## 2. Dynamic vs Static Algorithms
- **Round Robin:** Simple rotation. Fails if servers have different power.
- **Least Connections:** Routes to the least busy server. Best for long-lived sessions.
- **IP Hash:** Deterministic. User X always hits Server Y. Good for session affinity.

## 3. Global Server Load Balancing (GSLB)
How does Netflix work globally?
- **Anycast DNS:** Your computer asks for the IP, and DNS gives the IP of the **closest** data center.
- **Geo-location based routing:** Logic inside the LB redirects you based on your country.

---

## 4. Disaster Recovery
LBs perform "Health Checks". If a server doesn't respond to \`GET /health\` for 3 attempts, it is removed from the rotation automatically.
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
# Consistent Hashing: Scaling without Chaos

In a traditional hash table (\`hash(key) % n\`), adding a single node ($n+1$) causes nearly 100% of keys to remap. In a cache, this is a disaster (Cache Stampede).

## 1. The Strategy: The Ring
Consistent Hashing places both **Nodes** and **Keys** on a logical circle (0 to $2^{32}-1$).
1. Hash the server IP to a spot on the ring.
2. Hash the key (e.g., \`user_id\`) to a spot on the ring.
3. The server responsible for the key is the first node encountered moving **clockwise**.

## 2. Why it works
- **Add Node:** Only the keys previously belonging to the "next" node move to the "new" node. Average movement: $1/n$ of keys.
- **Remove Node:** Only the keys on the dead node move to the next clockwise neighbor.

## 3. The "Virtual Nodes" Solution
Raw hashing can be uneven (one server gets 80% traffic).
- **Virtual Nodes:** Each physical server is hashed 100+ times to random spots on the ring.
- **Benefit:** If Node A dies, its load is split evenly among B, C, and D, rather than crashing its direct neighbor.
        `
    },
    {
        id: "sd-rate-limiter",
        slug: "designing-a-distributed-rate-limiter",
        title: "Rate Limiting: Protecting your Systems from Overload",
        description: "Exhaustive guide to Token Bucket, Leaky Bucket, and Fixed Window algorithms for API security.",
        category: "System Design",
        difficulty: "Intermediate",
        tags: ["Security", "API Design", "Scalability"],
        viewCount: 21000,
        updatedAt: "2024-04-14",
        author: "Infrastructure Specialist",
        content: `
# Rate Limiting: The First Line of Defense

A rate limiter restricts the number of requests a user (or IP) can make to your API. It prevents Dos attacks, billing spikes, and resource starvation.

## 1. Key Algorithms
### Token Bucket (Amazon/Stripe)
- **Logic:** A bucket has $N$ tokens. Each request takes one. New tokens added at rate $R$.
- **Pros:** Allows "bursty" traffic (user can use all $N$ tokens at once).
### Leaky Bucket (Shopify)
- **Logic:** Request enters a bucket; bucket "leaks" at a constant rate.
- **Pros:** Guarantees a stable flow to the backend.
### Fixed Window Counter
- **Logic:** "Max 5 requests per minute".
- **Cons:** Users can "cheat" by sending 5 requests at 00:59 and 5 at 01:01.

---

## 2. Distributed Challenge: The "Race Condition"
In a cluster of 50 servers, how do they agree on a user's count?
- **Bad:** Each server keeps its own count (Inaccurate).
- **Good:** Centralized **Redis** store.
- **Problem:** Two servers read "count=4", both increment, both write "count=5". The user got a free request.
- **Solution:** Use **Lua Scripts** in Redis or **Sorted Sets** to ensure atomic increments.

---

## 3. Where to put the Rate Limiter?
- **Client Side:** Unreliable (users can bypass).
- **Middleware/API Gateway:** Best. Handles the check before your expensive business logic runs.
- **Database:** Too late. The server has already processed the request.

---

## 4. Response Codes
When limited, always return **HTTP 429 Too Many Requests**. 
**Pro-tip:** Include a \`Retry-After\` header to tell the client exactly when they can try again.
        `
    }
];
