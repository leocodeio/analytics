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

    // Validate required fields
    if (!websiteId || !eventType || !eventName) {
      return NextResponse.json(
        { 
          message: "Missing required event data",
          missing: {
            websiteId: !websiteId,
            eventType: !eventType,
            eventName: !eventName
          }
        },
        { status: 400 }
      );
    }

    // Verify website exists before creating event
    const website = await prisma.website.findUnique({
      where: { id: websiteId }
    });

    if (!website) {
      return NextResponse.json(
        { 
          message: "Website not found", 
          websiteId,
          hint: "Please check that the website ID is correct and the website is registered in the system"
        },
        { status: 404 }
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

    return NextResponse.json(
      { message: "Event received successfully" },
      { status: 202 }
    );
  } catch (error: any) {
    console.error("Error collecting event:", error);

    // Handle foreign key constraint error (backup check)
    if (error.code === "P2003") {
      return NextResponse.json(
        { 
          message: "Invalid website ID - database constraint violation",
          error: "The provided website ID does not exist in the database"
        },
        { status: 400 }
      );
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { message: "Invalid JSON format in request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        message: "Internal Server Error",
        error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      },
      { status: 500 }
    );
  }
}
