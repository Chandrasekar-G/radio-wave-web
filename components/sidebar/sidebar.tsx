"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { useRadioStore } from "@/lib/store/radio-store";
import Image from "next/image";
import {
  Home,
  Search,
  Music,
  Globe,
  Heart,
  Languages,
  TrendingUp,
  Settings,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { FilterSection } from "./filter-section";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);
  const { favorites } = useRadioStore();

  const toggleExpanded = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/search" },
    {
      icon: Heart,
      label: "Favorites",
      href: "/favorites",
      count: favorites.length,
    },
  ];

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r bg-card p-4",
        className
      )}
    >
      <div className="flex items-center gap-2 px-2">
        <Image
          src="/radio-placeholder.png" // Update path to your actual icon file
          alt="Radio Web Logo"
          width={24}
          height={24}
          className="text-primary"
        />
        <h1 className="text-xl font-semibold">Radio Web</h1>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="justify-start gap-2"
              onClick={() => router.push(item.href)}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {item.count}
                </span>
              )}
            </Button>
          ))}
        </nav>

        <Separator className="my-4" />

        <FilterSection
          icon={Globe}
          title="Countries"
          expanded={expanded === "countries"}
          onToggle={() => toggleExpanded("countries")}
          filterType="country"
        />

        <FilterSection
          icon={Languages}
          title="Languages"
          expanded={expanded === "languages"}
          onToggle={() => toggleExpanded("languages")}
          filterType="language"
        />

        <FilterSection
          icon={Music}
          title="Genres"
          expanded={expanded === "genres"}
          onToggle={() => toggleExpanded("genres")}
          filterType="tag"
        />

        <FilterSection
          icon={TrendingUp}
          title="Popular"
          expanded={expanded === "popular"}
          onToggle={() => toggleExpanded("popular")}
          filterType="popular"
        />
      </ScrollArea>

      <div className="mt-auto flex flex-col gap-2">
        <Separator />
        <div className="flex items-center justify-between px-2 py-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/settings")}
          >
            <Settings className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
