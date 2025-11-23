CREATE TABLE "category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "category_name_unique" UNIQUE("name"),
	CONSTRAINT "category_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" SET DEFAULT 'user_z3uy2t';--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "thumbnail" text;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "tags" text[];--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "category_id" text;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "views" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "is_featured" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "published_at" timestamp;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "meta_title" text;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "meta_description" text;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;