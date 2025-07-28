import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const websites = await prisma.website.findMany({
      select: {
        id: true,
        name: true,
        domain: true,
        createdAt: true,
        _count: {
          select: {
            events: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      websites,
      total: websites.length,
      message: "Available websites for testing"
    });
  } catch (error: any) {
    console.error("Error fetching websites:", error);
    return NextResponse.json(
      { message: "Error fetching websites", error: error.message },
      { status: 500 }
    );
  }
}