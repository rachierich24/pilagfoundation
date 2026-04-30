import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Create default admin user
  const passwordHash = await bcrypt.hash("pilag2026", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@pilag.org" },
    update: {},
    create: {
      email: "admin@pilag.org",
      passwordHash,
      name: "PILAG Admin",
    },
  });
  console.log("✅ Admin user created: admin@pilag.org / pilag2026");

  // 2. Seed existing hardcoded drives
  const drives = [
    { title: "DTU Plantation Drive", location: "Delhi", date: "April 5, 2026", impact: "300 Trees Planned", imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600" },
    { title: "Yamuna Riverbank Cleanup", location: "Delhi NCR", date: "April 12, 2026", impact: "2 km Stretch", imageUrl: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1600" },
    { title: "Green Awareness Walk", location: "Noida", date: "April 19, 2026", impact: "500 Citizens Reached", imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600" },
    { title: "Jharkhand Forest Mapping", location: "Jharkhand", date: "May 3, 2026", impact: "400 ha Surveyed", imageUrl: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1600" },
  ];

  for (const d of drives) {
    await prisma.drive.create({ data: d });
  }
  console.log(`✅ ${drives.length} drives seeded`);

  // 3. Seed existing hardcoded testimonials
  const testimonials = [
    { text: "Pilag Foundation gave us the tools to map our ancestral lands when the government said they didn't exist.", authorName: "Arjun Mehra", authorRole: "Community Leader", authorInitials: "AM" },
    { text: "The litigation fund stopped the illegal logging in our valley within three months of the first report.", authorName: "Priya Nair", authorRole: "Legal Activist", authorInitials: "PN" },
    { text: "I started as a volunteer planting trees and now I lead digital literacy workshops for tribal youth.", authorName: "Rekha Devi", authorRole: "Field Officer", authorInitials: "RD" },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`✅ ${testimonials.length} testimonials seeded`);

  console.log("🎉 Seed complete!");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
