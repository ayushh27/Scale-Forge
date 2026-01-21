import { Article } from "@/hooks/useArticles";

export const COMPUTER_SCIENCE_ARTICLES: Article[] = [
    {
        id: "cs-foundational-overview",
        slug: "why-cs-fundamentals-matter-for-engineers",
        title: "CS Core: The Engine Room",
        description: "Understanding the machine below the code. Why OS and Networking internals define your ceiling as a developer.",
        category: "Computer Science",
        difficulty: "Beginner",
        tags: ["Foundations", "Computer Science", "OS"],
        viewCount: 31000,
        updatedAt: "2024-04-12",
        author: "Systems Architect",
        content: `
# CS Core: Why Computer Science Still Matters

In a world where we build apps using browsers and cloud APIs, some ask: *Why should I care about paging, kernel interrupts, or the TCP handshake?*

## 1. The Ceiling of a Developer
You can build a web app with 0 knowledge of CS. But without these fundamentals, you hit a "ceiling" when things go wrong:
- **Performance:** Why is this Node.js app using 4GB of RAM? (You need to understand memory fragmentation).
- **Stability:** Why does the database keep timing out? (You need to understand TCP retransmissions or File descriptors).
- **Architecture:** Should we use threads or events? (You need to understand OS context-switching cost).

## 2. The Mental Model: The Stack
1. **The Application:** Your code.
2. **The Environment:** Browser engine (V8) or Runtime (JVM).
3. **The OS:** Process management, I/O, File systems.
4. **The Hardware:** CPU, Caches (L1/L2/L3), RAM, Disk.

---

## 3. Hierarchical Mastery Path
1. **The Machine (Beginner):** Binary, Memory segments, Basic CPU architecture.
2. **Operating Systems (Intermediate):** Processes, Threads, Paging, Virtual Memory, Deadlocks.
3. **Networking (Intermediate):** TCP/IP Stack, DNS, TLS Handshake, Sockets.
4. **Compiler Design (Advanced):** Lexing, Parsing, Abstract Syntax Trees (ASTs).

## 4. The Interview Strategy
When asked an OS question, always think in terms of **Resources**.
- **CPU:** Process Scheduling.
- **Memory:** Virtual Memory / Swapping.
- **Disk:** File Systems / Buffering.
- **Network:** Throughput vs. Latency.
        `
    },
    {
        id: "cs-networking-basics",
        slug: "how-the-internet-works-tcp-ip-for-engineers",
        title: "The Network Layer: TCP/IP & The Architecture of Connectivity",
        description: "A deep dive into how data moves across the wire. From packets to segments.",
        category: "Computer Science",
        difficulty: "Intermediate",
        tags: ["Networking", "TCP", "UDP", "HTTP"],
        viewCount: 24500,
        updatedAt: "2024-04-13",
        author: "Network Specialist",
        content: `
# The Network Layer: Architecture of Connectivity

As a software engineer, every time you make a \`fetch()\` request, a complex symphony of networking protocols is triggered. Understanding this "Symphony" is critical for debugging latency and connectivity issues.

## 1. The OSI Model (Simplified)
You don't need to memorize all 7 layers, but you must know these 3:
- **Layer 7 (Application):** HTTP/DNS. This is where your code lives.
- **Layer 4 (Transport):** TCP/UDP. This handles reliability and port-to-port communication.
- **Layer 3 (Network):** IP. This handles routing across the internet.

---

## 2. TCP vs. UDP
### TCP (The Reliable One)
- **Mechanism:** Three-way handshake (\`SYN\` -> \`SYN-ACK\` -> \`ACK\`).
- **Features:** Retransmission of lost packets, congestion control, ordered delivery.
- **Use:** Banking, Web Pages, SSH.

### UDP (The Fast One)
- **Mechanism:** Fire and forget. No handshake.
- **Features:** Minimal latency, no reliability.
- **Use:** Video Streaming, Gaming, DNS.

---

## 3. The Lifecycle of a Request
1. **DNS Lookup:** "Who is google.com?" (UDP).
2. **TCP Handshake:** Establish a connection (TCP).
3. **TLS Handshake:** Secure the connection with encryption keys.
4. **HTTP Request:** The actual data transfer.
5. **Connection Closure:** \`FIN\` packets.

---

## 4. Interview Insights: The "High Latency" Bug
Imagine an API is slow. Before blaming the database, check the **Network Stats**:
- **Retransmissions:** Are 5% of packets being lost? TCP will exponentially slow down.
- **Latency (RTT):** Is the server 300ms away? Every handshake adds a massive delay.
- **Cold Starts:** Is the TLS handshake taking too long? Use Keep-alive headers.
        `
    },
    {
        id: "cs-os-concurrency",
        slug: "operating-systems-concurrency-and-deadlocks",
        title: "OS: Concurrency, Semaphores, and Deadlocks",
        description: "Core Operating System concepts for SDE interviews: threads, mutexes, and how to avoid the deadly embrace.",
        category: "Computer Science",
        difficulty: "Advanced",
        tags: ["OS", "Concurrency", "Interviews"],
        viewCount: 11200,
        updatedAt: "2024-03-31",
        author: "OS Internals",
        content: `
## Processes vs Threads
A **Process** is an instance of a program in execution, with its own address space. A **Thread** is a segment of a process that can execute concurrently with other threads.

### Key Differences
- **Memory:** Processes have independent memory; threads share memory within the same process.
- **Context Switching:** Faster for threads than processes.
- **Communication:** Processes use IPC (Inter-Process Communication); threads use shared variables.

## Synchronization Primitives
### 1. Mutex (Mutual Exclusion)
Ensures only one thread accesses a critical section at a time.

### 2. Semaphores
A variable or abstract data type used to control access to a common resource by multiple processes.
- **Binary Semaphore:** Similar to a mutex.
- **Counting Semaphore:** Allows N threads to access a resource.

## Deadlocks
A situation where two or more processes are unable to proceed because each is waiting for the other to release a resource.

### The Four Necessary Conditions (Coffman Conditions)
1. **Mutual Exclusion:** Resources cannot be shared.
2. **Hold and Wait:** Process holds one resource while waiting for another.
3. **No Preemption:** Resources cannot be forcibly taken.
4. **Circular Wait:** A closed chain of processes waiting for each other.

### Prevention Strategies
- **Resource Ordering:** Always lock resources in a specific order.
- **Timeout:** Don't wait indefinitely for a resource.
- **Banker's Algorithm:** Check if a resource allocation leads to a safe state.

\`\`\`c
// Classic Mutex usage
pthread_mutex_lock(&lock);
// Critical Section
counter++;
pthread_mutex_unlock(&lock);
\`\`\`
    `
    }
];
