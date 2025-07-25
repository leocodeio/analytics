import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with demo data...");

  // Create a demo user (you'll need to sign in with Google first)
  // This script assumes a user already exists from Google OAuth

  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log("❌ No users found. Please sign in with Google first.");
    return;
  }

  const user = users[0];
  console.log(`📋 Using user: ${user.email}`);

  // Create demo websites
  const existingDemo = await prisma.website.findFirst({
    where: { domain: "demo.example.com", userId: user.id },
  });

  const demoWebsite = existingDemo || await prisma.website.create({
    data: {
      name: "Demo Website",
      domain: "demo.example.com",
      userId: user.id,
    },
  });

  const existingBlog = await prisma.website.findFirst({
    where: { domain: "blog.example.com", userId: user.id },
  });

  const blogWebsite = existingBlog || await prisma.website.create({
    data: {
      name: "My Blog",
      domain: "blog.example.com",
      userId: user.id,
    },
  });

  console.log(`🌐 Created websites: ${demoWebsite.name}, ${blogWebsite.name}`);

  // Generate demo events for the last 30 days
  const events = [];
  const paths = ["/", "/about", "/contact", "/blog", "/blog/post-1", "/blog/post-2", "/products", "/pricing"];
  const referrers = ["https://google.com", "https://twitter.com", "https://github.com", null, null, null]; // More direct traffic
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15",
    "Mozilla/5.0 (Android 11; Mobile; rv:92.0) Gecko/92.0 Firefox/92.0",
  ];

  // Generate events for the last 30 days
  for (let day = 30; day >= 0; day--) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    
    // Generate 10-50 events per day (more recent days have more traffic)
    const eventsPerDay = Math.floor(Math.random() * 40) + 10 + (30 - day);
    
    for (let i = 0; i < eventsPerDay; i++) {
      const eventDate = new Date(date);
      eventDate.setHours(Math.floor(Math.random() * 24));
      eventDate.setMinutes(Math.floor(Math.random() * 60));
      
      events.push({
        websiteId: Math.random() > 0.7 ? blogWebsite.id : demoWebsite.id,
        sessionId: `session_${date.getTime()}_${Math.floor(Math.random() * 100)}`,
        eventType: Math.random() > 0.9 ? "custom" : "pageview",
        eventName: paths[Math.floor(Math.random() * paths.length)],
        path: paths[Math.floor(Math.random() * paths.length)],
        referrer: referrers[Math.floor(Math.random() * referrers.length)],
        userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
        screenWidth: Math.random() > 0.5 ? 1920 : 1366,
        screenHeight: Math.random() > 0.5 ? 1080 : 768,
        createdAt: eventDate,
      });
    }
  }

  // Insert events in batches
  console.log(`📊 Creating ${events.length} demo events...`);
  
  for (let i = 0; i < events.length; i += 100) {
    const batch = events.slice(i, i + 100);
    await prisma.event.createMany({
      data: batch,
    });
    console.log(`📈 Created events ${i + 1} - ${Math.min(i + 100, events.length)}`);
  }

  console.log("✅ Demo data seeding completed!");
  console.log(`📊 Total events created: ${events.length}`);
  console.log(`🌐 Total websites: 2`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
