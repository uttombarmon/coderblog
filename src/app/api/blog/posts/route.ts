import { auth } from '@/lib/auth/auth';
import { db } from '@/lib/db/dbConnect';
import { Post, post } from '@/lib/db/schema';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const session = await auth.api.getSession({headers: await headers()});

  const roleCheck = await checkRole(session?.user?.id);
  if (roleCheck.status !== 200) {
    return roleCheck;
  }
  
  const body = await request.json();
  const { title, content, slug, summary } = body; // Add validation logic here as needed

  if (!title || !content || !session?.user?.id) {
    return NextResponse.json(
      { error: 'Title, content, and authenticated user are required.' }, 
      { status: 400 }
    );
  }

  try {
    // 3. Database Operation (Insert Post)
    const now = new Date();
    const [newPost] = await db.insert(post).values({
      title: String(title),
      content: String(content),
      summary: summary ?? null,
      slug: String(slug ?? title.toLowerCase().replace(/\s/g, '-')),
      authorId: session.user.id,
      status: 'draft', 
      createdAt: now,
      updatedAt: now,
    } as unknown as Post).returning();

    return NextResponse.json({ 
      message: 'Post created successfully.', 
      post: newPost 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error while creating post.' }, 
      { status: 500 }
    );
  }
}