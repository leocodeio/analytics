import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      websiteId,
      sessionId,
      eventType,
      eventName,
      path,
      referrer,
      screenWidth,
      screenHeight,
      country,
      city,
    } = body;

    if (!websiteId || !eventType || !eventName) {
      return NextResponse.json(
        { message: "Missing required event data." },
        { status: 400 }
      );
    }

    // Get client IP address
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    await prisma.event.create({
      data: {
        websiteId,
        sessionId,
        eventType,
        eventName,
        path,
        referrer,
        userAgent: request.headers.get("user-agent"),
        screenWidth,
        screenHeight,
        country,
        city,
        ip: ip.split(",")[0].trim(), // Take first IP if multiple
      },
    });

    return NextResponse.json({ message: "Event received" }, { status: 202 });
  } catch (error: any) {
    console.error("Error collecting event:", error);
    
    // Handle foreign key constraint error (invalid websiteId)
    if (error.code === 'P2003') {
      return NextResponse.json(
        { message: "Invalid website ID" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
