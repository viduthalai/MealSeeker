CREATE TABLE "cuisine_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"main_cuisine" varchar(100) NOT NULL,
	"sub_cuisine" varchar(100) NOT NULL,
	"isActive" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "MenuList" ADD COLUMN "isActive" boolean DEFAULT true;