export type Post = {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  tags: string[];
  summary: string;
  authorName: string;
  createdAt: Date;
};
