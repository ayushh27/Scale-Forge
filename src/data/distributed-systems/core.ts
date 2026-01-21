import { Article } from "@/hooks/useArticles";

export const DISTRIBUTED_SYSTEMS_ARTICLES: Article[] = [
    {
        id: "ds-fault-tolerance-exhaustive",
        slug: "fault-tolerance-retries-and-circuit-breakers",
        title: "Fault Tolerance: Retries & Circuit Breakers",
        description: "Exhaustive depth on building resilient systems. Preventing cascading failures in microservices.",
        category: "Distributed Systems",
        difficulty: "Advanced",
        tags: ["Resilience", "Distributed", "SRE"],
        viewCount: 27000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Core",
        content: `
# Resilient Systems: Embracing Failure

In a distributed network, failure is the default state. A server will crash, a switch will die, or a provider will be slow.

## 1. Retry Strategies
- **Immediate Retry:** High risk of "Retry Storm" crashing the server further.
- **Exponential Backoff:** Wait 1s, then 2s, then 4s, etc.
- **Jitter:** Add random noise to the wait time so 1,000 clients don't all retry at exactly the same microsecond.

---

## 2. The Circuit Breaker (Netflix Hystrix)
Prevent "Cascading Failures". If Service B is slow, Service A's threads will fill up waiting for B, and A will crash too.
- **Open State:** Stop sending requests to B for $T$ seconds.
- **Half-Open:** Send 1 request to B. If it works, close the circuit.

---

## 3. Quorum & Consensus (Raft/Paxos)
In a cluster, how do we agree on who is the leader?
- **Quorum:** $N/2 + 1$ nodes must agree.
- **Raft Algorithm:** Used by ETCD and Consul to maintain a consistent state across a cluster.

---

## 4. Eventual Consistency vs Strong Consistency
- **Strong (SQL):** All readers see the same data instantly. High latency.
- **Eventual (NoSQL):** Data will eventually sync. Low latency, high throughput.
- **Linearizability:** The "Gold Standard" where operations appear to happen instantaneously at a single point in time.
        `
    },
    {
        id: "ds-communication-exhaustive",
        slug: "service-communication-patterns-sync-vs-async",
        title: "Microservice Communication: Sync vs Async",
        description: "Exhaustive guide to gRPC, REST, and Event-Driven architecture trade-offs.",
        category: "Distributed Systems",
        difficulty: "Intermediate",
        tags: ["Communication", "gRPC", "Kafka", "Protocols"],
        viewCount: 22500,
        updatedAt: "2024-04-14",
        author: "Scaleforge Architect",
        content: `
# Communication Architects: Connecting Services

How services talk determines the scalability of your entire platform.

## 1. Synchronous (gRPC/REST)
- **Pattern:** Request $\to$ Response.
- **Trade-off:** Fast, easy to understand. But creates tight temporal coupling.

---

## 2. Asynchronous (Event Sourcing / Pub-Sub)
- **Pattern:** Action $\to$ Event published to Kafka $\to$ Consumers react.
- **Benefit:** Decoupling. The "Order" service doesn't need to know that the "Inventory" service exists. It just fires an \`OrderCreated\` event.

---

## 3. API Gateway vs Service Mesh
- **API Gateway (North-South):** Handles external traffic, SSL, Auth, and Rate Limiting.
- **Service Mesh (East-West):** Sidecar proxies (Istio/Linkerd) that handle retries and mTLS (Encryption) between internal services.

---

## 4. Saga Pattern: Distributed Transactions
You can't do one SQL transaction across 3 microservices.
- **Choreography:** Each service emits an event that triggers the next.
- **Orchestration:** A central manager tells each service what to do and handles the **Rollback (Compensating Transaction)** if something fails mid-way.
        `
    }
];
