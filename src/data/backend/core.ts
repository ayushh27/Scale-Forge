import { Article } from "@/hooks/useArticles";

export const BACKEND_CORE_ARTICLES: Article[] = [
    {
        id: "be-rest-versioning-exhaustive",
        slug: "restful-api-design-and-versioning-strategies",
        title: "RESTful APIs: Design, Versioning & Scalability",
        description: "Exhaustive guide to building production-grade APIs. From idempotent methods to versioning at scale.",
        category: "Backend",
        difficulty: "Intermediate",
        tags: ["API Design", "REST", "Versioning", "Scalability"],
        viewCount: 32000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Backend Team",
        version: "1.0.0",
        prerequisites: ["be-foundational-overview"],
        relatedTopics: ["sd-url-shortener", "db-relational-exhaustive"],
        content: `
# RESTful API Design: The Contract of the Web

A REST API is more than just JSON over HTTP; it is a long-term contract between you and your consumers.

## 1. The Power of Idempotency
An idempotent operation is one where the side-effects of $N > 0$ identical requests is the same as for a single request.
- **GET, PUT, DELETE:** Historically idempotent.
- **POST:** Not idempotent.
- **Production Pattern:** Use **Idempotency Keys** (e.g., \`X-Idempotency-Key\`) in headers for POST requests (like payments) to prevent double-billing on network retries.

---

## 2. API Versioning: The Evolution Problem
Never release an API without a versioning strategy.
- **URI Versioning:** \`/v1/users\` (Most popular, easiest to cache).
- **Header Versioning:** \`Accept: application/vnd.myapi.v1+json\` (Cleaner URIs, harder for browser testing).
- **Parameter Versioning:** \`/users?version=1\`.

**Rule of Thumb:** Support at least $N-1$ versions to give clients time to migrate.

---

## 3. Pagination: Handling Large Datasets
Never return \`SELECT * FROM users\`.
- **Offset Pagination:** \`LIMIT 20 OFFSET 100\`. Easy but slow for deep pages ($O(N)$).
- **Cursor Pagination:** \`WHERE id > last_seen_id\`. Superior for high-scale feeds ($O(1)$ lookup).

---

## 4. Concurrency Control
When two users edit the same resource:
- **Pessimistic Locking:** Lock the row. (Kills throughput).
- **Optimistic Locking:** Use a \`version\` or \`updated_at\` column. If the version changed during the edit, reject the update.
        `
    },
    {
        id: "be-auth-exhaustive",
        slug: "authentication-and-authorization-jwt-oauth2-deep-dive",
        title: "Auth & Auth: JWT, OAuth2 & Distributed Identity",
        description: "Exhaustive guide to security in distributed systems. From JWT rotation to OAuth2 grant flows.",
        category: "Backend",
        difficulty: "Advanced",
        tags: ["Security", "JWT", "OAuth2", "Identity"],
        viewCount: 28500,
        updatedAt: "2024-04-14",
        author: "Scaleforge Security",
        version: "1.0.0",
        prerequisites: ["be-rest-versioning-exhaustive"],
        relatedTopics: ["sd-auth-system", "ds-communication-exhaustive"],
        content: `
# Distributed Identity: Security at Scale

Authentication (Who are you?) and Authorization (What can you do?) are the pillars of backend security.

## 1. The Token Pattern: JWT
JWTs allow for **Stateless Auth**. The server doesn't need to look up a session in the DB.
- **Security Check:** Always use **Asymmetric Signing (RS256)**. This allows microservices to verify the token with a public key without knowing the private key used by the Auth server.

---

## 2. OAuth2 & OpenID Connect (OIDC)
OAuth2 is an **Authorization** framework. OIDC adds an **Identity** layer on top.
- **The Flow:** Client $\to$ Auth Server $\to$ Scopes $\to$ Token.
- **Best Practice:** Use the **PKCE (Proof Key for Code Exchange)** flow even for mobile apps to prevent code injection attacks.

---

## 3. Role-Based Access Control (RBAC) vs ABAC
- **RBAC:** "Admins can delete users." Simple to manage.
- **ABAC (Attribute-Based):** "Users can edit files if it's Tuesday and they are in the 'Sales' department." More flexible but complex.

---

## 4. Token Revocation
How to "log out" a JWT?
- **Pattern:** Short-lived Access Tokens (5m) + Long-lived Refresh Tokens (7d).
- **Revocation:** Only the Refresh Token needs to be blacklisted in Redis.
        `
    },
    {
        id: "be-queues-jobs-exhaustive",
        slug: "background-jobs-and-message-queues-patterns",
        title: "Background Jobs & MQ: Scaling Async Logic",
        description: "Exhaustive guide to Kafka, RabbitMQ, and Redis-based job processing.",
        category: "Backend",
        difficulty: "Advanced",
        tags: ["MQ", "Kafka", "RabbitMQ", "Async"],
        viewCount: 24000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Infra",
        version: "1.0.0",
        prerequisites: ["be-rest-versioning-exhaustive"],
        relatedTopics: ["sd-notification-service", "ds-fault-tolerance-exhaustive"],
        content: `
# Background Processing: The Async Core

Real-time response requirements mean you cannot wait for slow tasks (Send Email, Process Image) during an HTTP request.

## 1. Message Brokers: RabbitMQ vs Kafka
- **RabbitMQ (Smart Broker, Dumb Consumer):** Complex routing (Exchange patterns). Great for task distribution.
- **Kafka (Dumb Broker, Smart Consumer):** Distributed Log. Great for high-throughput event streaming and replaying data.

---

## 2. Ensuring Reliability: The DLQ
A **Dead Letter Queue (DLQ)** is where failed messages go. 
- **Rule:** Never auto-delete a failed message. Move it to DLQ and alert the engineering team.

---

## 3. Idempotency in Workers
Network issues mean messages can be delivered twice.
- **Solution:** Every job must have a unique ID. Check your DB if \`job_id\` was already processed before doing the work.

---

## 4. Backpressure Management
If your workers are too slow, the queue grows infinitely.
- **Fix:** Implement **Rate Limiting** on the producer or **Auto-scaling** on the consumers based on queue depth.
        `
    }
];
