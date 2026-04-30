"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Drive {
  id: string; title: string; location: string; date: string;
  impact: string; imageUrl: string; isActive: boolean;
}

export default function DrivesAdmin() {
  const { status } = useSession();
  const router = useRouter();
  const [drives, setDrives] = useState<Drive[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", location: "", date: "", impact: "", imageUrl: "" });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  const loadDrives = () => fetch("/api/drives").then(r => r.json()).then((d: any) => setDrives(d));

  useEffect(() => { if (status === "authenticated") loadDrives(); }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await fetch(`/api/drives/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/drives", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setForm({ title: "", location: "", date: "", impact: "", imageUrl: "" });
    setShowForm(false);
    setEditId(null);
    loadDrives();
  };

  const handleEdit = (d: Drive) => {
    setForm({ title: d.title, location: d.location, date: d.date, impact: d.impact, imageUrl: d.imageUrl });
    setEditId(d.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    // @ts-ignore
    if (!window.confirm("Delete this drive?")) return;
    await fetch(`/api/drives/${id}`, { method: "DELETE" });
    loadDrives();
  };

  if (status !== "authenticated") return null;

  const inputStyle = {
    width: "100%", padding: "0.8rem 1rem", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#FFF", fontSize: "0.9rem",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F0D", color: "#F9F6F0", padding: "2.5rem 3rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <Link href="/admin" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem" }}>← Back to Dashboard</Link>
          <h1 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0 0" }}>🌱 Manage Drives</h1>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ title: "", location: "", date: "", impact: "", imageUrl: "" }); }}
          style={{ padding: "0.75rem 1.5rem", background: "#22c55e", color: "#000", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>
          {showForm ? "Cancel" : "+ New Drive"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.4rem", textTransform: "uppercase", fontWeight: 600 }}>Title</label>
              <input value={form.title} onChange={e => setForm({...form, title: (e.target as any).value})} required style={inputStyle} placeholder="DTU Plantation Drive" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.4rem", textTransform: "uppercase", fontWeight: 600 }}>Location</label>
              <input value={form.location} onChange={e => setForm({...form, location: (e.target as any).value})} required style={inputStyle} placeholder="Delhi" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.4rem", textTransform: "uppercase", fontWeight: 600 }}>Date</label>
              <input value={form.date} onChange={e => setForm({...form, date: (e.target as any).value})} required style={inputStyle} placeholder="April 5, 2026" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.4rem", textTransform: "uppercase", fontWeight: 600 }}>Impact</label>
              <input value={form.impact} onChange={e => setForm({...form, impact: (e.target as any).value})} required style={inputStyle} placeholder="300 Trees Planned" />
            </div>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.4rem", textTransform: "uppercase", fontWeight: 600 }}>Image URL</label>
            <input value={form.imageUrl} onChange={e => setForm({...form, imageUrl: (e.target as any).value})} required style={inputStyle} placeholder="https://images.unsplash.com/..." />
          </div>
          <button type="submit" style={{ marginTop: "1.5rem", padding: "0.75rem 2rem", background: "#22c55e", color: "#000", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>
            {editId ? "Update Drive" : "Create Drive"}
          </button>
        </form>
      )}

      <div style={{ display: "grid", gap: "1rem" }}>
        {drives.map(d => (
          <div key={d.id} style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.25rem 1.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
            <img src={d.imageUrl} alt={d.title} style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "8px" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>{d.title}</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.5, marginTop: "0.25rem" }}>📍 {d.location} · 📅 {d.date} · 🌱 {d.impact}</div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => handleEdit(d)} style={{ padding: "0.5rem 1rem", background: "rgba(59,130,246,0.1)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem" }}>Edit</button>
              <button onClick={() => handleDelete(d.id)} style={{ padding: "0.5rem 1rem", background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem" }}>Delete</button>
            </div>
          </div>
        ))}
        {drives.length === 0 && <p style={{ opacity: 0.4, textAlign: "center", padding: "3rem" }}>No drives yet. Click "+ New Drive" to create one.</p>}
      </div>
    </div>
  );
}
