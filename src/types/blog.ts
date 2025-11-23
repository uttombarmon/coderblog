export type Category = 
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "DevOps"
  | "System Design"
  | "Database"
  | "Cloud"
  | "Security"
  | "AI/ML"
  | "Career";

export interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string; // Optional for list views
  coverImage: string;
  date: string; // ISO string
  readTime: string;
  author: Author;
  category: Category;
  tags: string[];
  views: number;
  isTrending?: boolean;
  isFeatured?: boolean;
}
