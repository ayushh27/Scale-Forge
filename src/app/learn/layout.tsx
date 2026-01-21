"use client";

import { motion } from "framer-motion";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pt-20"
        >
            {children}
        </motion.div>
    );
}
