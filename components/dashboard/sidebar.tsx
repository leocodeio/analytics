"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Zap, 
  TrendingUp, 
  Globe, 
  FileText, 
  Link2, 
  Settings 
} from "lucide-react";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: BarChart3 },
  { name: "Real-time", href: "/dashboard/realtime", icon: Zap },
  { name: "Reports", href: "/dashboard/reports", icon: TrendingUp },
  { name: "Websites", href: "/dashboard/websites", icon: Globe },
  { name: "Events", href: "/dashboard/events", icon: FileText },
  { name: "Integration", href: "/dashboard/integration", icon: Link2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-background border-r border-border min-h-screen">
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
                  "w-full justify-start text-foreground",
                  isActive && "bg-secondary text-secondary-foreground"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="mr-3 h-4 w-4" />
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
