CREATE TABLE "MenuList" (
	"id" serial PRIMARY KEY NOT NULL,
	"item" varchar(255) NOT NULL,
	"itemType" varchar(50) NOT NULL,
	"breakfast" boolean NOT NULL,
	"lunch" boolean NOT NULL,
	"dinner" boolean NOT NULL,
	"cuisine" varchar(100) NOT NULL,
	"isGlobal" boolean DEFAULT false,
	"userId" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "menuList" CASCADE;