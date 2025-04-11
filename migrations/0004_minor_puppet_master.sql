CREATE TABLE "CuisineList" (
	"id" serial PRIMARY KEY NOT NULL,
	"main_cuisine" varchar(100) NOT NULL,
	"sub_cuisine" varchar(100) NOT NULL,
	"isActive" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "cuisine_list" CASCADE;