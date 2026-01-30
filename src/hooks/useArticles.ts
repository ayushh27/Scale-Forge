"use client";

import { useQuery } from "@tanstack/react-query";

// DSA articles
import { FOUNDATION_DSA_ARTICLES } from "@/data/dsa/foundations";
import { LINEAR_DSA_ARTICLES } from "@/data/dsa/linear";
import { NONLINEAR_DSA_ARTICLES } from "@/data/dsa/nonlinear";
import { GRAPH_DSA_ARTICLES } from "@/data/dsa/graphs";
import { PATTERN_DSA_ARTICLES } from "@/data/dsa/patterns";

// System Design
import { SD_FOUNDATION_ARTICLES } from "@/data/system-design/foundations";
import { SD_COMPONENT_ARTICLES } from "@/data/system-design/components";
import { SD_BLUEPRINT_ARTICLES } from "@/data/system-design/blueprints";
import { SD_ADVANCED_ARTICLES } from "@/data/system-design/advanced";
import { SD_INFRA_ADVANCED_ARTICLES } from "@/data/system-design/infrastructure_advanced";

// Backend & Databases
import { BACKEND_CORE_ARTICLES } from "@/data/backend/core";
import { DATABASE_CORE_ARTICLES } from "@/data/databases/core";

// DevOps & Distributed Systems
import { DEVOPS_CORE_ARTICLES } from "@/data/devops/core";
import { DISTRIBUTED_SYSTEMS_ARTICLES } from "@/data/distributed-systems/core";

// Languages
import { LANGUAGE_FOUNDATION_ARTICLES } from "@/data/languages/foundations";
import { GO_ARTICLES } from "@/data/languages/go";
import { PYTHON_ARTICLES } from "@/data/languages/python";
import { CPP_ARTICLES } from "@/data/languages/cpp";
import { JAVASCRIPT_ARTICLES } from "@/data/languages/javascript";
import { JAVA_ARTICLES } from "@/data/languages/java";
import { SQL_ARTICLES } from "@/data/languages/sql";

// Others / Legacy
import { COMPUTER_SCIENCE_ARTICLES } from "@/data/articles/cs-core";
import { COMPARISON_ARTICLES } from "@/data/articles/comparisons";
import { CASE_STUDY_ARTICLES } from "@/data/articles/case-studies";
import { INTERVIEW_PREP_ARTICLES } from "@/data/articles/interview-prep";
import { LANGUAGES_ARTICLES } from "@/data/articles/languages";

export type Article = {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    tags: string[];
    viewCount: number;
    updatedAt: string;
    author: string;
    content?: string;
    estimatedReadingTime?: number;
    prerequisites?: string[];
    nextSuggestedSlug?: string;
    relatedTopics?: string[]; // Array of slugs
    version?: string; // e.g., "1.0.0"
};

const ALL_ARTICLES: Article[] = [
    // DSA
    ...FOUNDATION_DSA_ARTICLES,
    ...LINEAR_DSA_ARTICLES,
    ...NONLINEAR_DSA_ARTICLES,
    ...GRAPH_DSA_ARTICLES,
    ...PATTERN_DSA_ARTICLES,

    // System Design
    ...SD_FOUNDATION_ARTICLES,
    ...SD_COMPONENT_ARTICLES,
    ...SD_BLUEPRINT_ARTICLES,
    ...SD_ADVANCED_ARTICLES,
    ...SD_INFRA_ADVANCED_ARTICLES,

    // Backend
    ...BACKEND_CORE_ARTICLES,
    ...DATABASE_CORE_ARTICLES,

    // DevOps & Distributed
    ...DEVOPS_CORE_ARTICLES,
    ...DISTRIBUTED_SYSTEMS_ARTICLES,

    // Languages
    ...LANGUAGE_FOUNDATION_ARTICLES,
    ...GO_ARTICLES,
    ...PYTHON_ARTICLES,
    ...CPP_ARTICLES,
    ...JAVASCRIPT_ARTICLES,
    ...JAVA_ARTICLES,
    ...SQL_ARTICLES,

    // CS Core & Prep
    ...COMPUTER_SCIENCE_ARTICLES,
    ...COMPARISON_ARTICLES,
    ...CASE_STUDY_ARTICLES,
    ...INTERVIEW_PREP_ARTICLES,
    ...LANGUAGES_ARTICLES
];

export function useArticles() {
    return useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            await new Promise(r => setTimeout(r, 400));
            return ALL_ARTICLES;
        },
    });
}

export function useArticle(slug: string) {
    return useQuery({
        queryKey: ["article", slug],
        queryFn: async () => {
            await new Promise(r => setTimeout(r, 200));
            const article = ALL_ARTICLES.find(a => a.slug === slug);
            if (!article) {
                throw new Error(`Article not found: ${slug}`);
            }
            return article;
        },
        retry: false, // Don't retry if article doesn't exist
    });
}
