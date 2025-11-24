"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import SignInOrDashboardButton from "./SignInOrDashboardButton";

const CATEGORIES = [
  { name: "Frontend", href: "/blog?category=frontend" },
  { name: "Backend", href: "/blog?category=backend" },
  { name: "Mobile", href: "/blog?category=mobile" },
  { name: "DevOps", href: "/blog?category=devops" },
  { name: "System Design", href: "/blog?category=system-design" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              CoderBlog
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60">
                Categories <ChevronDown className="h-3 w-3" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[160px]">
                <div className="bg-popover border rounded-md shadow-md p-2 flex flex-col gap-1">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="px-3 py-2 text-sm hover:bg-muted rounded-sm transition-colors text-popover-foreground"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Blog
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div
            className={cn(
              "relative transition-all duration-300",
              isSearchOpen
                ? "w-full absolute left-0 px-4 bg-background z-20 h-16 flex items-center"
                : "w-auto"
            )}
          >
            {isSearchOpen ? (
              <div className="relative w-full max-w-md mx-auto flex items-center gap-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  className="w-full pl-9 rounded-full bg-muted/50 focus:bg-background transition-colors"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
                <div className="relative hidden md:block">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search posts..."
                    className="w-[200px] pl-9 rounded-full bg-muted/50 focus:bg-background transition-colors"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
            <SignInOrDashboardButton />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-4 animate-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Categories
              </p>
              <div className="pl-4 flex flex-col gap-2 border-l">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="text-sm transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
          <Button className="w-full rounded-full">Sign In</Button>
        </div>
      )}
    </header>
  );
}
