import { Article } from "@/hooks/useArticles";

export const SD_ADVANCED_ARTICLES: Article[] = [
    {
        id: "sd-search-engine",
        slug: "designing-a-scalable-search-engine-logic",
        title: "Search Engine: Indexing & Retrieval Architecture",
        description: "How to build a system like Elasticsearch. Crawling, Inverted Indexing, and PageRank fundamentals.",
        category: "System Design",
        difficulty: "Advanced",
        tags: ["Search", "Elasticsearch", "Distributed Systems", "Data Structures"],
        viewCount: 26500,
        updatedAt: "2024-04-14",
        author: "Search Specialist",
        content: `
# Search Engine: Architecture of Information Retrieval

Designing a search engine (like Google) or an internal search system (like Elasticsearch) involves scaling for trillions of documents and millisecond response times.

## 1. Components of a Search Engine
1. **Crawler:** Discovers documents (URLs, PDF, JSON).
2. **Parser:** Extracts text and metadata.
3. **Indexer:** Builds an **Inverted Index**.
4. **Ranker:** Scores documents based on relevance (TF-IDF, BM25, PageRank).

---

## 2. Core Data Structure: The Inverted Index
Instead of \`DocID \to Text\`, we store \`Word \to [List of DocIDs]\`.
- **Word:** "Apple"
- **Docs:** [1, 5, 22, 104]
This allows $O(1)$ lookup for all documents containing a specific term.

---

## 3. Distributed Sharding
You can't fit a web-scale index on one disk.
- **Document-based Sharding:** Each shard owns a subset of documents. Queries must hit **every shard**. (Elasticsearch default).
- **Term-based Sharding:** Each shard owns a subset of the dictionary (e.g., A-M). Scale better for queries but inserts are complex.

---

## 4. Relevance & Ranking (BM25)
Ranking is about more than just finding the word.
- **TF (Term Frequency):** Is the word repeated many times?
- **IDF (Inverse Document Frequency):** Rare words (e.g., "Svelte") are more important than common ones (e.g., "the").

---

## 5. Failure Scenarios
- **Index Corruption:** Use **distributed replicas** and write-ahead logs (WAL).
- **Hot Tailing:** Popular queries should be cached at the **Edge** to save core compute.
        `
    },
    {
        id: "sd-recommendation-system",
        slug: "architecting-large-scale-recommendation-engines",
        title: "Recommendation Engine: Collaborative Filtering & Scale",
        description: "How Netflix and Amazon suggest products using embeddings, vector databases, and real-time inference.",
        category: "System Design",
        difficulty: "Advanced",
        tags: ["Machine Learning", "Embeddings", "Scale", "Real-time"],
        viewCount: 24200,
        updatedAt: "2024-04-14",
        author: "ML Architect",
        content: `
# Recommendation Systems: The Architecture of Personalization

A recommendation engine suggests items to users. Scale problems arise because the matrix of \`Users \times Items\` is too large for memory.

## 1. Key Strategies
### Collaborative Filtering (CF)
- "Users who liked X also liked Y."
- **Challenge:** Sparse data. Most users haven't rated most items.
### Content-Based Filtering
- "You liked Action movies, here is another Action movie."

---

## 2. Modern Stack: Vector Databases
Instead of comparing raw IDs, we turn users and items into **Embeddings** (arrays of numbers representing features).
- Use a **Vector Database** (Pinecone, Milvus) for **Approximate Nearest Neighbor (ANN)** search.
- **Latency:** Finding the "closest" 10 items in a 10M item index takes <10ms.

---

## 3. Two-Stage Architecture (Retrieval vs Ranking)
1. **Candidate Retrieval:** Narrow down 10M items to 200 likely candidates (Fast, cheap).
2. **Ranking:** Use a complex Deep Learning model (NN) to score those 200 items (Slow, expensive).

---

## 4. Cold Start Problem
What to recommend to a new user?
- **Solution:** Use **Popularity-based** or **Context-based** (location/language) defaults until they click on something.

## 5. Monitoring
- **Precision@K:** Are the top K results actually clicked?
- **Diversity:** Are we only showing the same 5 items?
        `
    },
    {
        id: "sd-analytics-pipeline",
        slug: "designing-real-time-analytics-pipelines",
        title: "Analytics Pipeline: Processing 10M Events/Second",
        description: "Scaling a data pipeline from ingestion to warehouse. Kafka, Flink, and Data Lakes.",
        category: "System Design",
        difficulty: "Advanced",
        tags: ["Data Engineering", "Big Data", "Kafka", "Batch vs Stream"],
        viewCount: 22000,
        updatedAt: "2024-04-14",
        author: "Data Lead",
        content: `
# Analytics Pipeline: Architecting the Data Flow

Analytics systems handle "Write-Heavy" events (clicks, scrolls, errors) and "Complex Read" queries.

## 1. The Lambda Architecture
Traditional pipelines separate Batch and Stream.
- **Speed Layer (Stream):** Real-time dashboards ($O(seconds)$). Tool: **Apache Flink**.
- **Batch Layer:** Exact data for financial reports ($O(hours)$). Tool: **Spark**.

---

## 2. Component Breakdown
1. **Producer:** App SDKs sending JSON events.
2. **Gateway:** Ingests events and puts them into a persistent buffer (**Kafka**).
3. **Stream Processor:** Cleans, enriches, and filters data in flight.
4. **Data Warehouse:** **Snowflake** or **BigQuery** for analytical queries.

---

## 3. Data Lake vs Data Warehouse
- **Lake (S3):** Raw, unprocessed data. Cheap.
- **Warehouse (Redshift):** Structured, indexed data. Expensive but fast.

---

## 4. Handling Scale & Partitioning
Shard your Kafka topics by \`event_type\`. This allows parallel processing across 100s of worker nodes. 

## 5. Failures
- **Duplicates:** Use an \`event_id\` for **Exactly-once semantics** in Flink.
- **Late Data:** Use **Watermarking** to handle events that arrive minutes late due to network lag.
        `
    }
];
