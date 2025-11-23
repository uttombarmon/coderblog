"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TRENDING_POSTS = [
  {
    id: 1,
    title: "10 Tips for Clean Code",
    category: "Best Practices",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    views: "12k",
  },
  {
    id: 2,
    title: "Next.js 14: What's New?",
    category: "Frameworks",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2070&auto=format&fit=crop",
    views: "10.5k",
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox",
    category: "CSS",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop",
    views: "9.8k",
  },
  {
    id: 4,
    title: "Understanding Async/Await",
    category: "JavaScript",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070&auto=format&fit=crop",
    views: "8.2k",
  },
  {
    id: 5,
    title: "Docker for Beginners",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=2070&auto=format&fit=crop",
    views: "7.5k",
  },
];

export function TrendingPosts() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-12 border-y bg-muted/10">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} className="rounded-full h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} className="rounded-full h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TRENDING_POSTS.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="snap-start shrink-0">
              <Card className="w-[280px] md:w-[320px] overflow-hidden border-none shadow-sm hover:shadow-md transition-all group bg-background">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs font-normal">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.views} views</span>
                    <span className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
