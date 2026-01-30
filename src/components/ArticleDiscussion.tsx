"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, MessageSquare, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
    id: string;
    author: string;
    avatar: string; // url or initial
    content: string;
    likes: number;
    timestamp: string;
    role?: "Admin" | "Mod" | "User";
}

const MOCK_COMMENTS: Comment[] = [
    {
        id: "c1",
        author: "Sourabh",
        avatar: "S",
        content: "The visualization of the L1 cache lines really clicked for me. I finally understand why linked lists can be slower despite O(n).",
        likes: 24,
        timestamp: "2h ago",
        role: "User"
    },
    {
        id: "c2",
        author: "Akshat Singh",
        avatar: "D",
        content: "Would be great to see a comparison with Rust's Vec<T> memory layout in the future!",
        likes: 8,
        timestamp: "5h ago",
        role: "User"
    }
];

export function ArticleDiscussion() {
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
    const [newComment, setNewComment] = useState("");
    const [isHelpful, setIsHelpful] = useState<boolean | null>(null);

    const handlePost = () => {
        if (!newComment.trim()) return;
        setComments([
            {
                id: Math.random().toString(),
                author: "You",
                avatar: "Y",
                content: newComment,
                likes: 0,
                timestamp: "Just now",
                role: "User"
            },
            ...comments
        ]);
        setNewComment("");
    };

    return (
        <section className="space-y-12">
            {/* Feedback Section */}
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h4 className="text-sm font-black uppercase tracking-widest mb-1">Was this useful?</h4>
                    <p className="text-xs text-muted-foreground font-medium">Your feedback shapes future blueprints.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsHelpful(true)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs transition-all",
                            isHelpful === true ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/50" : "bg-white/5 hover:bg-white/10 text-muted-foreground"
                        )}
                    >
                        <ThumbsUp className="w-4 h-4" /> Yes
                    </button>
                    <button
                        onClick={() => setIsHelpful(false)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs transition-all",
                            isHelpful === false ? "bg-rose-500/20 text-rose-500 border border-rose-500/50" : "bg-white/5 hover:bg-white/10 text-muted-foreground"
                        )}
                    >
                        <ThumbsDown className="w-4 h-4" /> No
                    </button>
                </div>
            </div>

            {/* Discussion Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black tracking-tight">Community Insights</h3>
                </div>
                <span className="text-xs font-bold text-muted-foreground">{comments.length} Comments</span>
            </div>

            {/* Comment Box */}
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-3">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add to the discussion..."
                        className="w-full bg-muted/20 border border-white/5 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none h-24"
                    />
                    <div className="flex justify-end">
                        <button
                            onClick={handlePost}
                            disabled={!newComment.trim()}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-background text-xs font-black uppercase tracking-widest hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Send className="w-3 h-3" /> Post
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                <AnimatePresence>
                    {comments.map((comment) => (
                        <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            layout
                            className="flex gap-4 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/5 flex items-center justify-center text-sm font-bold text-muted-foreground shrink-0">
                                {comment.avatar}
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-foreground">{comment.author}</span>
                                    {comment.role === 'Admin' && <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-primary/20 text-primary">Admin</span>}
                                    <span className="w-1 h-1 rounded-full bg-white/10" />
                                    <span className="text-xs text-muted-foreground font-medium">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-3xl">
                                    {comment.content}
                                </p>
                                <div className="flex items-center gap-4 pt-1">
                                    <button className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                                        <ThumbsUp className="w-3 h-3" /> {comment.likes}
                                    </button>
                                    <button className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                                        Reply
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}
