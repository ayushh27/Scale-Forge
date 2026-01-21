import { Article } from "@/hooks/useArticles";

export const SD_FOUNDATION_ARTICLES: Article[] = [
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

## 2. Core Pillars (The CAP Theorem)
The CAP theorem states that in a distributed system, you can only provide two of the following three guarantees:
1. **Consistency (C):** Every read receives the most recent write or an error.
2. **Availability (A):** Every request receives a (non-error) response, without the guarantee that it contains the most recent write.
3. **Partition Tolerance (P):** The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network between nodes.

**In the real world, you MUST choose P.** Networks fail. So the choice is between **CP** and **AP**.

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

There is a common industry myth that "Microservices = Good, Monolith = Bad." In reality, many of the world's most successful companies thrive on monoliths.

## 1. The Monolith (The Starting Point)
A single codebase and a single database for the entire application.
- **Pros:** Fast development (no network overhead), easy debugging, unified deployment, atomic transactions are simple.
- **Cons:** Long build times, hard to scale specific components, "dependency hell" as teams grow.

## 2. Microservices (The Scale Solution)
Decoupling features into independent services that communicate over a network (usually via HTTP, gRPC, or Message Queues).
- **Pros:** Independent scaling (scale only the "Auth" service), independent deployments, fault isolation (one service crashing doesn't kill the app).
- **Cons:** **Extreme Complexity**. Distributed transactions (Sagas), eventual consistency, "spaghetti" dependencies, and hard-to-trace bugs.

---

## 3. The 2-Pizza Rule
Amazon famously popularized the "Two-Pizza Team" (no team should be larger than what two pizzas can feed). Microservices align perfectly with this. Each team owns a service end-to-end.

## 4. The Hybrid Approach: Modular Monolith
Organize your single codebase into strict modules with defined interfaces. It gives you the clean boundaries of microservices without the network and deployment overhead. This is the **recommended path** for most startups until they reach massive scale.
        `
    }
];
