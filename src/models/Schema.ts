import { MenuList } from '@/lib/constants';
import { boolean, integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

export const counterSchema = pgTable('counter', {
  id: serial('id').primaryKey(),
  count: integer('count').default(0),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

export const menuListSchema = pgTable('menu_list', {
  id: serial('id').primaryKey(), // Auto-incrementing ID
  item: varchar('item', { length: 255 }).notNull(), // Name of the menu item
  item_type: varchar('item_type', { length: 50 }).notNull(), // Type of the item
  breakfast: boolean('breakfast').notNull(), // Available for breakfast
  lunch: boolean('lunch').notNull(), // Available for lunch
  dinner: boolean('dinner').notNull(), // Available for dinner
  cuisine_id: varchar('cuisine_id', { length: 100 }).notNull(), // Cuisine type
  is_global: boolean('is_global').default(false), // Indicates if the item is global
  user_id: integer('user_id').default(0), // ID of the user who created the item
  is_active: boolean('is_active').default(true), // Indicates if the item is active
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(), // Creation timestamp
  updated_at: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(), // Update timestamp
});

// insert menuList values into menuList table
export const menuListArray = MenuList.map(menu => ({
  item: menu.item,
  itemType: menu.item_type,
  breakfast: menu.breakfast,
  lunch: menu.lunch,
  dinner: menu.dinner,
  cuisine: menu.cuisine_id,
  isGlobal: menu.is_global,
  userId: menu.user_id,
  isActive: 1,
  createdAt: menu.created_at,
  updatedAt: menu.updated_at,
}));

export const cuisineListSchema = pgTable('cuisine_list', {
  id: serial('id').primaryKey(), // Auto-incrementing ID
  main_cuisine: varchar('main_cuisine', { length: 100 }).notNull(), // Main cuisine name
  sub_cuisine: varchar('sub_cuisine', { length: 100 }).notNull(), // Subcuisine name
  is_active: boolean('is_active').default(true), // Indicates if the cuisine is active
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(), // Creation timestamp
  updated_at: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(), // Update timestamp
});

export const userListSchema = pgTable('user_list', {
  id: serial('id').primaryKey(), // Auto-incrementing ID
  name: varchar('name', { length: 100 }).notNull(), // User's name
  email: varchar('email', { length: 100 }).notNull(), // User's email
  password: varchar('password', { length: 255 }).notNull(), // User's password
  menu_ids: varchar('menu_ids', { length: 255 }).notNull(), // User's Menu IDs
  is_active: boolean('is_active').default(true), // Indicates if the user is active
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(), // Creation timestamp
  updated_at: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(), // Update timestamp
});

export const userActivitySchema = pgTable('user_activity', {
  id: serial('id').primaryKey(), // Auto-incrementing ID
  user_id: integer('user_id').notNull(), // ID of the user
  cuisine_id: varchar('cuisine_id', { length: 100 }).notNull(), // Cuisine type
  // activity_type: varchar('activity_type', { length: 50 }).notNull(), // Type of activity (e.g., view, like)
  meal_time: varchar('meal_time', { length: 50 }).notNull(), // Timestamp of the activity
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(), // Creation timestamp
});
