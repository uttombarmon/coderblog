import { db } from "@/lib/db/dbConnect";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    // console.log("Params Id: ", userId);
    if (!userId) {
      console.log("Can't get id from role get api");
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const role = await db
      .select({ role: user.role })
      .from(user)
      .where(eq(user.id, userId));
    // console.log(role);
    return NextResponse.json({ role: role[0]?.role ?? null });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
