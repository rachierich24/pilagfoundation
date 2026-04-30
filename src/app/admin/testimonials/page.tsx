"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Testimonial {
  id: string; text: string; authorName: string; authorRole: string; authorInitials: string; isVisible: boolean;
}

export default function TestimonialsAdmin() {
  const { status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ text: "", authorName: "", authorRole: "", authorInitials: "" });

  useEffect(() => { if (status === "unauthenticated") router.push("/admin/login"); }, [status, router]);
  const load = () => fetch("/api/testimonials").then(r => r.json()).then((d: any) => setItems(d));
  useEffect(() => { if (status === "authenticated") load(); }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await fetch(`/api/testimonials/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setForm({ text: "", authorName: "", authorRole: "", authorInitials: "" });
    setShowForm(false); setEditId(null); load();
  };

  const handleEdit = (t: Testimonial) => {
    setForm({ text: t.text, authorName: t.authorName, authorRole: t.authorRole, authorInitials: t.authorInitials });
    setEditId(t.id); setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    // @ts-ignore
    if (!window.confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" }); load();
  };

  const toggleVisibility = async (t: Testimonial) => {
    await fetch(`/api/testimonials/${t.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isVisible: !t.isVisible }) }); load();
  };

  if (status !== "authenticated") return null;

  const inputStyle = { width: "100%", padding: "0.8rem 1rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#FFF", fontSize: "0.9rem" };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F0D", color: "#F9F6F0", padding: "2.5rem 3rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <Link href="/admin" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem" }}>← Back to Dashboard</Link>
          <h1 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0 0" }}>💬 Manage Testimonials</h1>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ text: "", authorName: "", authorRole: "", authorInitials: "" }); }}
          style={{ padding: "0.75rem 1.5rem", background: "#3b82f6", color: "#FFF", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>
          {showForm ? "Cancel" : "+ New Testimonial"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "2rem", marginBottom: "2rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.4rem", textTransform: "uppercase", fontWeight: 600 }}>Quote Text</label>
            <textarea value={form.text} onChange={e => setForm({...form, text: (e.target as any).value})} required rows={3}
              style={{ ...inputStyle, resize: "vertical" }} placeholder='"Pilag Foundation gave us the tools..."' />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.4rem", textTransform: "uppercase", fontWeight: 600 }}>Author Name</label>
              <input value={form.authorName} onChange={e => setForm({...form, authorName: (e.target as any).value})} required style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.4rem", textTransform: "uppercase", fontWeight: 600 }}>Role</label>
              <input value={form.authorRole} onChange={e => setForm({...form, authorRole: (e.target as any).value})} required style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.4rem", textTransform: "uppercase", fontWeight: 600 }}>Initials</label>
              <input value={form.authorInitials} onChange={e => setForm({...form, authorInitials: (e.target as any).value})} required style={inputStyle} placeholder="AM" maxLength={3} />
            </div>
          </div>
          <button type="submit" style={{ marginTop: "1.5rem", padding: "0.75rem 2rem", background: "#3b82f6", color: "#FFF", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}>
            {editId ? "Update" : "Create"}
          </button>
        </form>
      )}

      <div style={{ display: "grid", gap: "1rem" }}>
        {items.map(t => (
          <div key={t.id} style={{ padding: "1.5rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", opacity: t.isVisible ? 1 : 0.4 }}>
            <p style={{ fontSize: "1rem", lineHeight: 1.6, marginBottom: "1rem" }}>"{t.text}"</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 700 }}>{t.authorInitials}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{t.authorName}</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.5 }}>{t.authorRole}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => toggleVisibility(t)} style={{ padding: "0.4rem 0.8rem", background: t.isVisible ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.05)", color: t.isVisible ? "#22c55e" : "#999", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem" }}>
                  {t.isVisible ? "Visible" : "Hidden"}
                </button>
                <button onClick={() => handleEdit(t)} style={{ padding: "0.4rem 0.8rem", background: "rgba(59,130,246,0.1)", color: "#3b82f6", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem" }}>Edit</button>
                <button onClick={() => handleDelete(t.id)} style={{ padding: "0.4rem 0.8rem", background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem" }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{ opacity: 0.4, textAlign: "center", padding: "3rem" }}>No testimonials yet.</p>}
      </div>
    </div>
  );
}
