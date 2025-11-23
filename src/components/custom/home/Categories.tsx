import Link from "next/link";
import { Code2, Database, Globe, Smartphone, Cloud, Terminal } from "lucide-react";

const CATEGORIES = [
  { name: "Frontend", icon: Globe, count: 12, color: "text-blue-500" },
  { name: "Backend", icon: Database, count: 8, color: "text-green-500" },
  { name: "Mobile", icon: Smartphone, count: 5, color: "text-purple-500" },
  { name: "DevOps", icon: Cloud, count: 4, color: "text-orange-500" },
  { name: "Algorithms", icon: Code2, count: 6, color: "text-red-500" },
  { name: "System Design", icon: Terminal, count: 3, color: "text-gray-500" },
];

export function Categories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Popular Topics</h2>
          <p className="text-muted-foreground">
            Explore our most popular categories and find the content that interests you the most.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category) => (
            <Link 
              key={category.name} 
              href={`/blog?category=${category.name.toLowerCase()}`}
              className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-muted/30 hover:bg-muted hover:scale-105 transition-all duration-300 border border-transparent hover:border-border"
            >
              <div className={`p-3 rounded-full bg-background shadow-sm mb-3 group-hover:shadow-md transition-shadow ${category.color}`}>
                <category.icon className="h-6 w-6" />
              </div>
              <span className="font-medium text-sm">{category.name}</span>
              <span className="text-xs text-muted-foreground mt-1">{category.count} posts</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
