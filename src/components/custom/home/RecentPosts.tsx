import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

// Mock data for now
const POSTS = [
  {
    id: 1,
    title: "The Future of React Server Components",
    excerpt: "Understanding how RSCs are changing the way we build web applications and what it means for performance.",
    date: "Mar 15, 2024",
    readTime: "5 min read",
    category: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Mastering TypeScript Generics",
    excerpt: "A comprehensive guide to using generics in TypeScript to write more reusable and type-safe code.",
    date: "Mar 12, 2024",
    readTime: "8 min read",
    category: "TypeScript",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Building Scalable APIs with Node.js",
    excerpt: "Best practices for designing and implementing RESTful APIs that can handle high traffic loads.",
    date: "Mar 10, 2024",
    readTime: "6 min read",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop",
  },
];

export function RecentPosts() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Recent Posts</h2>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/blog">
              View all posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <Card key={post.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-background">
              <div className="aspect-video overflow-hidden relative">
                <div className="absolute inset-0 bg-muted animate-pulse" /> {/* Placeholder while loading */}
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </div>
              </div>
              <CardHeader className="space-y-2 p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="link" className="px-0 text-primary" asChild>
                  <Link href={`/blog/${post.id}`}>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center sm:hidden">
          <Button variant="outline" size="lg" asChild className="w-full">
            <Link href="/blog">
              View all posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
