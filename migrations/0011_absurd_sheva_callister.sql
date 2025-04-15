CREATE TABLE "user_activity" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"cuisine_id" varchar(100) NOT NULL,
	"meal_time" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
