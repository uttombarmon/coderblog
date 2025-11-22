import { Post } from "@/lib/db/schema";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const formattedDate = post.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="p-6 border border-gray-200 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
      <p className="text-sm text-indigo-600 font-semibold mb-1">
        {formattedDate} • {post?.authorName}
      </p>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-indigo-700 transition duration-150">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-2">{post.summary}</p>
      <Link
        href={`/posts/${post.slug}`}
        className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition duration-150"
      >
        Read Full Post
        <ChevronRight className="w-4 h-4 ml-1" />
      </Link>
    </article>
  );
};
