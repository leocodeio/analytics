import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUniqueViewers, getTimeRange } from "@/lib/analytics";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const websiteId = searchParams.get("websiteId");
    const period = searchParams.get("period") as "24h" | "7d" | "30d" | "90d";

    if (!websiteId) {
      return NextResponse.json({ error: "Website ID is required" }, { status: 400 });
    }

    if (!period || !["24h", "7d", "30d", "90d"].includes(period)) {
      return NextResponse.json({ error: "Valid period is required (24h, 7d, 30d, 90d)" }, { status: 400 });
    }

    // Get time range for the specified period
    const timeRange = getTimeRange(period);
    
    // Get unique viewers count
    const uniqueViewers = await getUniqueViewers(websiteId, timeRange);

    return NextResponse.json({ 
      uniqueViewers,
      period,
      timeRange 
    });

  } catch (error) {
    console.error("Unique viewers API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch unique viewers data" },
      { status: 500 }
    );
  }
}