"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function HomeHeader() {
  return (
    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
        <span className="hidden sm:inline">Analytics Platform</span>
        <span className="sm:hidden">Analytics</span>
      </h1>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <ThemeToggle />
        <Link
          href="/auth/signin"
          className="text-muted-foreground hover:text-foreground px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
        >
          <span className="hidden xs:inline">Sign In</span>
          <span className="xs:hidden">In</span>
        </Link>
        <Link
          href="/auth/signup"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
        >
          <span className="hidden xs:inline">Get Started</span>
          <span className="xs:hidden">Start</span>
        </Link>
      </div>
    </div>
  );
}