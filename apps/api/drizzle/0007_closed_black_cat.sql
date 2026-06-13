ALTER TABLE "exprience" ALTER COLUMN "exprienceYear" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "exprience" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;