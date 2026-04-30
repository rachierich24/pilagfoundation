"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Donation {
  id: string; donorName: string; donorEmail: string; amount: number; fundType: string; status: string; createdAt: string;
}

export default function DonationsAdmin() {
  const { status } = useSession();
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => { if (status === "unauthenticated") router.push("/admin/login"); }, [status, router]);
  useEffect(() => { if (status === "authenticated") fetch("/api/donations").then(r => r.json()).then((d: any) => setDonations(d)); }, [status]);

  if (status !== "authenticated") return null;

  const total = donations.reduce((s, d) => s + d.amount, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F0D", color: "#F9F6F0", padding: "2.5rem 3rem" }}>
      <Link href="/admin" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem" }}>← Back to Dashboard</Link>
      <h1 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0 0" }}>💰 Donations</h1>
      <p style={{ opacity: 0.5, marginBottom: "2rem" }}>Total raised: <strong style={{ color: "#22c55e", fontSize: "1.2rem" }}>₹{total.toLocaleString()}</strong></p>

      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)" }}>
              {["Donor", "Email", "Amount", "Fund", "Status", "Date"].map(h => (
                <th key={h} style={{ padding: "1rem 1.25rem", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.5, fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {donations.map(d => (
              <tr key={d.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "1rem 1.25rem", fontWeight: 600 }}>{d.donorName}</td>
                <td style={{ padding: "1rem 1.25rem", opacity: 0.6, fontSize: "0.9rem" }}>{d.donorEmail}</td>
                <td style={{ padding: "1rem 1.25rem", color: "#22c55e", fontWeight: 700 }}>₹{d.amount}</td>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <span style={{ padding: "0.3rem 0.7rem", background: d.fundType === "legal" ? "rgba(139,92,246,0.15)" : "rgba(59,130,246,0.15)", color: d.fundType === "legal" ? "#8b5cf6" : "#3b82f6", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600 }}>
                    {d.fundType === "legal" ? "Litigation" : "General"}
                  </span>
                </td>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <span style={{ padding: "0.3rem 0.7rem", background: "rgba(34,197,94,0.15)", color: "#22c55e", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 600 }}>{d.status}</span>
                </td>
                <td style={{ padding: "1rem 1.25rem", opacity: 0.5, fontSize: "0.85rem" }}>{new Date(d.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {donations.length === 0 && <p style={{ opacity: 0.4, textAlign: "center", padding: "3rem" }}>No donations recorded yet.</p>}
      </div>
    </div>
  );
}
