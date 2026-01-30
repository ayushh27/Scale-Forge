"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    BookOpen,
    Search,
    Menu,
    ChevronDown,
    User,
    Bookmark,
    History,
    Github,
    Monitor,
    Code2,
    Database,
    Terminal,
    Shield,
    LayoutGrid,
    Zap,
    Globe,
    Hash,
    Cpu,
    ArrowRight,
    TrendingUp,
    Award,
    Laptop,
    GitBranch
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useUserStats } from "@/hooks/useUserStats";

// --- Types ---
type SubCategory = {
    label: string;
    href: string;
    description: string;
};

type MegaMenuCategory = {
    label: string;
    href: string;
    items: {
        title: string;
        icon: any;
        links: SubCategory[];
    }[];
};

// --- Data ---
const MEGA_MENU_DATA: Record<string, MegaMenuCategory> = {
    "DSA": {
        label: "DSA",
        href: "/hub/dsa",
        items: [
            {
                title: "Fundamentals",
                icon: Hash,
                links: [
                    { label: "Arrays Mastery", href: "/learn/mastering-arrays-and-memory", description: "Contiguous memory & optimization" },
                    { label: "Strings & Patterns", href: "/learn/strings-data-structure-mastery", description: "Immutability & KMP logic" },
                    { label: "Linked Lists", href: "/learn/linked-lists-production-implementation", description: "Recursive node patterns" },
                    { label: "Stacks & Queues", href: "/learn/stacks-and-queues-architectural-patterns", description: "Linear LIFO/FIFO logic" },
                ]
            },
            {
                title: "Advanced",
                icon: Code2,
                links: [
                    { label: "0/1 Knapsack", href: "/learn/exhaustive-01-knapsack-guide", description: "DP decision trees" },
                    { label: "Graph Theory", href: "/learn/mastering-graphs-and-network-topology", description: "DFS, BFS & Shortest Paths" },
                    { label: "Trees & BST", href: "/learn/mastering-trees-and-hierarchical-data", description: "Hierarchical data mastery" },
                ]
            }
        ]
    },
    "System Design": {
        label: "System Design",
        href: "/hub/system-design",
        items: [
            {
                title: "Scale Core",
                icon: LayoutGrid,
                links: [
                    { label: "Load Balancers", href: "/learn/load-balancing-strategies", description: "Traffic management protocols" },
                    { label: "URL Shortener", href: "/learn/designing-a-scalable-url-shortener", description: "Edge caching & ID systems" },
                    { label: "Database Sharding", href: "/learn/database-sharding-explained", description: "Vertical vs Horizontal scaling" },
                ]
            },
            {
                title: "Infrastructure",
                icon: Zap,
                links: [
                    { label: "Caching Patterns", href: "/learn/caching-patterns-for-microservices", description: "LRU, LFU & Write-Through" },
                    { label: "Message Queues", href: "/learn?cat=System%20Design", description: "Async event architectures" },
                    { label: "API Gateways", href: "/learn?cat=System%20Design", description: "Request transformation" },
                ]
            }
        ]
    },
    "Backend": {
        label: "Backend",
        href: "/hub/backend",
        items: [
            {
                title: "Security & API",
                icon: Shield,
                links: [
                    { label: "JWT & OAuth2", href: "/learn/authentication-and-authorization-jwt-oauth2-deep-dive", description: "Stateless security & rotation" },
                    { label: "REST Design", href: "/learn/restful-api-design-and-versioning-strategies", description: "Idempotency & Versioning" },
                    { label: "Message Queues", href: "/learn/background-jobs-and-message-queues-patterns", description: "Kafka & RabbitMQ architecture" },
                ]
            },
            {
                title: "Core Services",
                icon: Database,
                links: [
                    { label: "Postgres & MySQL", href: "/learn/postgresql-and-mysql-internals-and-optimization", description: "B-Tree vs MVCC index" },
                    { label: "NoSQL Patterns", href: "/learn/mongodb-and-redis-nosql-architecture-patterns", description: "Distributed caching" },
                    { label: "DB Scaling", href: "/learn/database-replication-sharding-and-consistency", description: "Sharding & Consistency" },
                ]
            }
        ]
    },
    "Languages": {
        label: "Programming",
        href: "/hub/languages",
        items: [
            {
                title: "Modern Core",
                icon: Terminal,
                links: [
                    { label: "Go (Golang)", href: "/learn/go-syntax-and-fundamentals", description: "Gopher production manual" },
                    { label: "TypeScript", href: "/learn/advanced-typescript-patterns", description: "Type-safe architecture" },
                    { label: "Python", href: "/learn/python-fundamentals-and-dynamic-typing", description: "AsyncIO & GIL internals" },
                ]
            },
            {
                title: "Advanced",
                icon: Cpu,
                links: [
                    { label: "Go Concurrency", href: "/learn/mastering-concurrency-in-go", description: "Mastering goroutines" },
                    { label: "C++ Systems", href: "/learn/cpp-fundamentals-and-memory-model", description: "Memory layout & RAII" },
                    { label: "Java Mastery", href: "/learn/java-object-oriented-programming-mastery", description: "JVM & GC Tuning" },
                ]
            }
        ]
    },
    "DevOps": {
        label: "Infrastructure",
        href: "/hub/devops",
        items: [
            {
                title: "Cloud Native",
                icon: Globe,
                links: [
                    { label: "Docker & K8s", href: "/learn/docker-kubernetes-and-container-orchestration", description: "Containers at the OS level" },
                    { label: "Observability", href: "/learn/monitoring-logging-and-distributed-tracing", description: "SRE observability stack" },
                    { label: "Resilience", href: "/learn/fault-tolerance-retries-and-circuit-breakers", description: "Retries & Circuit Breakers" },
                ]
            }
        ]
    },
    "Case Studies": {
        label: "Real-World",
        href: "/hub/case-studies",
        items: [
            {
                title: "Engineering Wins",
                icon: Laptop,
                links: [
                    { label: "Uber Scaling", href: "/learn/case-study-uber-schemaless", description: "Moving to Schemaless" },
                    { label: "Discord Persistence", href: "/learn/case-study-discord-persistence", description: "Cassandra migration" },
                    { label: "Netflix Chaos", href: "/learn/case-study-netflix-chaos", description: "Resilience engineering" },
                ]
            }
        ]
    },
    "Comparisons": {
        label: "Debates",
        href: "/hub/comparisons",
        items: [
            {
                title: "Tech Showdowns",
                icon: GitBranch,
                links: [
                    { label: "SQL vs NoSQL", href: "/learn/comparison-sql-vs-nosql", description: "Tabular vs Document" },
                    { label: "Kafka vs RabbitMQ", href: "/learn/comparison-kafka-vs-rabbitmq", description: "Stream vs Queue" },
                    { label: "Redis vs Memcached", href: "/learn/comparison-redis-vs-memcached", description: "In-memory tradeoffs" },
                ]
            }
        ]
    },
    "Prep": {
        label: "Interview",
        href: "/hub/interview-prep",
        items: [
            {
                title: "The Forge",
                icon: Shield,
                links: [
                    { label: "Design Blueprint", href: "/learn/interview-system-design-blueprint", description: "Architectural framework" },
                    { label: "Behavioral", href: "/learn/interview-behavioral-mastery", description: "STAR method mastery" },
                    { label: "Soft Skills", href: "/learn/interview-senior-level-delivery", description: "Senior communication" },
                ]
            }
        ]
    }
};

const EXTRA_LINKS = [
    { label: "Roadmaps", href: "/roadmaps" },
    { label: "Community", href: "/community" }
];

// --- Components ---
const MobileNavSection = ({
    title,
    data,
    onClose
}: {
    title: string;
    data: MegaMenuCategory;
    onClose: () => void
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-1 sm:space-y-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-white/5 transition-all group"
            >
                <span className="font-black text-xs sm:text-sm uppercase tracking-wider sm:tracking-widest text-white group-hover:text-primary transition-colors">{title}</span>
                <ChevronDown className={cn("w-4 h-4 text-white/60 transition-transform shrink-0", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-3 sm:pl-4 border-l border-white/5 ml-2"
                    >
                        <div className="grid gap-0.5 sm:gap-1 pb-3 sm:pb-4">
                            <Link
                                href={data.href}
                                onClick={onClose}
                                className="p-2 sm:p-3 text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest text-primary flex items-center gap-2"
                            >
                                <ArrowRight className="w-3 h-3 shrink-0" /> Start Path
                            </Link>
                            {data.items.flatMap(item => item.links).map(link => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={onClose}
                                    className="p-2 sm:p-3 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg sm:rounded-xl transition-all truncate"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Navbar() {
    const pathname = usePathname();
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { stats } = useUserStats();
    const navRef = useRef<HTMLDivElement>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Handle delayed menu close - gives user time to move to mega menu
    const handleMenuClose = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 300); // 300ms delay before closing
    };

    const handleMenuOpen = (key: string) => {
        // Cancel any pending close timeout
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setActiveMenu(key);
    };

    const cancelMenuClose = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            // Cleanup timeout on unmount
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            router.push(`/learn?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
        }
    };


    const lastViewed = stats.history[0];
    const progressPercent = Math.min(100, (stats.completedArticles.length / 50) * 100);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-[100] h-[var(--header-height)] border-b border-white/5 bg-background/60 backdrop-blur-2xl"
        >
            <div className="w-full px-4 xl:px-8 h-full flex items-center justify-between">
                <div className="flex items-center gap-2 xl:gap-8">
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
                            <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        </div>
                        <span className="font-black text-lg md:text-2xl tracking-tighter hidden sm:block">
                            ScaleForge
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav
                        onMouseLeave={handleMenuClose}
                        onMouseEnter={cancelMenuClose}
                        className="hidden xl:flex items-center gap-0.5 font-bold text-[13px]"
                    >
                        {Object.keys(MEGA_MENU_DATA).map((key, index) => (
                            <div
                                key={key}
                                onMouseEnter={() => handleMenuOpen(key)}
                                className={cn(
                                    "relative h-[var(--header-height)] items-center",
                                    index > 4 ? "hidden 2xl:flex" : "flex"
                                )}
                            >
                                <button
                                    className={cn(
                                        "px-2.5 py-2 rounded-xl transition-all flex items-center gap-1.5 hover:bg-white/5 whitespace-nowrap",
                                        activeMenu === key ? "text-primary bg-white/5" : "text-muted-foreground"
                                    )}
                                >
                                    {key} <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeMenu === key && "rotate-180")} />
                                </button>
                            </div>
                        ))}

                        <div className="w-[1px] h-4 bg-white/10 mx-2" />

                        {EXTRA_LINKS.map(link => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-white/5 whitespace-nowrap"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-1 md:gap-2">
                    {/* Progress Pill */}
                    <div className="hidden 3xl:flex items-center gap-3 px-4 py-2 bg-muted/40 border border-white/5 rounded-2xl">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Progression</span>
                            <span className="text-xs font-black text-primary">{stats.completedArticles.length} Topics</span>
                        </div>
                        <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${progressPercent}%` }} />
                        </div>
                    </div>

                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="pl-11 pr-4 py-2.5 bg-muted/40 border border-white/5 rounded-2xl text-[13px] w-28 xl:w-32 focus:w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
                        />
                    </div>

                    <div className="flex items-center gap-1 md:gap-1.5 p-1 bg-muted/30 rounded-2xl border border-white/5">
                        <Link href="/bookmarks" className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-xl hover:bg-white/5 text-muted-foreground relative">
                            <Bookmark className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            {stats.bookmarks.length > 0 && (
                                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full border-2 border-background" />
                            )}
                        </Link>
                    </div>

                    <Link href="/profile" className="hidden sm:flex w-11 h-11 bg-foreground text-background rounded-2xl items-center justify-center shadow-lg hover:opacity-90">
                        <User className="w-5 h-5" />
                    </Link>

                    {/* Mobile Menu Trigger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="xl:hidden w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-2xl bg-muted/40 border border-white/5 text-foreground"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {activeMenu && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, translateY: -10, rotateX: -2 }}
                        animate={{ opacity: 1, scale: 1, translateY: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.98, translateY: -10, rotateX: -2 }}
                        onMouseLeave={handleMenuClose}
                        onMouseEnter={cancelMenuClose}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-3xl border-b border-white/5 shadow-3xl overflow-hidden perspective-2000"
                    >
                        <div className="w-full px-12 xl:px-20 py-16 grid grid-cols-12 gap-12 text-foreground preserve-3d">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="col-span-3 border-r border-white/5 pr-12"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                                    {MEGA_MENU_DATA[activeMenu].label} Mastery
                                </div>
                                <h1 className="text-3xl sm:text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none group">
                                    {MEGA_MENU_DATA[activeMenu].label} <span className="text-primary italic group-hover:pl-2 transition-all cursor-default">Hub</span>
                                </h1>
                                <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-8">
                                    {MEGA_MENU_DATA[activeMenu].href === lastViewed ? 'You were studying this!' : 'Structured paths for production-grade engineering.'}
                                </p>
                                <Link
                                    href={MEGA_MENU_DATA[activeMenu].href}
                                    className="group inline-flex items-center gap-4 text-primary font-black uppercase text-xs tracking-widest transition-all"
                                >
                                    Enter Full Hub <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all group-hover:translate-x-2"><ArrowRight className="w-5 h-5" /></div>
                                </Link>

                                {progressPercent > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-12 p-6 rounded-3xl glass-morphism border border-white/10"
                                    >
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">
                                            <TrendingUp className="w-3 h-3 text-emerald-400" />
                                            Recent Mastery High
                                        </div>
                                        <div className="text-xs font-bold text-foreground">Top 5% in {activeMenu}</div>
                                        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-3/4 rounded-full" />
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>

                            <div className="col-span-9 grid grid-cols-2 gap-x-12 gap-y-12">
                                {MEGA_MENU_DATA[activeMenu].items.map((section, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 + (idx * 0.05) }}
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-2xl glass-morphism flex items-center justify-center text-primary border border-primary/20 shadow-xl group-hover:scale-110 transition-transform">
                                                <section.icon className="w-6 h-6" />
                                            </div>
                                            <h4 className="font-black uppercase text-xs tracking-[0.25em] text-muted-foreground/50">{section.title}</h4>
                                        </div>
                                        <div className="grid gap-2">
                                            {section.links.map((link, lIdx) => (
                                                <Link
                                                    key={link.label}
                                                    href={link.href}
                                                    className="group p-5 rounded-3xl hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/5 flex items-start gap-5 hover:translate-x-2"
                                                >
                                                    <div className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary group-hover:scale-150 transition-all" />
                                                    <div>
                                                        <div className="font-black text-sm text-foreground group-hover:text-primary transition-colors">
                                                            {link.label}
                                                        </div>
                                                        <div className="text-[11px] text-muted-foreground/60 mt-0.5 font-bold uppercase tracking-tight">{link.description}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-background/90 backdrop-blur-md z-[110]"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 w-full sm:max-w-[320px] bg-background border-l border-white/5 z-[120] shadow-2xl h-[100dvh]"
                        >
                            <div className="flex flex-col h-full">
                                {/* Mobile Header - Fixed at top */}
                                <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between bg-muted/10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                            <Zap className="w-4 h-4" />
                                        </div>
                                        <span className="font-black text-sm tracking-tight uppercase">Forge Menu</span>
                                    </div>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted/40 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Scrollable Content Area */}
                                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 scrollbar-hide">
                                    {/* Search in Mobile Menu */}
                                    <div className="relative mb-4 sm:mb-6">
                                        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            placeholder="Quick Search..."
                                            className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-3 sm:py-4 bg-muted/30 border border-white/5 rounded-xl sm:rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>

                                    {/* Navigation Sections */}
                                    <div className="space-y-1">
                                        {Object.entries(MEGA_MENU_DATA).map(([key, data]) => (
                                            <MobileNavSection
                                                key={key}
                                                title={key}
                                                data={data}
                                                onClose={() => setIsMobileMenuOpen(false)}
                                            />
                                        ))}
                                    </div>

                                    {/* Extra Links */}
                                    <div className="pt-4 sm:pt-6 mt-4 border-t border-white/5 space-y-1">
                                        {EXTRA_LINKS.map(link => (
                                            <Link
                                                key={link.label}
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="p-3 sm:p-4 flex items-center justify-between rounded-xl sm:rounded-2xl hover:bg-white/5 transition-all group"
                                            >
                                                <span className="font-black text-xs sm:text-sm uppercase tracking-widest text-white group-hover:text-primary">{link.label}</span>
                                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 text-primary" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Footer - Fixed at bottom */}
                                <div className="p-4 sm:p-6 border-t border-white/5 bg-muted/10">
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-foreground text-background font-black uppercase text-[10px] tracking-[0.15em] sm:tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-transform"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-background/20 flex items-center justify-center flex-shrink-0">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="truncate">Commander Profile</span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
