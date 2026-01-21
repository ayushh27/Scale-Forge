"use client";

import { useParams } from "next/navigation";
import { HUB_REGISTRY } from "@/data/hubs";
import DomainHub from "@/components/DomainHub";
import { notFound } from "next/navigation";

export default function HubPage() {
    const params = useParams();
    const slug = params.slug as string;

    const hubData = HUB_REGISTRY[slug];

    if (!hubData) {
        return notFound();
    }

    return <DomainHub data={hubData} />;
}
