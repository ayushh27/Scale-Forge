"use client";

import { motion } from "framer-motion";
import {
    CheckCircle2,
    Clock,
    AlertCircle,
    Filter,
    Search,
    MoreHorizontal,
    ArrowUpRight,
    Users,
    FileText,
    Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_REVIEWS = [
    {
        id: "REV-902",
        title: "Kafka vs RabbitMQ: Detailed Throughput Analysis",
        author: "Alex Rivera",
        status: "pending",
        date: "2h ago",
        category: "Comparison",
        priority: "High"
    },
    {
        id: "REV-901",
        title: "Uber's Migration to Schemaless - Postmortem Update",
        author: "Sarah Chen",
        status: "in-review",
        date: "5h ago",
        category: "Case Study",
        priority: "Medium"
    },
    {
        id: "REV-899",
        title: "Mastering Zero-Knowledge Proofs in Go",
        author: "Marcus Thorne",
        status: "approved",
        date: "1d ago",
        category: "Technical",
        priority: "Low"
    },
    {
        id: "REV-898",
        title: "System Design: WhatsApp Messaging Infrastructure",
        author: "Elena Petrova",
        status: "rejected",
        date: "2d ago",
        category: "Interview Prep",
        priority: "High"
    }
];

export default function ReviewerDashboard() {
    return (
        <div className="min-h-screen pt-32 pb-20 bg-background">
            <div className="container mx-auto px-6">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                                <Activity className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">Curation Core</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter leading-none">Reviewer <span className="text-primary italic">Dashboard</span></h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="Active User" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-black text-primary">
                                +12
                            </div>
                        </div>
                        <div className="h-10 w-px bg-white/10 mx-2" />
                        <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">
                            Active Session
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Active Reviews", value: "24", icon: Clock, color: "text-amber-400" },
                        { label: "Published Articles", value: "1,248", icon: FileText, color: "text-primary" },
                        { label: "Contributor Velocity", value: "+12.4%", icon: ArrowUpRight, color: "text-emerald-400" },
                        { label: "Review Efficiency", value: "98%", icon: Users, color: "text-blue-400" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl glass-morphism border border-white/5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <stat.icon className={cn("w-5 h-5", stat.color)} />
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <div className="text-3xl font-black tracking-tight">{stat.value}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Content Table */}
                <div className="rounded-[2.5rem] glass-morphism border border-white/5 overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div className="flex items-center gap-6">
                            <h3 className="font-black text-lg">Curation Queue</h3>
                            <div className="flex items-center gap-2 p-1 bg-muted/40 rounded-xl border border-white/5">
                                <button className="px-4 py-1.5 bg-primary text-background rounded-lg text-xs font-black uppercase tracking-widest">All</button>
                                <button className="px-4 py-1.5 text-muted-foreground hover:text-foreground rounded-lg text-xs font-black uppercase tracking-widest transition-colors">Pending</button>
                                <button className="px-4 py-1.5 text-muted-foreground hover:text-foreground rounded-lg text-xs font-black uppercase tracking-widest transition-colors">Approved</button>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Filter by title..."
                                    className="pl-10 pr-4 py-2.5 bg-background border border-white/5 rounded-xl text-xs w-64 focus:outline-none focus:ring-1 focus:ring-primary/40 font-bold"
                                />
                            </div>
                            <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.01]">
                                <tr className="border-b border-white/5">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">ID & Document</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Contributor</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Category</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {MOCK_REVIEWS.map((review, i) => (
                                    <tr key={review.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-primary mb-1">{review.id}</span>
                                                <span className="font-black text-sm group-hover:text-primary transition-colors">{review.title}</span>
                                                <span className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">{review.date}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.author}`} alt={review.author} />
                                                </div>
                                                <span className="font-bold text-sm text-foreground">{review.author}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                                {review.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                {review.status === "pending" && <Clock className="w-4 h-4 text-amber-400" />}
                                                {review.status === "in-review" && <Activity className="w-4 h-4 text-blue-400" />}
                                                {review.status === "approved" && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                                                {review.status === "rejected" && <AlertCircle className="w-4 h-4 text-rose-400" />}
                                                <span className={cn(
                                                    "text-[10px] font-black uppercase tracking-widest",
                                                    review.status === "pending" && "text-amber-400",
                                                    review.status === "in-review" && "text-blue-400",
                                                    review.status === "approved" && "text-emerald-400",
                                                    review.status === "rejected" && "text-rose-400"
                                                )}>
                                                    {review.status.replace("-", " ")}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <button className="p-2.5 rounded-xl hover:bg-white/5 transition-colors">
                                                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
