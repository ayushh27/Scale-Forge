import { Article } from "@/hooks/useArticles";

export const SQL_ARTICLES: Article[] = [
    {
        id: "sql-basics-exhaustive",
        slug: "sql-core-fundamentals-and-joins",
        title: "SQL Foundations: The Language of Data",
        description: "Mastering the declarative power of SQL. From basic SELECTs to complex multi-table JOINs.",
        category: "Languages",
        difficulty: "Beginner",
        tags: ["SQL", "Databases", "Querying", "Basics"],
        viewCount: 31000,
        updatedAt: "2024-04-14",
        author: "Scaleforge Data Team",
        content: `
# SQL Foundations: Thinking in Sets

Unlike Java or Python, SQL is **Declarative**. You tell the database *what* you want, not *how* to get it.

## 1. The Core Operations
- **SELECT:** Choosing columns.
- **WHERE:** Filtering rows.
- **GROUP BY:** Aggregating data (Count, Average, Sum).
- **HAVING:** Filtering aggregated rows.

---

## 2. Mastery of JOINs
This is the heart of relational databases.
- **INNER JOIN:** Only rows that exist in both tables.
- **LEFT JOIN:** All rows from the left table, even if no match exists on the right.
- **FULL OUTER JOIN:** All rows from both tables.
- **CROSS JOIN:** Cartesian product (every row hits every other row). **Careful: this can crash your server on large tables.**

---

## 3. Subqueries vs. CTEs (Common Table Expressions)
CTEs use the \`WITH\` keyword and are much more readable and maintainable than nested subqueries.
\`\`\`sql
WITH RegionalSales AS (
    SELECT region, SUM(amount) as total
    FROM sales
    GROUP BY region
)
SELECT * FROM RegionalSales WHERE total > 10000;
\`\`\`

---

## 4. Production Tips
- Never use \`SELECT *\`. Always specify your columns to reduce network IO.
- Use **Transactions** (\`BEGIN TRANSACTION\`, \`COMMIT\`) to ensure data integrity.
        `
    },
    {
        id: "sql-advanced-optimization",
        slug: "sql-optimization-indexing-and-execution-plans",
        title: "Advanced SQL: Optimization & Indexing",
        description: "How to turn a 30-second query into a 30-millisecond one. B-Trees, Execution Plans, and Window Functions.",
        category: "Languages",
        difficulty: "Advanced",
        tags: ["SQL", "Databases", "Performance", "Optimization"],
        viewCount: 24500,
        updatedAt: "2024-04-14",
        author: "DBA Specialist",
        content: `
# SQL Optimization: The Art of the Index

In production, your SQL query isn't just a logic check; it's a resource struggle.

## 1. Indexing: The Secret Weapon
Without an index, the DB does a **Full Table Scan ($O(N)$)**. With a **B-Tree Index**, it does a **Logarithmic Lookup ($O(\log N)$)**.
- **Clustered Index:** The physical order of data on the disk (usually the Primary Key).
- **Non-Clustered Index:** A separate pointer structure.

---

## 2. Reading Execution Plans
Before optimizing, check the plan (\`EXPLAIN ANALYZE\`).
- **Index Scan:** Good.
- **Index Seek:** Better.
- **Seq Scan (Sequential Scan):** Bad for large tables. This means you forgotten an index!

---

## 3. Window Functions (\`OVER\`)
Standard aggregates group rows into one. Window functions perform calculations *across* rows while keeping individual rows.
\`\`\`sql
-- Running total
SELECT date, amount, 
       SUM(amount) OVER (ORDER BY date) as running_total
FROM sales;
\`\`\`

---

## 4. The ACID Guarantees
- **Atomicity:** All or nothing.
- **Consistency:** DB moves from one valid state to another.
- **Isolation:** Concurrent transactions don't interfere with each other.
- **Durability:** Once committed, data survives power failure.

---

## 5. Interview Insight: Denormalization
Sometimes, we intentionally break "Clean" database rules and duplicate data to avoid 5-way JOINs. This is called **Denormalization** and is essential for high-read-scale systems.
        `
    }
];
