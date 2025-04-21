CREATE TABLE IF NOT EXISTS "counter" (
	"id" serial PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cuisine_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"main_cuisine" varchar(100) NOT NULL,
	"sub_cuisine" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"item" varchar(255) NOT NULL,
	"item_type" varchar(50) NOT NULL,
	"breakfast" boolean NOT NULL,
	"lunch" boolean NOT NULL,
	"dinner" boolean NOT NULL,
	"cuisine_id" varchar(100) NOT NULL,
	"is_global" boolean DEFAULT false,
	"user_id" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_activity" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"menu_id" varchar(100) NOT NULL,
	"meal_time" varchar(50) NOT NULL,
	"is_skipped" boolean DEFAULT false,
	"is_cooked" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"menu_ids" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
