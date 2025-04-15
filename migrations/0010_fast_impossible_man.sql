ALTER TABLE "user_list" ADD COLUMN "is_active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "user_list" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_list" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_list" DROP COLUMN "isActive";--> statement-breakpoint
ALTER TABLE "user_list" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "user_list" DROP COLUMN "updatedAt";