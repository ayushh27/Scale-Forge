import { Article } from "@/hooks/useArticles";

export const DATABASE_CORE_ARTICLES: Article[] = [
    {
        id: "db-relational-exhaustive",
        slug: "postgresql-and-mysql-internals-and-optimization",
        title: "Relational Mastery: PostgreSQL & MySQL Internals",
        description: "Exhaustive depth on B-Trees, WAL, MVCC, and query optimization for high-performance SQL.",
        category: "Databases",
        difficulty: "Advanced",
        tags: ["PostgreSQL", "MySQL", "SQL", "Optimization"],
        viewCount: 35000,
        updatedAt: "2024-04-14",
        author: "Scaleforge DB Team",
        version: "1.0.0",
        prerequisites: ["sql-basics-exhaustive"],
        relatedTopics: ["db-scaling-exhaustive", "be-rest-versioning-exhaustive"],
        content: `
# Relational Power: Beyond the Query

PostgreSQL and MySQL power 90% of the web. Understanding their internals is the key to sub-10ms performance.

## 1. MVCC (Multi-Version Concurrency Control)
How do two users read and write at the same time without locking?
- **Logic:** Instead of locking, the DB keeps multiple versions of a row. Readers see the version "as of the start of the transaction."
- **Side Effect:** This creates "Bloat." PostgreSQL requires **VACUUM** to clean up old row versions.

---

## 2. The Write-Ahead Log (WAL)
Every change is written to the WAL *before* being written to the actual data files. 
- **Why?** Writing to a sequential log is $O(1)$ fast. In case of a crash, the DB replays the WAL to recover state.

---

## 3. Indexing Strategies
- **B-Tree (Default):** Balanced search tree. Ideal for range queries (\`<, >\`) and exact matches.
- **GIN/GiST:** Used for JSONB and Full-Text Search in Postgres.
- **Partial Indexes:** \`CREATE INDEX ... WHERE active = true\`. Reduces index size significantly.

---

## 4. Query Optimization
- **SARGability:** Avoid functions on indexed columns (e.g., \`WHERE YEAR(date) = 2024\`). This prevents index usage.
- **JOIN Algorithms:** Nested Loop vs Hash Join vs Merge Join. The Query Assistant chooses based on table size.
        `
    },
    {
        id: "db-nosql-exhaustive",
        slug: "mongodb-and-redis-nosql-architecture-patterns",
        title: "NoSQL Architectures: MongoDB & Redis",
        description: "Exhaustive guide to Document Stores and In-memory caches. When to go schemaless.",
        category: "Databases",
        difficulty: "Intermediate",
        tags: ["NoSQL", "MongoDB", "Redis", "Distributed"],
        viewCount: 29000,
        updatedAt: "2024-04-14",
        author: "Scaleforge NoSQL Lead",
        version: "1.0.0",
        prerequisites: ["db-relational-exhaustive"],
        relatedTopics: ["be-caching-patterns", "sd-url-shortener"],
        content: `
# NoSQL: Architecture of Flexibility

NoSQL isn't just "No SQL"; it's **Not Only SQL**. It excels where horizontal scaling and schema flexibility are requirements.

## 1. Document Stores (MongoDB)
- **Concept:** Data is stored as BSON (Binary JSON).
- **Partitioning:** Sharding by \`shard_key\`.
- **Use Case:** Catalogs, User Profiles, Content Management where schema changes weekly.

---

## 2. In-Memory Power (Redis)
- **Concept:** Every key-value pair lives in RAM. 
- **Durability:** RDB (Point-in-time snapshots) vs AOF (Append-only log).
- **Real-World Pattern:** Use Redis as a **Read Cache** for your Postgres DB to handle 100x more traffic.

---

## 3. Scaling: The PACELC Theorem
An extension of CAP:
- If there is a Partition (P), choose between Availability (A) and Consistency (C).
- Else (E) no partition, choose between Latency (L) and Consistency (C).
**Fact:** MongoDB is typically CP; Redis is usually AP.

---

## 4. Modeling Trade-offs
In NoSQL, we **Denormalize**. We embed the "Address" inside the "User" document instead of a separate table to save a JOIN. This makes reads fast but updates slow.
        `
    },
    {
        id: "db-scaling-exhaustive",
        slug: "database-replication-sharding-and-consistency",
        title: "Scaling Databases: Replication & Sharding",
        description: "Exhaustive guide to Master-Slave, Multi-Master, and Horizontal Sharding patterns.",
        category: "Databases",
        difficulty: "Advanced",
        tags: ["Scaling", "Replication", "Sharding", "Distributed"],
        viewCount: 26000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Infra",
        version: "1.0.0",
        prerequisites: ["db-relational-exhaustive"],
        relatedTopics: ["be-db-sharding", "ds-fault-tolerance-exhaustive"],
        content: `
# Scaling the Data Layer

When your DB becomes the bottleneck, you have two options: Buy a bigger server (Vertical) or use multiple servers (Horizontal).

## 1. Read Replicas (The First Step)
- **Master-Slave:** All Writes go to the Master. Master streams changes to Slaves.
- **Consistency Problem:** **Replication Lag**. A user writes a post, refreshes, and doesn't see it (because they hit a Slave that hasn't caught up yet).
- **Solution:** Force "Self-reads" to the Master for 5 seconds after a write.

---

## 2. Sharding (The Final Boss)
Splitting a table horizontally into pieces.
- **Strategy:** Shard by \`tenant_id\` in B2B apps.
- **Challenge:** You can't JOIN across shards. Your application must aggregate results.

---

## 3. Transaction Isolation Levels
1. **Read Uncommitted:** (Dangerous) Can read data from a failed transaction.
2. **Read Committed:** (DB Default) Only reads finished data.
3. **Repeatable Read:** Ensures if you read a row twice, it doesn't change.
4. **Serializable:** (Slowest) Transactions act as if they ran one after another. Prevents "Phantom Reads."

---

## 4. Production Choice: Amazon Aurora/Spanner
Modern cloud DBs use a **Shared Storage** architecture where the storage layer handles replication, allowing for faster failover and nearly infinite read scaling.
        `
    }
];
