"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

export type UserStats = {
    completedArticles: string[];
    bookmarks: string[];
    notes: Record<string, string>;
    history: string[];
};

const STORAGE_KEY = 'scaleforge_user_stats';

const defaultStats: UserStats = {
    completedArticles: [],
    bookmarks: [],
    notes: {},
    history: [],
};

export function useUserStats() {
    const [stats, setStats] = useState<UserStats>(defaultStats);
    const isInitialized = useRef(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setStats(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load user stats", e);
            }
        }
        isInitialized.current = true;
    }, []);

    // Save to localStorage when stats change (after initialization)
    useEffect(() => {
        if (isInitialized.current) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
        }
    }, [stats]);

    const markComplete = useCallback((slug: string) => {
        setStats(prev => {
            if (prev.completedArticles.includes(slug)) return prev;
            return { ...prev, completedArticles: [...prev.completedArticles, slug] };
        });
    }, []);

    const toggleBookmark = useCallback((slug: string) => {
        setStats(prev => {
            const isBookmarked = prev.bookmarks.includes(slug);
            return {
                ...prev,
                bookmarks: isBookmarked
                    ? prev.bookmarks.filter(s => s !== slug)
                    : [...prev.bookmarks, slug]
            };
        });
    }, []);

    const saveNote = useCallback((slug: string, note: string) => {
        setStats(prev => ({
            ...prev,
            notes: { ...prev.notes, [slug]: note }
        }));
    }, []);

    const addToHistory = useCallback((slug: string) => {
        setStats(prev => {
            // Check if already first in history to avoid unnecessary updates
            if (prev.history[0] === slug) return prev;
            const filteredHistory = prev.history.filter(s => s !== slug);
            return {
                ...prev,
                history: [slug, ...filteredHistory].slice(0, 10) // Keep last 10
            };
        });
    }, []);

    const isCompleted = useCallback((slug: string) => {
        return stats.completedArticles.includes(slug);
    }, [stats.completedArticles]);

    const isBookmarked = useCallback((slug: string) => {
        return stats.bookmarks.includes(slug);
    }, [stats.bookmarks]);

    return {
        stats,
        markComplete,
        toggleBookmark,
        saveNote,
        addToHistory,
        isCompleted,
        isBookmarked,
    };
}

