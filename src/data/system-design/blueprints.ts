import { Article } from "@/hooks/useArticles";

export const SD_BLUEPRINT_ARTICLES: Article[] = [
    {
        id: "sd-url-shortener",
        slug: "designing-a-scalable-url-shortener",
        title: "URL Shortener: Architectural Blueprint",
        description: "Designing a Bitly-scale service handling 500M writes/month with global performance.",
        category: "System Design",
        difficulty: "Intermediate",
        tags: ["Blueprints", "NoSQL", "High Availability"],
        viewCount: 22000,
        updatedAt: "2024-03-26",
        author: "System Architect",
        version: "1.0.0",
        prerequisites: ["sd-foundations-overview", "dsa-hashing-exhaustive"],
        relatedTopics: ["be-rest-versioning-exhaustive", "sd-consistent-hashing"],
        content: `
# URL Shortener: Designing for 50 Billion Reads

A URL shortener like Bitly requires massive read scale, global availability, and a collision-free ID generation strategy.

## 1. Requirement Clarification
- **Functional:** Long URL in $\to$ Short URL out. Redirection in <100ms.
- **Non-Functional:** 100:1 Read/Write ratio. 500M URLs/month. 10-year persistence.
- **Scale:** ~6 Billion URLs total.

## 2. Capacity Estimation
- **Storage:** Average URL (100 bytes) + Short ID (10 bytes). 6B * 110 bytes $\approx$ 660 GB. (Manageable for 1 database).
- **Read Throughput:** 50 Billion / 30 days $\approx$ 20,000 requests per second (RPS).

---

## 3. High-Level Architecture
1. **Application Servers:** Hanlde read/write.
2. **ID Generator (Key Generation Service):** Pre-generates short strings.
3. **Database:** NoSQL (Cassandra/DynamoDB) for schema-less speed.
4. **Cache:** Redis for "Hot" URLs.

## 4. ID Generation Strategy: Base62
Using [a-zA-Z0-9]. 6 characters $\approx$ 56 Billion combinations.
**How to avoid collisions?**
- **Approach:** Use a centralized counter (Zookeeper). Application servers lease ranges (e.g., 1-10k). This ensures no two servers ever issue the same ID.

---

## 5. Caching & Data Sharding
- **Caching:** 80/20 Rule: 20% of URLs get 80% of traffic. Cache the top 20% in Redis.
- **Sharding:** If we grow to Petabytes, shard by \`Short_ID\`. Using Consistent Hashing ensures even distribution.

## 6. Failure Scenarios
- **DB Crash:** Multi-region replication in DynamoDB ensures 99.999% availability.
- **Cache Miss Storm:** If Redis dies, the DB might crash. Implement a **read-through** cache and rate limiting.
        `
    },
    {
        id: "sd-chat-system",
        slug: "designing-a-real-time-chat-application",
        title: "Chat System: Scaling WhatsApp-level Messaging",
        description: "Architecting for 1 billion users with WebSockets, Message Queues, and Distributed Persistence.",
        category: "System Design",
        difficulty: "Advanced",
        tags: ["WebSockets", "Real-time", "Scalability", "NoSQL"],
        viewCount: 28000,
        updatedAt: "2024-04-14",
        author: "Senior Staff Engineer",
        version: "1.0.0",
        prerequisites: ["sd-foundations-overview", "be-auth-exhaustive"],
        relatedTopics: ["sd-notification-service", "ds-communication-exhaustive"],
        content: `
# Chat System: Architecting Real-time Connectivity

Designing WhatsApp or Slack requires solving for **low latency**, **message ordering**, and **connectivity management**.

## 1. Requirements
- **Functional:** 1-to-1 chat, Group chat, Message "Seen" status.
- **Non-Functional:** Reliability (0% message loss), High availability.

---

## 2. High-Level Architecture
### Problem: HTTP is request-response. Chat needs Push.
**Solution:** **WebSockets**. After a login over HTTP, the client upgrades the connection to a persistent WebSocket. 

### Component Breakdown
1. **WebSocket Servers:** Manages 100k+ open connections per machine.
2. **Presence Service:** Maintains a mapping of \`User_ID \to Server_ID\` in Redis.
3. **Message Service:** Handles persistence and routing.
4. **Push Notification Service:** For users who are offline.

---

## 3. Data Flow (User A -> User B)
1. User A sends message to WebSocket Server 1.
2. Server 1 persists message in Database (Cassandra).
3. Server 1 looks up User B's location in Redis.
4. If User B is on WebSocket Server 2, Server 1 publishes to a **Message Queue** (Kafka).
5. Server 2 consumes the message and pushes to User B's open socket.

---

## 4. Storage Choice: Why Cassandra?
Chat messages are write-heavy and have a linear time-based access pattern.
- Cassandra allows for high write throughput.
- Sharding by \`Chat_ID\` ensures all messages for one conversation are stored together for fast retrieval.

## 5. Handling Group Chats
For small groups, loop through members. For large groups (1k+), don't send individual pushes. Instead, use a **Fan-out on Read** pattern or a heavy message broker aggregation.

## 6. Trade-off: Consistency vs Availability
Users hate missing messages. We prioritize **Consistency** (messages must appear in order) and use sequence numbers/timestamps for client-side sorting.
        `
    },
    {
        id: "sd-notification-service",
        slug: "designing-a-distributed-notification-service",
        title: "Notification System: Scaling Alerts Globally",
        description: "Building a resilient system for push, email, and SMS using massive task queues.",
        category: "System Design",
        difficulty: "Intermediate",
        tags: ["AWS", "Queues", "Architecture"],
        viewCount: 19500,
        updatedAt: "2024-04-14",
        author: "Cloud Architect",
        version: "1.0.0",
        prerequisites: ["sd-foundations-overview", "be-queues-jobs-exhaustive"],
        relatedTopics: ["sd-chat-system", "be-auth-exhaustive"],
        content: `
# Notification System: Scaling 1 Billion Alerts/Day

Whether it's a "Like" on Instagram or a "Security Alert" from your bank, notifications must be reliable and timely.

## 1. Requirements
- **Providers:** APNS (Apple), FCM (Google), SendGrid (Email), Twilio (SMS).
- **Scale:** 10M active users. Peak traffic of 10k/sec.

---

## 2. The Core Pattern: Producer-Consumer
Notifications are inherently asynchronous. 
1. **API:** Receives the request (e.g., \`user_id, content\`). Validates & rate limits.
2. **Message Queue (Kafka/RabbitMQ):** Decouples the request from the delivery logic.
3. **Workers:** Pull from the queue, determine the provider, and fire the request.

---

## 3. Advanced Features
- **Templating:** Storing HTML/JSON templates centrally.
- **Priority Queues:** Critical alerts (2FA) bypass low-priority ones (Marketing).
- **De-duplication:** Ensuring a user doesn't get 5 identical emails due to a retry loop. Use an **Idempotency Key**.

## 4. Failure Scenarios
Providers (Apple/Google) go down frequently. 
- **Solution:** Worker catches the error, puts the message into a **Retry Queue** with **Exponential Backoff**.

---

## 5. Trade-off: Latency vs Delivery Guarantees
- **At-least-once (Preferred):** Every notification is sent. Some might be duplicates (handled by client).
- **Exactly-once:** Impossible in a distributed system with external providers.
        `
    },
    {
        id: "sd-job-queue",
        slug: "designing-a-distributed-job-queue",
        title: "Distributed Job Queues: Architecture of Background Tasks",
        description: "How to build a system like Sidekiq or Celery that handles Millions of background jobs with retry logic.",
        category: "System Design",
        difficulty: "Advanced",
        tags: ["Redis", "Distributed Systems", "Worker Patterns"],
        viewCount: 23000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Infra",
        version: "1.0.0",
        prerequisites: ["be-queues-jobs-exhaustive"],
        relatedTopics: ["sd-notification-service", "ds-fault-tolerance-exhaustive"],
        content: `
# Distributed Job Queues: Engineering Background Scale

A job queue allows a web server to offload time-consuming work (e.g., image processing, generating reports) to background workers.

## 1. Core Architecture
- **Producer:** Web server creates a job payload.
- **Broker (Storage):** Redis or Postgres stores the job.
- **Consumer (Worker):** Parallel processes that pull jobs and execute them.

---

## 2. Distributed Locking & Visibility
**The Problem:** Two workers pull the same job.
**The Solution:** 
1. Worker 1 pulls job and sets it to **"In-Progress"**.
2. **Visibility Timeout:** If the worker doesn't report "Success" in 30 seconds, the job becomes visible again for another worker.

---

## 3. Reliability: The Dead Letter Queue (DLQ)
If a job fails 5 times (e.g., due to a bug), it shouldn't clog the main queue.
- **Process:** Move it to a **DLQ** for manual inspection by an engineer.

## 4. Scaling the Workers
Use **Horizontal Pod Autoscaling (HPA)**. Scale workers up based on **Queue Depth** (e.g., if >10k jobs, add 5 more workers).

---

## 5. Monitoring
- **Lag:** Time between "Job Created" and "Job Started".
- **Throughput:** Jobs processed per minute.
- **Error Rate:** Percentage of jobs hitting the DLQ.
        `
    }
];
