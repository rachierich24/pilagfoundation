"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#0A0F0D",
      backgroundImage: "radial-gradient(circle at 30% 20%, rgba(26,54,38,0.3) 0%, transparent 50%)",
    }}>
      <div style={{
        width: "100%", maxWidth: "420px", padding: "3rem",
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px", backdropFilter: "blur(20px)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "12px",
            background: "linear-gradient(135deg, #1A3626, #22c55e)", margin: "0 auto 1.5rem",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "20px", fontWeight: 900, color: "#FFF",
          }}>P</div>
          <h1 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "#F9F6F0", margin: 0 }}>
            Admin Portal
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "0.5rem" }}>
            PILAG Foundation Operations
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail((e.target as any).value)} required
              placeholder="admin@pilag.org"
              style={{
                width: "100%", padding: "0.9rem 1rem", background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#FFF",
                fontSize: "0.95rem", outline: "none", transition: "border 0.3s",
              }}
            />
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword((e.target as any).value)} required
              placeholder="••••••••"
              style={{
                width: "100%", padding: "0.9rem 1rem", background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#FFF",
                fontSize: "0.95rem", outline: "none",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "1rem", textAlign: "center" }}>{error}</p>
          )}

          <button
            type="submit" disabled={loading}
            style={{
              width: "100%", padding: "1rem", background: loading ? "#555" : "#22c55e",
              color: "#000", border: "none", borderRadius: "8px", fontSize: "0.95rem",
              fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s",
            }}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
