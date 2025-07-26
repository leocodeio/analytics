// Test script to check the API and database
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log("Testing database connection...");

    // Check if database is connected
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    // Check existing data
    const users = await prisma.user.count();
    const websites = await prisma.website.count();
    const events = await prisma.event.count();

    console.log(`📊 Current data:`);
    console.log(`  - Users: ${users}`);
    console.log(`  - Websites: ${websites}`);
    console.log(`  - Events: ${events}`);

    // List all websites
    const allWebsites = await prisma.website.findMany();
    console.log("🌐 Websites:");
    allWebsites.forEach((site) => {
      console.log(`  - ${site.name} (${site.domain}) - ID: ${site.id}`);
    });

    if (allWebsites.length === 0) {
      console.log("⚠️  No websites found. You need to create a website first!");
      console.log(
        "💡 You can create one through the dashboard or run the seed script."
      );
    }
  } catch (error) {
    console.error("❌ Database error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function testAPI() {
  console.log("\n🧪 Testing API endpoint...");

  const testPayload = {
    websiteId: "test-website-id",
    sessionId: "test-session-id",
    eventType: "pageview",
    eventName: "/",
    path: "/",
    referrer: "",
    screenWidth: 1920,
    screenHeight: 1080,
  };

  try {
    const response = await fetch("http://localhost:3000/api/collect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testPayload),
    });

    const result = await response.text();
    console.log(`📡 API Response: ${response.status} - ${result}`);
  } catch (error) {
    console.error("❌ API Error:", error.message);
  }
}

// Run tests
testDatabase().then(() => testAPI());
