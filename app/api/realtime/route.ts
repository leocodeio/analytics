import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getRealtimeData } from "@/lib/analytics";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const websiteId = searchParams.get("websiteId");

    if (!websiteId) {
      return NextResponse.json({ error: "Website ID is required" }, { status: 400 });
    }

    // Get real-time data
    const realtimeData = await getRealtimeData(websiteId);

    return NextResponse.json(realtimeData);

  } catch (error) {
    console.error("Realtime API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch realtime data" },
      { status: 500 }
    );
  }
}
