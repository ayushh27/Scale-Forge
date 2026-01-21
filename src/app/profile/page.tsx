"use client";

import { motion } from "framer-motion";
import { useUserStats } from "@/hooks/useUserStats";
import { useArticles } from "@/hooks/useArticles";
import {
    User,
    Bookmark,
    CheckCircle2,
    History,
    Settings,
    LayoutGrid,
    TrendingUp,
    Award,
    Clock,
    ChevronRight,
    ArrowUpRight,
    FileText,
    Activity,
    Zap,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const { stats, markComplete, isCompleted } = useUserStats();
    const { data: articles } = useArticles();

    const bookmarkedArticles = articles?.filter(a => stats.bookmarks.includes(a.slug)) || [];
    const completedArticlesData = articles?.filter(a => stats.completedArticles.includes(a.slug)) || [];
    const recentActivity = articles?.filter(a => stats.history.includes(a.slug)) || [];

    const progressValue = (stats.completedArticles.length / (articles?.length || 100)) * 100;

    return (
        <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 min-h-screen">
            {/* Header / Hero Section */}
            <header className="flex flex-col md:flex-row items-center gap-12 mb-20">
                <div className="relative group">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-2xl shadow-primary/20 rotate-3 group-hover:rotate-0 transition-all duration-500 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ayush" alt="Profile" className="w-full h-full object-cover p-3 sm:p-4" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-background border-4 border-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-xl">
                        <Award className="w-6 h-6" />
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-4">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4">
                        <h1 className="text-3xl sm:text-5xl font-black tracking-tighter">Ayush <span className="text-primary italic">Mishra</span></h1>
                        <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-lg">Senior Architect</span>
                    </div>
                    <p className="text-base md:text-lg text-muted-foreground font-medium max-w-xl leading-relaxed">
                        Mastering the blueprints of high-scale systems. Specialized in Distributed Persistence and Go Internal Architecture.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm font-bold">{stats.completedArticles.length} Hubs Mastered</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-bold">Top 2% Knowledge Rank</span>
                        </div>
                    </div>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                    <button className="w-full px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                        <Settings className="w-4 h-4" /> Edit Profile Configuration
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Stats & Progress */}
                <div className="lg:col-span-4 space-y-8">
                    <section className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] glass-morphism border border-white/5 space-y-6 md:space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="font-black text-[10px] md:text-sm uppercase tracking-widest text-muted-foreground">Progression Logic</h3>
                            <div className="text-primary font-black text-base md:text-lg">{Math.round(progressValue)}%</div>
                        </div>

                        <div className="space-y-6">
                            <div className="h-3 md:h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressValue}%` }}
                                    className="h-full bg-primary shadow-glow shadow-primary/40 rounded-full"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase mb-1">Articles</div>
                                    <div className="text-lg md:text-xl font-black">{stats.completedArticles.length} / {articles?.length || 0}</div>
                                </div>
                                <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5">
                                    <div className="text-[9px] md:text-[10px] font-black text-muted-foreground uppercase mb-1">Badges</div>
                                    <div className="text-lg md:text-xl font-black">{Math.floor(stats.completedArticles.length / 5)}</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="p-8 rounded-[2.5rem] bg-primary/[0.03] border border-primary/10 space-y-6">
                        <div className="flex items-center gap-3 text-primary">
                            <Zap className="w-5 h-5" />
                            <h3 className="font-black text-xs uppercase tracking-widest">Mastery Milestone</h3>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                            {stats.completedArticles.length < 5
                                ? "Complete 5 more architectural blueprints to unlock the 'Consistency Specialist' badge."
                                : "You've unlocked the core foundations. Next: Senior Distritbuted Specialist."}
                        </p>
                        <Link href="/learn" className="w-full py-4 bg-primary text-background rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-xl shadow-primary/20">
                            Continue Learning <ArrowRight className="w-4 h-4" />
                        </Link>
                    </section>

                    <section className="p-8 rounded-[2.5rem] glass-morphism border border-white/5 space-y-6">
                        <h3 className="font-black text-xs uppercase tracking-widest text-muted-foreground">Recent Activity</h3>
                        <div className="space-y-4">
                            {recentActivity.length === 0 ? (
                                <p className="text-xs text-muted-foreground italic">No recent history...</p>
                            ) : (
                                recentActivity.slice(0, 5).map(article => (
                                    <Link key={article.id} href={`/learn/${article.slug}`} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            <span className="text-xs font-bold truncate max-w-[140px] group-hover:text-primary transition-colors">{article.title}</span>
                                        </div>
                                        <Clock className="w-3 h-3 text-muted-foreground" />
                                    </Link>
                                ))
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Column: Bookmarks & Completed */}
                <div className="lg:col-span-8 space-y-12">
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <Bookmark className="w-6 h-6 text-primary" />
                                <h2 className="text-3xl font-black tracking-tight leading-none">Saved <span className="text-primary italic">Blueprints</span></h2>
                            </div>
                            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">{bookmarkedArticles.length} Items</span>
                        </div>

                        {bookmarkedArticles.length === 0 ? (
                            <div className="p-20 rounded-[3rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center">
                                <Bookmark className="w-12 h-12 text-muted-foreground opacity-20 mb-6" />
                                <h4 className="text-xl font-black mb-2 opacity-50">Nothing saved yet.</h4>
                                <p className="text-sm text-muted-foreground max-w-xs font-medium">Bookmark critical patterns to access them instantly from your dashboard.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {bookmarkedArticles.map(article => (
                                    <Link key={article.id} href={`/learn/${article.slug}`}>
                                        <div className="p-8 rounded-[2.5rem] glass-morphism border border-white/5 hover:border-primary/30 hover:bg-white/[0.02] transition-all group">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[10px] font-black uppercase text-primary tracking-widest">{article.category}</span>
                                                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                            </div>
                                            <h4 className="text-lg font-black tracking-tight mb-2 group-hover:text-primary transition-colors">{article.title}</h4>
                                            <p className="text-xs text-muted-foreground font-medium line-clamp-2 leading-relaxed">{article.description}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                <h2 className="text-3xl font-black tracking-tight leading-none">Mastered <span className="text-emerald-400 italic">Core</span></h2>
                            </div>
                            <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">{completedArticlesData.length} Topics</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {completedArticlesData.map(article => (
                                <Link key={article.id} href={`/learn/${article.slug}`}>
                                    <div className="p-6 rounded-[2rem] bg-emerald-500/[0.03] border border-emerald-500/10 flex items-center gap-5 group">
                                        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-black group-hover:text-emerald-400 transition-colors">{article.title}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Blueprint Mastered</span>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-20 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
