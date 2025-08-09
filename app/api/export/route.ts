import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const websiteId = searchParams.get("websiteId");
    const format = searchParams.get("format") || "csv";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!websiteId) {
      return NextResponse.json(
        { error: "Website ID is required" },
        { status: 400 }
      );
    }

    // Verify user owns this website
    const website = await prisma.website.findFirst({
      where: {
        id: websiteId,
        userId: session.user.id,
      },
    });

    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    // Build date filter
    const dateFilter: any = {};
    if (startDate) {
      dateFilter.gte = new Date(startDate);
    }
    if (endDate) {
      dateFilter.lte = new Date(endDate);
    }

    // Get events data
    const events = await prisma.event.findMany({
      where: {
        websiteId: websiteId,
        ...(Object.keys(dateFilter).length > 0 && { createdAt: dateFilter }),
      },
      orderBy: { createdAt: "desc" },
      take: 10000, // Limit to 10k events for performance
    });

    if (format === "csv") {
      // Generate CSV
      const headers = [
        "Date",
        "Event Type",
        "Event Name",
        "Path",
        "Referrer",
        "Screen Width",
        "Screen Height",
        "Session ID",
      ];

      const csvRows = [
        headers.join(","),
        ...events.map((event: any) =>
          [
            event.createdAt.toISOString(),
            event.eventType,
            event.eventName || "",
            event.path || "",
            event.referrer || "",
            event.screenWidth?.toString() || "",
            event.screenHeight?.toString() || "",
            event.sessionId,
          ]
            .map((field) => `"${field.replace(/"/g, '""')}"`)
            .join(",")
        ),
      ];

      const csvContent = csvRows.join("\n");

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${
            website.domain
          }-analytics-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      });
    }

    // Default JSON format
    return NextResponse.json({
      website: {
        id: website.id,
        name: website.name,
        domain: website.domain,
      },
      exportedAt: new Date().toISOString(),
      eventCount: events.length,
      events: events,
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  }
}
