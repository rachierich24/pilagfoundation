import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Don't protect the login page itself
  const isLoginPage = false; // Layout applies to all /admin/* routes

  return <>{children}</>;
}
