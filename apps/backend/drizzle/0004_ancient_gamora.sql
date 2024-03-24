CREATE TABLE IF NOT EXISTS "listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"price" text NOT NULL,
	"image" text NOT NULL,
	"size" text NOT NULL,
	"category" text NOT NULL,
	"description" text NOT NULL,
	"year" integer NOT NULL,
	"is_sold" text DEFAULT 'false' NOT NULL,
	"posted_by" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listings" ADD CONSTRAINT "listings_posted_by_users_id_fk" FOREIGN KEY ("posted_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
