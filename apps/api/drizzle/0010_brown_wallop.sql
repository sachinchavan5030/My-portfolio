CREATE TABLE "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"description" text,
	"gitLink" text,
	"liveLink" text,
	"projectImage" text,
	"skill" text
);
--> statement-breakpoint
ALTER TABLE "about" ADD COLUMN "gitHubLink" text;--> statement-breakpoint
ALTER TABLE "about" ADD COLUMN "linkdinLink" text;