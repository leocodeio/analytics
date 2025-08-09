"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Websites", href: "/dashboard/websites" },
  { name: "Events", href: "/dashboard/events" },
  { name: "Integration", href: "/dashboard/integration" },
  { name: "Settings", href: "/dashboard/settings" },
];

function MobileSidebarTrigger() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Menu</h2>
        </div>
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navigation.map(item => {
            const active = pathname === item.href;
            return (
              <Button
                key={item.href}
                asChild
                variant={active ? "secondary" : "ghost"}
                className={"justify-start w-full"}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-background/90 dark:bg-card/80 backdrop-blur-lg border-b-2 border-border/30 dark:border-border/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="md:hidden">
              {/* Mobile sidebar trigger */}
              <MobileSidebarTrigger />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent truncate">
              <span className="hidden sm:inline">Analytics Dashboard</span>
              <span className="sm:hidden">Dashboard</span>
            </h1>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg hover:bg-accent/80 transition-all duration-200">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold text-xs sm:text-sm shadow-md">
                    {session?.user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="text-foreground font-medium text-sm sm:text-base hidden xs:inline truncate max-w-24 sm:max-w-none">{session?.user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-48 p-2">
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer rounded-md px-3 py-2 text-destructive hover:bg-destructive/10 hover:text-destructive font-medium">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
