// Export all expanded DSA articles
export { ARRAYS_EXPANDED } from './arrays-expanded';
export { STRINGS_EXPANDED } from './strings-expanded';
export { LINKED_LIST_EXPANDED } from './linked-list-expanded';
export { STACK_QUEUE_EXPANDED } from './stack-queue-expanded';
export { HASHING_EXPANDED } from './hashing-expanded';
export { TREES_EXPANDED } from './trees-expanded';
export { GRAPHS_EXPANDED } from './graphs-expanded';

import { ARRAYS_EXPANDED } from './arrays-expanded';
import { STRINGS_EXPANDED } from './strings-expanded';
import { LINKED_LIST_EXPANDED } from './linked-list-expanded';
import { STACK_QUEUE_EXPANDED } from './stack-queue-expanded';
import { HASHING_EXPANDED } from './hashing-expanded';
import { TREES_EXPANDED } from './trees-expanded';
import { GRAPHS_EXPANDED } from './graphs-expanded';

// All expanded articles in order
export const DSA_EXPANDED_ARTICLES = [
    ARRAYS_EXPANDED,
    STRINGS_EXPANDED,
    LINKED_LIST_EXPANDED,
    STACK_QUEUE_EXPANDED,
    HASHING_EXPANDED,
    TREES_EXPANDED,
    GRAPHS_EXPANDED,
];

// Navigation structure for DSA documentation
export const DSA_NAVIGATION = {
    fundamentals: {
        id: 'fundamentals',
        title: 'DSA Fundamentals',
        topics: [
            { id: 'overview', title: 'Overview', slug: 'dsa-overview' },
            { id: 'complexity', title: 'Time & Space Complexity', slug: 'complexity-analysis' },
        ]
    },
    dataStructures: {
        id: 'data-structures',
        title: 'Data Structures',
        topics: [
            { id: 'arrays', title: 'Array', slug: 'arrays-complete-guide' },
            { id: 'strings', title: 'String', slug: 'strings-complete-guide' },
            { id: 'linked-list', title: 'Linked List', slug: 'linked-list-complete-guide' },
            { id: 'stack-queue', title: 'Stack & Queue', slug: 'stack-queue-complete-guide' },
            { id: 'hashing', title: 'Hashing', slug: 'hashing-complete-guide' },
            { id: 'trees', title: 'Trees', slug: 'trees-complete-guide' },
            { id: 'graphs', title: 'Graphs', slug: 'graphs-complete-guide' },
        ]
    },
    algorithms: {
        id: 'algorithms',
        title: 'Algorithms',
        topics: [
            { id: 'recursion', title: 'Recursion', slug: 'recursion' },
            { id: 'sorting', title: 'Sorting', slug: 'sorting' },
            { id: 'searching', title: 'Searching', slug: 'searching' },
            { id: 'two-pointers', title: 'Two Pointers', slug: 'two-pointers' },
            { id: 'sliding-window', title: 'Sliding Window', slug: 'sliding-window' },
        ]
    },
    advanced: {
        id: 'advanced',
        title: 'Advanced Topics',
        topics: [
            { id: 'dp', title: 'Dynamic Programming', slug: 'dynamic-programming' },
            { id: 'greedy', title: 'Greedy', slug: 'greedy' },
            { id: 'backtracking', title: 'Backtracking', slug: 'backtracking' },
            { id: 'trie', title: 'Trie', slug: 'trie' },
        ]
    }
};

// Helper function to get article by slug
export function getExpandedArticleBySlug(slug: string) {
    return DSA_EXPANDED_ARTICLES.find(article => article.slug === slug);
}

// Helper function to get all slugs
export function getAllExpandedSlugs() {
    return DSA_EXPANDED_ARTICLES.map(article => article.slug);
}
