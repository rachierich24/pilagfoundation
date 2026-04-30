"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Drives", href: "/admin/drives", icon: "🌱" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "💬" },
  { label: "Donations", href: "/admin/donations", icon: "💰" },
  { label: "Blog", href: "/admin/blog", icon: "📝" },
];

interface Stats {
  drives: number;
  testimonials: number;
  donations: number;
  totalRaised: number;
  blogPosts: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({ drives: 0, testimonials: 0, donations: 0, totalRaised: 0, blogPosts: 0 });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    Promise.all([
      fetch("/api/drives").then(r => r.json()),
      fetch("/api/testimonials").then(r => r.json()),
      fetch("/api/donations").then(r => r.json()),
      fetch("/api/blog").then(r => r.json()),
    ]).then(([drives, testimonials, donations, posts]: any[]) => {
      setStats({
        drives: drives.length,
        testimonials: testimonials.length,
        donations: donations.length,
        totalRaised: donations.reduce((s: number, d: { amount: number }) => s + d.amount, 0),
        blogPosts: posts.length,
      });
    });
  }, [status]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0A0F0D", color: "#FFF" }}>
        Loading...
      </div>
    );
  }

  const STAT_CARDS = [
    { label: "Active Drives", value: stats.drives, icon: "🌱", color: "#22c55e" },
    { label: "Testimonials", value: stats.testimonials, icon: "💬", color: "#3b82f6" },
    { label: "Total Donations", value: stats.donations, icon: "💰", color: "#f59e0b" },
    { label: "Total Raised", value: `₹${stats.totalRaised.toLocaleString()}`, icon: "📈", color: "#ef4444" },
    { label: "Blog Posts", value: stats.blogPosts, icon: "📝", color: "#8b5cf6" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0F0D", color: "#F9F6F0" }}>
      {/* Sidebar */}
      <aside style={{
        width: "260px", background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)",
        padding: "2rem 0", display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "0 1.5rem", marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "8px",
              background: "linear-gradient(135deg, #1A3626, #22c55e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", fontWeight: 900, color: "#FFF",
            }}>P</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>PILAG Admin</div>
              <div style={{ fontSize: "0.7rem", opacity: 0.4 }}>{session?.user?.email}</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const pathname = usePathname();
            return (
            <Link
              key={item.href} href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.85rem 1.5rem", color: "rgba(255,255,255,0.7)",
                textDecoration: "none", fontSize: "0.9rem", fontWeight: 500,
                transition: "all 0.2s",
                background: pathname === item.href ? "rgba(34,197,94,0.1)" : "transparent",
                borderLeft: pathname === item.href ? "3px solid #22c55e" : "3px solid transparent",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )})}
        </nav>

        <div style={{ padding: "0 1.5rem" }}>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            style={{
              width: "100%", padding: "0.75rem", background: "rgba(239,68,68,0.1)",
              color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px",
              cursor: "pointer", fontSize: "0.85rem", fontWeight: 600,
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2.5rem 3rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>
            Dashboard
          </h1>
          <p style={{ opacity: 0.5, fontSize: "0.9rem", marginTop: "0.5rem" }}>
            Welcome back, {session?.user?.name || "Admin"}
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem",
        }}>
          {STAT_CARDS.map((card) => (
            <div key={card.label} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px", padding: "1.5rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{card.label}</span>
                <span style={{ fontSize: "1.5rem" }}>{card.icon}</span>
              </div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: card.color }}>{card.value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {NAV_ITEMS.filter(n => n.href !== "/admin").map(item => (
            <Link key={item.href} href={item.href} style={{
              display: "flex", alignItems: "center", gap: "1rem",
              padding: "1.5rem", background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px",
              textDecoration: "none", color: "#F9F6F0", transition: "all 0.3s",
            }}>
              <span style={{ fontSize: "2rem" }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>Manage {item.label}</div>
                <div style={{ fontSize: "0.8rem", opacity: 0.4, marginTop: "0.25rem" }}>View, create, edit & delete</div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
