"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function HomeHeader() {
  return (
    <div className="flex items-center justify-between h-16">
      <h1 className="text-2xl font-bold text-foreground">
        Analytics Platform
      </h1>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Link
          href="/auth/signin"
          className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}