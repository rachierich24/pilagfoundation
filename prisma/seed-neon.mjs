import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const DATABASE_URL =
  "postgresql://neondb_owner:npg_Ql3ZO4murCgz@ep-ancient-cell-at5oooy1-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(DATABASE_URL);

async function main() {
  console.log("🌱 Seeding Neon database...");

  // 1. Admin user
  const passwordHash = await bcrypt.hash("pilag2026", 10);
  await sql`
    INSERT INTO "AdminUser" (id, email, "passwordHash", name, "createdAt")
    VALUES (gen_random_uuid()::text, 'admin@pilag.org', ${passwordHash}, 'PILAG Admin', NOW())
    ON CONFLICT (email) DO NOTHING
  `;
  console.log("✅ Admin user: admin@pilag.org / pilag2026");

  // 2. Drives
  const drives = [
    { title: "DTU Plantation Drive", location: "Delhi", date: "April 5, 2026", impact: "300 Trees Planned", imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600" },
    { title: "Yamuna Riverbank Cleanup", location: "Delhi NCR", date: "April 12, 2026", impact: "2 km Stretch", imageUrl: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1600" },
    { title: "Green Awareness Walk", location: "Noida", date: "April 19, 2026", impact: "500 Citizens Reached", imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600" },
    { title: "Jharkhand Forest Mapping", location: "Jharkhand", date: "May 3, 2026", impact: "400 ha Surveyed", imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1600" },
  ];
  for (const d of drives) {
    await sql`
      INSERT INTO "Drive" (id, title, location, date, impact, "imageUrl", "isActive", "createdAt")
      VALUES (gen_random_uuid()::text, ${d.title}, ${d.location}, ${d.date}, ${d.impact}, ${d.imageUrl}, true, NOW())
    `;
  }
  console.log(`✅ ${drives.length} drives seeded`);

  // 3. Testimonials
  const testimonials = [
    { text: "Pilag Foundation gave us the tools to map our ancestral lands when the government said they didn't exist.", authorName: "Arjun Mehra", authorRole: "Community Leader", authorInitials: "AM" },
    { text: "The litigation fund stopped the illegal logging in our valley within three months of the first report.", authorName: "Priya Nair", authorRole: "Legal Activist", authorInitials: "PN" },
    { text: "I started as a volunteer planting trees and now I lead digital literacy workshops for tribal youth.", authorName: "Rekha Devi", authorRole: "Field Officer", authorInitials: "RD" },
  ];
  for (const t of testimonials) {
    await sql`
      INSERT INTO "Testimonial" (id, text, "authorName", "authorRole", "authorInitials", "isVisible", "createdAt")
      VALUES (gen_random_uuid()::text, ${t.text}, ${t.authorName}, ${t.authorRole}, ${t.authorInitials}, true, NOW())
    `;
  }
  console.log(`✅ ${testimonials.length} testimonials seeded`);

  console.log("🎉 Seed complete! Go to /admin/login → admin@pilag.org / pilag2026");
}

main().catch((e) => { console.error(e); process.exit(1); });
