import { Article } from "@/hooks/useArticles";

export const CASE_STUDY_ARTICLES: Article[] = [
    {
        id: "cs-1",
        slug: "case-study-uber-schemaless",
        title: "Uber's Architectural Shift: From MySQL to Schemaless",
        description: "How Uber built a custom distributed database on top of MySQL nodes to handle their massive scale.",
        category: "Case Study",
        difficulty: "Advanced",
        tags: ["Databases", "Distributed Systems", "Scaling"],
        viewCount: 22100,
        updatedAt: "2024-01-18",
        author: "SRE Lead",
        estimatedReadingTime: 25,
        content: `
# Uber's Schemaless Migration

In 2014, Uber hit a ceiling with traditional relational databases. This is the story of how they engineered "Schemaless."

## The Problem: The Riak Experience
Uber initially moved from Postgres to Riak, but encountered issues with secondary indexes and memory overhead. They needed a system that offered:
1. **High Availability**: Surviving data center outages.
2. **Horizontal Scalability**: Adding nodes without downtime.
3. **Query Flexibility**: But without the cost of complex joins.

## The Solution: MySQL as a Storage Engine
Instead of building a database from scratch, Uber built a layer on top of MySQL. 
- **The Cell Architecture**: Data is partitioned into "cells."
- **Immutable Shards**: Once a shard is written, it's rarely updated, reducing lock contention.

## Key Senior Engineering Decisions
- **Async Indexing**: Indexes are updated asynchronously to prevent write-latency spikes.
- **Buffer-only Reads**: Heavily utilizing RAM before hitting the disk.

## Conclusion
Uber's move proves that sometimes the best technology isn't a new one, but a battle-tested one (MySQL) used in a non-traditional way.
        `
    }
];
