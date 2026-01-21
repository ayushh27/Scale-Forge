import { LucideIcon, Code2, Database, Server, Hash, Cpu, Zap, Shield, Laptop, GitBranch, Layers, Terminal } from "lucide-react";

export type HubStep = {
    title: string;
    description: string;
    topics: { label: string; href: string; type: 'doc' | 'practice' }[];
};

export type HubData = {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    prerequisites: string[];
    progression: {
        beginner: HubStep;
        intermediate: HubStep;
        advanced: HubStep;
    };
};

export const HUB_REGISTRY: Record<string, HubData> = {
    dsa: {
        id: "dsa",
        title: "DSA Mastery Hub",
        description: "The engine room of software engineering. Master the structures and algorithms that power modern software with production-optimized patterns.",
        icon: Hash,
        color: "emerald",
        prerequisites: ["Choice of Language (Go/TS/Python)", "Basic Logic", "Big O Complexity Analysis"],
        progression: {
            beginner: {
                title: "Phase 1: Foundations",
                description: "Master the building blocks of data organization and memory layout.",
                topics: [
                    { label: "DSA Foundations", href: "/learn/foundations-of-dsa-and-big-o", type: 'doc' },
                    { label: "Arrays Mastery", href: "/learn/mastering-arrays-and-memory", type: 'doc' },
                    { label: "Strings Mastery", href: "/learn/strings-data-structure-mastery", type: 'doc' },
                    { label: "Linked Lists", href: "/learn/linked-lists-production-implementation", type: 'doc' },
                ]
            },
            intermediate: {
                title: "Phase 2: Complex Structures",
                description: "Moving into non-linear data, optimization, and abstract data types.",
                topics: [
                    { label: "Stacks & Queues", href: "/learn/stacks-and-queues-architectural-patterns", type: 'doc' },
                    { label: "Hash Tables", href: "/learn/hashing-and-hash-tables-deep-dive", type: 'doc' },
                    { label: "Trees & BST", href: "/learn/mastering-binary-trees-and-bsts", type: 'doc' },
                    { label: "Heaps & Tries", href: "/learn/heaps-and-trie-data-structures", type: 'doc' },
                ]
            },
            advanced: {
                title: "Phase 3: Algo Excellence",
                description: "Cracking the hardest optimization problems used in high-performance computing.",
                topics: [
                    { label: "Recursion & Backtracking", href: "/learn/recursion-and-backtracking-optimization", type: 'doc' },
                    { label: "Dynamic Programming", href: "/learn/mastering-dynamic-programming-patterns", type: 'doc' },
                    { label: "Graph Algorithms", href: "/learn/graph-algorithms-traversals-and-shortest-paths", type: 'doc' },
                    { label: "Sliding Window Patterns", href: "/learn/sliding-window-and-two-pointer-optimization", type: 'doc' },
                ]
            }
        }
    },
    "system-design": {
        id: "system-design",
        title: "Architect's Hub",
        description: "Learn to design systems that serve millions. Master scalability, reliability, and global persistence.",
        icon: Layers,
        color: "blue",
        prerequisites: ["Backend Fundamentals", "Database Basics", "OS Internals"],
        progression: {
            beginner: {
                title: "Phase 1: Foundations",
                description: "Standard components and patterns for single and distributed servers.",
                topics: [
                    { label: "System Design Foundations", href: "/learn/foundations-of-scalable-system-design", type: 'doc' },
                    { label: "Monolith vs Microservices", href: "/learn/monolith-vs-microservices-trade-offs", type: 'doc' },
                    { label: "Load Balancers", href: "/learn/load-balancers-traffic-distribution-strategies", type: 'doc' },
                ]
            },
            intermediate: {
                title: "Phase 2: Scale & Safety",
                description: "Handling persistence, consistency, and partitioning at massive scale.",
                topics: [
                    { label: "Consistent Hashing", href: "/learn/consistent-hashing-distributed-load-balancing", type: 'doc' },
                    { label: "Rate Limiting", href: "/learn/rate-limiting-protecting-distributed-systems", type: 'doc' },
                    { label: "URL Shortener Design", href: "/learn/designing-a-scalable-url-shortener", type: 'doc' },
                ]
            },
            advanced: {
                title: "Phase 3: Global Blueprints",
                description: "Solving the hardest problems: consensus, replication lag, and architectural blueprints.",
                topics: [
                    { label: "Chat System Design", href: "/learn/designing-a-real-time-chat-application", type: 'doc' },
                    { label: "Distributed Job Queues", href: "/learn/designing-a-distributed-job-queue", type: 'doc' },
                    { label: "Search Engine Architecture", href: "/learn/designing-a-scalable-search-engine-logic", type: 'doc' },
                ]
            }
        }
    },
    "backend": {
        id: "backend",
        title: "Backend Engineering Hub",
        description: "The backbone of the digital world. Master server-side logic, APIs, and microservices.",
        icon: Server,
        color: "rose",
        prerequisites: ["Choice of Language", "HTTP Basics", "Data Structures"],
        progression: {
            beginner: {
                title: "Phase 1: API Foundations",
                description: "Building robust and standardized interfaces.",
                topics: [
                    { label: "RESTful API Design", href: "/learn/restful-api-design-and-versioning-strategies", type: 'doc' },
                    { label: "Auth & Identity", href: "/learn/authentication-and-authorization-jwt-oauth2-deep-dive", type: 'doc' },
                    { label: "Relational Internals", href: "/learn/postgresql-and-mysql-internals-and-optimization", type: 'doc' },
                ]
            },
            intermediate: {
                title: "Phase 2: Performance",
                description: "Optimizing for speed and reliability.",
                topics: [
                    { label: "NoSQL Patterns", href: "/learn/mongodb-and-redis-nosql-architecture-patterns", type: 'doc' },
                    { label: "Message Queues", href: "/learn/background-jobs-and-message-queues-patterns", type: 'doc' },
                    { label: "Database Scaling", href: "/learn/database-replication-sharding-and-consistency", type: 'doc' },
                ]
            },
            advanced: {
                title: "Phase 3: Resilience",
                description: "Designing resilient distributed systems.",
                topics: [
                    { label: "Service Communication", href: "/learn/service-communication-patterns-sync-vs-async", type: 'doc' },
                    { label: "Fault Tolerance", href: "/learn/fault-tolerance-retries-and-circuit-breakers", type: 'doc' },
                    { label: "Logging & Observability", href: "/learn/designing-scalable-logging-and-observability", type: 'doc' },
                ]
            }
        }
    },
    languages: {
        id: "languages",
        title: "Language Mastery Hub",
        description: "Deep dive into the tools of the trade. Master concurrency, type systems, and performance tuning.",
        icon: Code2,
        color: "amber",
        prerequisites: ["Computer Literacy", "Analytical Thinking"],
        progression: {
            beginner: {
                title: "Phase 1: Foundations",
                description: "Syntax, memory safety, and control flow for the modern engineer.",
                topics: [
                    { label: "Language Foundations", href: "/learn/mastering-programming-languages-beyond-syntax", type: 'doc' },
                    { label: "Python Fundamentals", href: "/learn/python-fundamentals-and-syntax", type: 'doc' },
                    { label: "Go Fundamentals", href: "/learn/go-syntax-and-fundamentals", type: 'doc' },
                    { label: "SQL Foundations", href: "/learn/sql-core-fundamentals-and-joins", type: 'doc' },
                ]
            },
            intermediate: {
                title: "Phase 2: Paradigms",
                description: "Concurrency, complex type systems, and framework-level design.",
                topics: [
                    { label: "TypeScript Mastery", href: "/learn/advanced-typescript-patterns-exhaustive", type: 'doc' },
                    { label: "Java & The JVM", href: "/learn/java-oop-and-the-jvm-foundations", type: 'doc' },
                    { label: "C++ & RAII", href: "/learn/mastering-cpp-pointers-and-raii", type: 'doc' },
                    { label: "Go Concurrency", href: "/learn/mastering-concurrency-in-go", type: 'doc' },
                ]
            },
            advanced: {
                title: "Phase 3: Systems Internal",
                description: "Compilers, garbage collection, and runtime performance optimization.",
                topics: [
                    { label: "Python Async & GIL", href: "/learn/python-asyncio-concurrency-patterns", type: 'doc' },
                    { label: "Java Advanced Concurrency", href: "/learn/mastering-java-concurrency-and-the-jmm", type: 'doc' },
                    { label: "C++ Metaprogramming", href: "/learn/cpp-template-metaprogramming-and-optimization", type: 'doc' },
                    { label: "JS Engine & V8", href: "/learn/javascript-event-loop-and-v8-internals", type: 'doc' },
                ]
            }
        }
    },
    "devops": {
        id: "devops",
        title: "DevOps & SRE Hub",
        description: "Master the bridge between development and operations. Infrastructure as code, CI/CD, and observability.",
        icon: Terminal,
        color: "rose",
        prerequisites: ["Linux Fundamentals", "Networking Basics", "Git"],
        progression: {
            beginner: {
                title: "Cloud Foundations",
                description: "Getting started with containers and virtualization.",
                topics: [
                    { label: "Docker & K8s", href: "/learn/docker-kubernetes-and-container-orchestration", type: 'doc' },
                    { label: "Observability Basics", href: "/learn/monitoring-logging-and-distributed-tracing", type: 'doc' },
                ]
            },
            intermediate: {
                title: "Infrastructure as Code",
                description: "Managing infrastructure with code and logic.",
                topics: [
                    { label: "Service Communication", href: "/learn/service-communication-patterns-sync-vs-async", type: 'doc' },
                    { label: "Fault Tolerance", href: "/learn/fault-tolerance-retries-and-circuit-breakers", type: 'doc' },
                ]
            },
            advanced: {
                title: "Reliability Eng.",
                description: "Systems design for 99.99% availability.",
                topics: [
                    { label: "Logging Architecture", href: "/learn/designing-scalable-logging-and-observability", type: 'doc' },
                    { label: "Auth Platforms", href: "/learn/designing-scalable-authentication-platforms", type: 'doc' },
                ]
            }
        }
    },
    "databases": {
        id: "databases",
        title: "Database Internals Hub",
        description: "Go beyond CRUD. Understand storage engines, indexing theory, and distributed consensus.",
        icon: Database,
        color: "blue",
        prerequisites: ["SQL Basics", "Data Structures", "OS Internals"],
        progression: {
            beginner: {
                title: "Storage Engine",
                description: "How data is actually written to disk.",
                topics: [
                    { label: "SQL Fundamentals", href: "/learn/sql-core-fundamentals-and-joins", type: 'doc' },
                    { label: "Postgres & MySQL", href: "/learn/postgresql-and-mysql-internals-and-optimization", type: 'doc' },
                ]
            },
            intermediate: {
                title: "Scalability",
                description: "Moving from single-node to distributed clusters.",
                topics: [
                    { label: "NoSQL Architecture", href: "/learn/mongodb-and-redis-nosql-architecture-patterns", type: 'doc' },
                    { label: "SQL Optimization", href: "/learn/sql-optimization-indexing-and-execution-plans", type: 'doc' },
                ]
            },
            advanced: {
                title: "Consistency",
                description: "Coordinating data across the globe.",
                topics: [
                    { label: "DB Scaling Patterns", href: "/learn/database-replication-sharding-and-consistency", type: 'doc' },
                    { label: "Consensus (Raft/Paxos)", href: "/learn/fault-tolerance-retries-and-circuit-breakers", type: 'doc' },
                ]
            }
        }
    }
};
