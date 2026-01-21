"use client";

import { useState, useEffect } from 'react';

export type UserStats = {
    completedArticles: string[];
    bookmarks: string[];
    notes: Record<string, string>;
    history: string[];
};

const STORAGE_KEY = 'scaleforge_user_stats';

export function useUserStats() {
    const [stats, setStats] = useState<UserStats>({
        completedArticles: [],
        bookmarks: [],
        notes: {},
        history: [],
    });

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setStats(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load user stats", e);
            }
        }
    }, []);

    const saveStats = (newStats: UserStats) => {
        setStats(newStats);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
    };

    const markComplete = (slug: string) => {
        if (stats.completedArticles.includes(slug)) return;
        const newStats = { ...stats, completedArticles: [...stats.completedArticles, slug] };
        saveStats(newStats);
    };

    const toggleBookmark = (slug: string) => {
        const isBookmarked = stats.bookmarks.includes(slug);
        const newStats = {
            ...stats,
            bookmarks: isBookmarked
                ? stats.bookmarks.filter(s => s !== slug)
                : [...stats.bookmarks, slug]
        };
        saveStats(newStats);
    };

    const saveNote = (slug: string, note: string) => {
        const newStats = {
            ...stats,
            notes: { ...stats.notes, [slug]: note }
        };
        saveStats(newStats);
    };

    const addToHistory = (slug: string) => {
        const filteredHistory = stats.history.filter(s => s !== slug);
        const newStats = {
            ...stats,
            history: [slug, ...filteredHistory].slice(0, 10) // Keep last 10
        };
        saveStats(newStats);
    };

    return {
        stats,
        markComplete,
        toggleBookmark,
        saveNote,
        addToHistory,
        isCompleted: (slug: string) => stats.completedArticles.includes(slug),
        isBookmarked: (slug: string) => stats.bookmarks.includes(slug),
    };
}
