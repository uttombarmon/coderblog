import React from "react";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/custom/home/PostCard";
import Tiptap from "@/components/custom/tiptap/Tiptap";
import { Post } from "../../../types/Post";

export default async function Home() {
  const posts = await getPublishedPosts();

  return (
    <main className="bg-gray-50 min-h-screen pt-12 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            The CoderBlog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights and tutorials on modern web development, AI, and full-stack
            architecture.
          </p>
        </header>

        {/* Search Bar (Placeholder for FR-PUBLIC-03) */}
        <section className="mb-12">
          <div className="relative">
            <input
              type="search"
              placeholder="Search posts by title, summary, or tag..."
              className="w-full py-4 pl-12 pr-4 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-lg transition duration-150"
              // Note: For a functional search, this input would be wrapped in a 'use client' component
              disabled
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <p className="mt-2 text-sm text-gray-500 text-center">
            (Search functionality coming soon)
          </p>
        </section>

        {/* Post List (FR-PUBLIC-01) */}
        <section className="space-y-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>

        {posts.length === 0 && (
          <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-700">
              No Posts Published Yet
            </h3>
            <p className="mt-2 text-gray-500">
              The authors are busy writing great content. Check back soon!
            </p>
          </div>
        )}
      </div>
      <Tiptap />
    </main>
  );
}
async function getPublishedPosts(): Promise<Post[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: 1,
      title: "The Rise of TypeScript in Backend Development",
      slug: "typescript-backend-development",
      thumbnail: "/thumbnail.jpg",
      content: "",
      tags: ["backend", "typescript"],
      summary:
        "A deep dive into why TypeScript is becoming the standard for robust, scalable backend services, featuring examples using Node.js and Drizzle ORM.",
      authorName: "Jane Doe",
      createdAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
    },
    {
      id: 2,
      title: "Optimizing PostgreSQL Queries with Drizzle ORM",
      slug: "optimizing-postgres-drizzle",
      thumbnail: "/thumbnail.jpg",
      content: "",
      tags: ["backend", "typescript"],
      summary:
        "Learn best practices for writing performant SQL queries using Drizzle's expression builders and leveraging PostgreSQL indexes for faster read times.",
      authorName: "John Smith",
      createdAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
    },
    {
      id: 3,
      title: "Why Server Components Win for Blog Performance",
      slug: "server-components-performance",
      thumbnail: "/thumbnail.jpg",
      content: "",
      tags: ["backend", "typescript"],
      summary:
        "An explanation of Next.js Server Components, static rendering, and how they drastically improve the core web vitals for content-heavy sites.",
      authorName: "Jane Doe",
      createdAt: new Date(Date.now() - 86400000 * 10), // 10 days ago
    },
  ];
}
