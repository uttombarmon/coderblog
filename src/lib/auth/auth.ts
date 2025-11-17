import { NextRequest } from "next/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
// your drizzle instance
import { db } from "../db/dbConnect";
import {
  user,
  account,
  session,
  verification,
  post,
  comment,
  postLike,
  postDislike,
  commentLike,
} from "../db/schema";
import { username } from "better-auth/plugins";
import { sendVerificationEmail } from "better-auth/api";
import SendVerifyEmail from "@/clientApis/email/senEmail";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      user,
      account,
      session,
      verification,
      post,
      comment,
      postLike,
      postDislike,
      commentLike,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, NextRequest) => {
      await SendVerifyEmail(user.name, user.email, url);
    },
  },
  plugins: [username()],
});
