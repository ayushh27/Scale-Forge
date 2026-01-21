import { Article } from "@/hooks/useArticles";

export const DEVOPS_CORE_ARTICLES: Article[] = [
    {
        id: "devops-containers-exhaustive",
        slug: "docker-kubernetes-and-container-orchestration",
        title: "Containers & K8s: The Cloud Engine",
        description: "Exhaustive guide to Docker internals, Kubernetes networking, and production container security.",
        category: "DevOps",
        difficulty: "Advanced",
        tags: ["Docker", "Kubernetes", "Cloud", "Containers"],
        viewCount: 31000,
        updatedAt: "2024-04-14",
        author: "Scaleforge DevOps",
        content: `
# Containerization: Packaging the World

Docker and Kubernetes have revolutionized how we deploy software by ensuring "It works on my machine" means "It works in Production."

## 1. Docker Internals: Isolation vs Virtualization
VMs include a full OS. Containers share the **Host Kernel**.
- **Namespaces:** Isolate processes, network, and filesystems.
- **Cgroups:** Limit CPU and RAM usage.
- **Image Optimization:** Always use **Alpine** or **Distroless** base images to reduce attack surface and build time.

---

## 2. Kubernetes (K8s) Architecture
K8s is a "Distributed OS" for your cluster.
- **Control Plane:** The brain (API Server, ETCD, Scheduler).
- **Nodes:** The muscle (Kubelet, Container Runtime).
- **Service Discovery:** K8s creates internal DNS so \`svc-orders\` always resolves to the right IP even if the Pod IP changes.

---

## 3. CI/CD: The Velocity Engine
- **Continuous Integration:** Automated builds/tests on every PR.
- **Continuous Deployment:** Automatic rollout to production.
- **Canary Deployment:** Rolling out a change to 5% of users first to check for errors before a full release.

---

## 4. Infrastructure as Code (Terraform)
Never click buttons in a Cloud Console to create servers. Use **Terraform** or **Pulumi**. This ensures your infrastructure is version-controlled and reproducible in any region.
        `
    },
    {
        id: "devops-observability-exhaustive",
        slug: "monitoring-logging-and-distributed-tracing",
        title: "Observability: SRE & Production Visibility",
        description: "Exhaustive guide to Prometheus, ELK Stack, and OpenTelemetry. Finding the needle in 1,000 servers.",
        category: "DevOps",
        difficulty: "Advanced",
        tags: ["Observability", "Prometheus", "SRE", "Logging"],
        viewCount: 22000,
        updatedAt: "2024-04-14",
        author: "Scaleforge SRE Team",
        content: `
# Observability: The Three Pillars

In a microservice world, you cannot SSH into every server. You need data to flow to a central dashboard.

## 1. Metrics (Prometheus/Grafana)
Numeric data over time. "Is CPU high?" "What is the 99th percentile latency?"
- **The Golden Signals:** Latency, Traffic, Errors, and Saturation (Google SRE Book).

---

## 2. Logging (ELK/Loki)
Discrete events. "What exactly did User 42 do before the crash?"
- **Structured Logging:** Use JSON logs. It makes them searchable by index (Elasticsearch) rather than just raw text.

---

## 3. Distributed Tracing (Jaeger/Tempo)
In a request that hits 10 services, where is the delay?
- **Logic:** Each request gets a \`trace_id\` passed in headers (\`x-trace-id\`). You can see a waterfall view of exactly where the time was spent.

---

## 4. Alerting Design
- **Symptoms over Causes:** Alert if "Order Success Rate < 95%," not just "CPU > 80%." High CPU is fine if the system is still working.
        `
    }
];
