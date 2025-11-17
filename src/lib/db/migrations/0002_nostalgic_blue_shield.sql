ALTER TABLE "user" DROP CONSTRAINT "user_username_unique";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" SET DEFAULT 'user_0udwfx';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" text;