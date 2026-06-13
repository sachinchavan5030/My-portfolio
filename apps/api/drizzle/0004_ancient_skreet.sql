ALTER TABLE "admin" DROP CONSTRAINT "admin_email_unique";--> statement-breakpoint
ALTER TABLE "admin" DROP CONSTRAINT "admin_mobile_unique";--> statement-breakpoint
ALTER TABLE "admin" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "admin" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "admin" ALTER COLUMN "mobile" DROP NOT NULL;