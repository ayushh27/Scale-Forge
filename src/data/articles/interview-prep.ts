import { Article } from "@/hooks/useArticles";

export const INTERVIEW_PREP_ARTICLES: Article[] = [
    {
        id: "int-1",
        slug: "interview-system-design-blueprint",
        title: "The Senior System Design Framework",
        description: "Stop jumping into components. Learn the 4-step framework FAANG interviewers actually want to see.",
        category: "Interview Prep",
        difficulty: "Advanced",
        tags: ["Interview", "Career", "Architecture"],
        viewCount: 35000,
        updatedAt: "2024-01-20",
        author: "Ex-FAANG Interviewer",
        estimatedReadingTime: 20,
        content: `
# Cracking the System Design Interview

Most candidates fail because they start drawing boxes immediately. A Senior SDE approach is disciplined and constraint-driven.

## Step 1: Clarify Constraints (The Critical 10 Minutes)
Never assume scale. Ask:
- "Are we building for 1k or 1M users?"
- "Is the read-to-write ratio 100:1 or 1:1?"
- "What is the acceptable latency for a message delivery?"

## Step 2: High-Level Design (The Blueprint)
Sketch the end-to-end flow. 
- Client -> Load Balancer -> API Gateway -> Service -> DB.
- Keep it abstract. Don't mention "Kafka" yet; say "Message Queue."

## Step 3: Deep Dive (The Senior Flex)
Pick one component and deconstruct it.
- "How do we generate unique IDs at scale? UUID vs Snowflake?"
- "How do we handle database hotkeys?"

## Step 4: Tradeoffs & Scaling
Acknowledge that your system isn't perfect.
- Discuss "Single points of failure."
- Explain how you'd scale from 1M to 10M users.

## The Senior Differentiator
Good candidates design systems. Great candidates design systems *that are operational*. Mention monitoring, logging, and deployment strategies.
        `
    }
];
