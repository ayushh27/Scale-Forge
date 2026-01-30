"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useArticles, Article } from "@/hooks/useArticles";
import { Search, Filter, BookOpen, Clock, Eye, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { HUB_REGISTRY } from "@/data/hubs";
import { ContentContainer, PageHeader } from "@/components/layout";

export default function LearnPage() {
    return (
        <Suspense fallback={<div className="content-container py-32 animate-pulse h-screen bg-muted/10 rounded-[3rem]" />}>
            <LearnContent />
        </Suspense>
    );
}

function LearnContent() {
    const { data: articles, isLoading } = useArticles();
    const searchParams = useSearchParams();
    const initialCat = searchParams.get("cat") || "All";
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const cat = searchParams.get("cat");
        if (cat) setSelectedCategory(cat);
    }, [searchParams]);

    const categories = useMemo(() => {
        if (!articles) return ["All"];
        const cats = Array.from(new Set(articles.map(a => a.category)));
        return ["All", ...cats];
    }, [articles]);

    const filteredArticles = useMemo(() => {
        if (!articles) return [];
        return articles.filter(article => {
            const matchCategory = selectedCategory === "All" || article.category === selectedCategory;
            const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchSearch;
        });
    }, [articles, selectedCategory, searchQuery]);

    const difficultyColor = {
        Beginner: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
        Intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
        Advanced: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    };

    return (
        <ContentContainer size="xl" className="py-8 md:py-12">
            <div className="flex flex-col gap-12 mb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                            <BookOpen className="w-3 h-3" /> Engineering Knowledge Base
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none">Learn. Forge. <span className="text-primary italic">Scale.</span></h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
                            Exhaustive, production-grade documentation for the modern software engineer. From binary foundations to global distributed systems.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search the forge..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-11 pr-6 py-4 bg-muted/30 border border-white/5 rounded-[1.5rem] text-sm md:w-96 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium backdrop-blur-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Hub Selection Scroller */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {Object.entries(HUB_REGISTRY).map(([id, hub]) => (
                        <Link key={id} href={`/hub/${id}`}>
                            <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-muted/20 border border-white/5 hover:border-primary/20 hover:bg-muted/40 transition-all group cursor-pointer h-full flex flex-col items-center text-center">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                                    <hub.icon className="w-5 h-5 md:w-6 h-6" />
                                </div>
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1">{hub.title.split(' ')[0]}</span>
                                <span className="text-[8px] md:text-[9px] font-bold text-muted-foreground opacity-60">Master Path</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Horizontal Category Scroller for Mobile */}
                <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 scrollbar-hide -mx-6 px-6">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "whitespace-nowrap px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all",
                                selectedCategory === cat
                                    ? "bg-primary text-background border-primary shadow-lg shadow-primary/20"
                                    : "bg-muted/20 text-muted-foreground border-white/5"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Sidebar Filters */}
                <aside className="hidden lg:block space-y-10">
                    <div>
                        <h3 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-muted-foreground opacity-70">Domains</h3>
                        <div className="flex flex-col gap-1">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "w-full text-left px-5 py-3 rounded-2xl transition-all text-sm font-semibold flex items-center justify-between group",
                                        selectedCategory === cat
                                            ? "bg-primary/20 text-primary border border-primary/20"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground border border-transparent"
                                    )}
                                >
                                    {cat}
                                    {selectedCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/10">
                        <h4 className="font-bold text-sm mb-3">SDE Interview Prep?</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-6">Explore our curated roadmaps for DSA and System Design interviews at Big Tech.</p>
                        <button className="text-xs font-bold text-primary hover:underline">View Roadmaps →</button>
                    </div>
                </aside>

                {/* Article Grid */}
                <div className="lg:col-span-3">
                    {filteredArticles.length === 0 && !isLoading ? (
                        <div className="h-64 flex flex-col items-center justify-center text-center p-12 rounded-[3rem] border border-dashed border-white/10">
                            <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4">
                                <BookOpen className="text-muted-foreground opacity-50" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No articles found</h3>
                            <p className="text-muted-foreground max-w-xs">Try adjusting your filters or search terms.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <AnimatePresence mode="popLayout">
                                {isLoading ? (
                                    Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="h-72 rounded-[2.5rem] bg-muted/20 animate-pulse border border-white/5" />
                                    ))
                                ) : (
                                    filteredArticles.map((article, i) => (
                                        <motion.div
                                            key={article.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Link href={`/learn/${article.slug}`}>
                                                <div className="group h-full p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-card border border-white/5 hover:border-primary/30 hover:bg-muted/30 transition-all flex flex-col relative overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5">
                                                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />

                                                    <div className="flex items-center justify-between mb-6 md:mb-8">
                                                        <span className={cn(
                                                            "px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border",
                                                            difficultyColor[article.difficulty]
                                                        )}>
                                                            {article.difficulty}
                                                        </span>
                                                        <div className="flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                            <span className="flex items-center gap-1.5"><Eye size={12} className="text-primary" /> {(article.viewCount / 1000).toFixed(1)}k</span>
                                                            <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" /> 12m</span>
                                                        </div>
                                                    </div>

                                                    <h3 className="text-xl md:text-2xl font-black mb-4 group-hover:text-primary transition-colors leading-tight">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 mb-8 md:mb-10 flex-grow leading-relaxed font-medium">
                                                        {article.description}
                                                    </p>

                                                    <div className="pt-6 md:pt-8 border-t border-white/5 flex items-center justify-between">
                                                        <div className="flex flex-wrap gap-2">
                                                            {article.tags.slice(0, 2).map(tag => (
                                                                <span key={tag} className="px-3 py-1 rounded-xl bg-white/5 text-[10px] font-bold border border-white/5 uppercase tracking-wider text-muted-foreground">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-inner">
                                                            <ChevronRight size={20} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </ContentContainer>
    );
}
