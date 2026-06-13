CREATE TABLE "skill" (
	"id" serial PRIMARY KEY NOT NULL,
	"skill" text
);
--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN "skill";