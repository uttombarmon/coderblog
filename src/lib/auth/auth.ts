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
import { customSession, username } from "better-auth/plugins";
import SendVerifyEmail from "@/clientApis/email/senEmail";
import findUserRoles from "./findUserRoles";

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
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, NextRequest) => {
      // console.log("signup-ridrect: ", user);
      await SendVerifyEmail(user.name, user.email, url);
    },
  },
  plugins: [
    username(),
    customSession(async ({ user, session }) => {
      const roles = findUserRoles(user.id);
      return {
        roles,
        user: {
          ...user,
          newField: "newField",
        },
        session,
      };
    }),
  ],
});
