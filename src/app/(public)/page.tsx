import { Hero } from "@/components/custom/home/Hero";
import { RecentPosts } from "@/components/custom/home/RecentPosts";
import { Categories } from "@/components/custom/home/Categories";
import { TrendingPosts } from "@/components/custom/home/TrendingPosts";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <TrendingPosts />
      <Categories />
      <RecentPosts />
    </div>
  );
}
