"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  BarChart3, 
  Zap, 
  TrendingUp, 
  Globe, 
  FileText, 
  Link2, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Websites", href: "/dashboard/websites", icon: Globe },
  { name: "Events", href: "/dashboard/events", icon: FileText },
  { name: "Integration", href: "/dashboard/integration", icon: Link2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const NavButton = ({ item }: { item: typeof navigation[0] }) => {
    const isActive = pathname === item.href;
    
    const button = (
      <Button
        asChild
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full text-foreground",
          isActive && "bg-secondary text-secondary-foreground",
          isCollapsed ? "justify-center px-2" : "justify-start"
        )}
      >
        <Link href={item.href}>
          <item.icon className={cn(
            "h-4 w-4",
            !isCollapsed && "mr-3"
          )} />
          {!isCollapsed && item.name}
        </Link>
      </Button>
    );

    if (isCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.name}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <TooltipProvider>
      <div className={cn(
        "bg-background border-r border-border min-h-screen transition-all duration-300 hidden md:block",
        isCollapsed ? "w-16" : "w-64"
      )}>
        <div className={cn("p-6", isCollapsed && "px-2")}>
          {/* Toggle Button */}
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => (
              <NavButton key={item.name} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </TooltipProvider>
  );
}
