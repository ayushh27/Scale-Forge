import { Article } from "@/hooks/useArticles";

export const SD_INFRA_ADVANCED_ARTICLES: Article[] = [
    {
        id: "sd-logging-system",
        slug: "designing-scalable-logging-and-observability",
        title: "Logging System: Architecting for Observability",
        description: "How to capture, store, and query Terabytes of logs. ELK vs. PLG stack debate.",
        category: "System Design",
        difficulty: "Advanced",
        tags: ["Infrastructure", "SRE", "Observability", "Elasticsearch"],
        viewCount: 19400,
        updatedAt: "2024-04-14",
        author: "Infrastructure Lead",
        content: `
# Logging Systems: The Soul of Debugging

Logging is easy for one app. For 1,000 microservices generating 10TB/day, it becomes a massive system design challenge.

## 1. Requirements
- **Functional:** Log ingestion, Keyword search, Log rotation/retention.
- **Non-Functional:** Low overhead on the app, High availability (Searching logs is critical during an outage).

---

## 2. Ingestion Patterns
- **Push (Agent):** Apps push logs to a collector. (High risk of losing logs if collector is full).
- **Pull (Collector):** Collector pulls from the app's \`stdout\`. (Standard in Kubernetes).

---

## 3. The Popular Stacks
### ELK Stack (Elasticsearch, Logstash, Kibana)
- **Pros:** Extremely fast full-text search.
- **Cons:** Very expensive in terms of RAM/CPU.
### PLG Stack (Promtail, Loki, Grafana)
- **Pros:** Cheap. Only indexes metadata, not the whole log body.
- **Cons:** Slower search for specific keywords.

---

## 4. Sampling & Filtering
In production, we don't store 100% of logs. 
- **Debug logs:** Deleted after 1 hour.
- **Error logs:** Stored for 30 days.
- **Sampling:** Only store logs for 5% of "Success" requests to save space.

---

## 5. Storage Hierarchy
- **Hot Tier (SSD):** Logs from last 24 hours.
- **Warm Tier (HDD):** Logs from last 7 days.
- **Cold Tier (S3):** Compressed logs for compliance (legal requirements).
        `
    },
    {
        id: "sd-auth-system",
        slug: "designing-scalable-authentication-platforms",
        title: "Authentication Platform: Security at Global Scale",
        description: "Designing a system like Auth0 or Okta. OAuth 2, JWT internals, and Distributed Session management.",
        category: "System Design",
        difficulty: "Advanced",
        tags: ["Security", "Auth", "OAuth", "Architecture"],
        viewCount: 22000,
        updatedAt: "2024-04-14",
        author: "Security Architect",
        content: `
# Authentication Platform: The Gatekeeper Architecture

Protecting a user's identity is the highest priority in system design.

## 1. Stateful vs. Stateless
- **Stateful (Session-based):** Server stores a \`SessionID\` in Redis.
    - **Pros:** Instant revocation (logout).
    - **Cons:** Requires a database trip for every request.
- **Stateless (JWT-based):** The user carries an encrypted token.
    - **Pros:** Scales globally without a central DB check.
    - **Cons:** Token revocation is difficult before expiration.

---

## 2. OAuth 2.0 Flow (The Gold Standard)
1. **Authorization Code:** User gets a code from the Auth Server.
2. **Exchange:** App exchanges code for an **Access Token** and **Refresh Token**.
3. **Usage:** App uses Access Token for API calls.

---

## 3. Distributed Session Management
In a multi-region app (US/EU/Asia), how do we sync sessions?
- **Global Redis Cluster:** Low latency via replication.
- **Centralized Auth API:** All requests hit the Auth API before reaching microservices (Sidecar pattern).

---

## 4. Advanced Security Patterns
- **MFA (Multi-Factor):** TOTP (Google Authenticator) or SMS.
- **RBAC (Role-Based Access Control):** Storing permissions in the user's claims.
- **Rate Limiting on Login:** To prevent Brute Force attacks.

---

## 5. Failure Scenarios
- **Auth Server Down:** If Auth dies, the WHOLE company dies.
- **Solution:** Massive redundancy and strictly using **Public-Key (JWKS)** for local signature verification, allowing microservices to verify tokens even if the Auth server is unreachable.
        `
    }
];
