"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: "📊" },
  { name: "Real-time", href: "/dashboard/realtime", icon: "⚡" },
  { name: "Reports", href: "/dashboard/reports", icon: "📈" },
  { name: "Websites", href: "/dashboard/websites", icon: "🌐" },
  { name: "Events", href: "/dashboard/events", icon: "📝" },
  { name: "Integration", href: "/dashboard/integration", icon: "🔗" },
  { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-background border-r min-h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.name}
                asChild
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-secondary"
                )}
              >
                <Link href={item.href}>
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
