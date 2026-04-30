"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Post {
  id: string; title: string; slug: string; excerpt: string; content: string; coverImage: string; isPublished: boolean; createdAt: string;
}

export default function BlogAdmin() {
  const { status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", coverImage: "" });

  useEffect(() => { if (status === "unauthenticated") router.push("/admin/login"); }, [status, router]);
  const load = () => fetch("/api/blog").then(r => r.json()).then((data: any) => setPosts(data));
  useEffect(() => { if (status === "authenticated") load(); }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editSlug) {
      await fetch(`/api/blog/${editSlug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setForm({ title: "", excerpt: "", content: "", coverImage: "" });
    setShowForm(false); setEditSlug(null); load();
  };

  const handleEdit = (p: Post) => {
    setForm({ title: p.title, excerpt: p.excerpt, content: p.content, coverImage: p.coverImage });
    setEditSlug(p.slug); setShowForm(true);
  };

  const handleDelete = async (slug: string) => {
    // @ts-ignore
    if (!window.confirm("Delete this post?")) return;
    await fetch(`/api/blog/${slug}`, { method: "DELETE" }); load();
  };

  const togglePublish = async (p: Post) => {
    await fetch(`/api/blog/${p.slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isPublished: !p.isPublished }) }); load();
  };

  if (status !== "authenticated") return null;

  const inputStyle = { width: "100%", padding: "0.8rem 1rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#FFF", fontSize: "0.9rem" };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F0D", color: "#F9F6F0", padding: "2.5rem 3rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <Link href="/admin" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem" }}>← Back to Dashboard</Link>
          <h1 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0 0" }}>📝 Manage Blog</h1>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditSlug(null); setForm({ title: "", excerpt: "", content: "", coverImage: "" }); }}
          style={{ padding: "0.75rem 1.5rem", background: "#8b5cf6", color: "#FFF", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>
          {showForm ? "Cancel" : "+ New Post"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.4rem", textTransform: "uppercase", fontWeight: 600 }}>Title</label>
            <input value={form.title} onChange={e => setForm({...form, title: (e.target as any).value})} required style={inputStyle} placeholder="New Climate Ruling in Jharkhand" />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.4rem", textTransform: "uppercase", fontWeight: 600 }}>Excerpt</label>
            <input value={form.excerpt} onChange={e => setForm({...form, excerpt: (e.target as any).value})} required style={inputStyle} placeholder="Brief summary..." />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.4rem", textTransform: "uppercase", fontWeight: 600 }}>Content (Markdown)</label>
            <textarea value={form.content} onChange={e => setForm({...form, content: (e.target as any).value})} required rows={10}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace" }} placeholder="Write your blog post content here..." />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.4rem", textTransform: "uppercase", fontWeight: 600 }}>Cover Image URL</label>
            <input value={form.coverImage} onChange={e => setForm({...form, coverImage: (e.target as any).value})} style={inputStyle} placeholder="https://images.unsplash.com/..." />
          </div>
          <button type="submit" style={{ padding: "0.75rem 2rem", background: "#8b5cf6", color: "#FFF", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>
            {editSlug ? "Update Post" : "Create Post"}
          </button>
        </form>
      )}

      <div style={{ display: "grid", gap: "1rem" }}>
        {posts.map(p => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.25rem 1.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
            {p.coverImage && <img src={p.coverImage} alt={p.title} style={{ width: "100px", height: "65px", objectFit: "cover", borderRadius: "8px" }} />}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>{p.title}</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.5, marginTop: "0.25rem" }}>{p.excerpt}</div>
              <div style={{ fontSize: "0.75rem", opacity: 0.3, marginTop: "0.25rem" }}>{new Date(p.createdAt).toLocaleDateString()}</div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => togglePublish(p)} style={{ padding: "0.4rem 0.8rem", background: p.isPublished ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.05)", color: p.isPublished ? "#22c55e" : "#999", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem" }}>
                {p.isPublished ? "Published" : "Draft"}
              </button>
              <button onClick={() => handleEdit(p)} style={{ padding: "0.4rem 0.8rem", background: "rgba(139,92,246,0.1)", color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem" }}>Edit</button>
              <button onClick={() => handleDelete(p.slug)} style={{ padding: "0.4rem 0.8rem", background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem" }}>Delete</button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p style={{ opacity: 0.4, textAlign: "center", padding: "3rem" }}>No blog posts yet.</p>}
      </div>
    </div>
  );
}
