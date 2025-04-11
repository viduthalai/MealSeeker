CREATE TABLE "cuisine_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"main_cuisine" varchar(100) NOT NULL,
	"sub_cuisine" varchar(100) NOT NULL,
	"isActive" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "menu_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"item" varchar(255) NOT NULL,
	"itemType" varchar(50) NOT NULL,
	"breakfast" boolean NOT NULL,
	"lunch" boolean NOT NULL,
	"dinner" boolean NOT NULL,
	"cuisine" varchar(100) NOT NULL,
	"isGlobal" boolean DEFAULT false,
	"userId" integer DEFAULT 0,
	"isActive" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"isActive" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "CuisineList" CASCADE;--> statement-breakpoint
DROP TABLE "MenuList" CASCADE;--> statement-breakpoint
DROP TABLE "UserList" CASCADE;