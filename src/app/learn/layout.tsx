"use client";

import { PageLayout } from "@/components/layout";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
    return (
        <PageLayout mobileBottomPadding>
            {children}
        </PageLayout>
    );
}

