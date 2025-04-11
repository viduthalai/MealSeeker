ALTER TABLE "menu_list" ADD COLUMN "item_type" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "menu_list" ADD COLUMN "cuisine_id" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "menu_list" ADD COLUMN "is_global" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "menu_list" ADD COLUMN "user_id" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "menu_list" ADD COLUMN "is_active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "menu_list" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "menu_list" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "menu_list" DROP COLUMN "itemType";--> statement-breakpoint
ALTER TABLE "menu_list" DROP COLUMN "cuisine";--> statement-breakpoint
ALTER TABLE "menu_list" DROP COLUMN "isGlobal";--> statement-breakpoint
ALTER TABLE "menu_list" DROP COLUMN "userId";--> statement-breakpoint
ALTER TABLE "menu_list" DROP COLUMN "isActive";--> statement-breakpoint
ALTER TABLE "menu_list" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "menu_list" DROP COLUMN "updatedAt";