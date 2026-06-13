CREATE TABLE "about" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"mobile" text NOT NULL,
	"password" text NOT NULL,
	"profilePic" text NOT NULL,
	"dob" timestamp NOT NULL,
	"location" text NOT NULL,
	"bio" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exprience" (
	"exprienceYear" text,
	"projects" text,
	"happyClient" text,
	"technologies" text,
	"description" text,
	"resume" text
);
--> statement-breakpoint
DROP TABLE "admin" CASCADE;