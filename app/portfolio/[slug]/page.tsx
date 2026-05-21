import { API_URL } from "@/lib/config";
import TeamMemberClient from "./TeamMemberClient";

export async function generateStaticParams() {
  const fallback = [{ slug: "default" }];

  try {
    const res = await fetch(`${API_URL}/api/teams/members`, {
      cache: "no-store",
    });
    if (!res.ok) return fallback;
    const members = await res.json();
    if (!Array.isArray(members) || members.length === 0) return fallback;
    const slugs = members
      .filter((m: { slug?: string }) => m.slug)
      .map((m: { slug: string }) => ({ slug: m.slug }));
    const hasDefault = slugs.some((s) => s.slug === "default");
    return hasDefault ? slugs : [...slugs, ...fallback];
  } catch {
    return fallback;
  }
}

export default function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <TeamMemberClient params={params} />;
}
