import type { InferSelectModel } from 'drizzle-orm';

import { MenuList } from '@/lib/constants';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

import { boolean, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

// Infer the type of the `userListSchema`
export type IUserList = InferSelectModel<typeof userListSchema>;
export type IMenuList = InferSelectModel<typeof menuListSchema>;

export const menuListSchema = pgTable('menu_list', {
  id: serial('id').primaryKey(), // Auto-incrementing ID
  item: varchar('item', { length: 255 }).notNull(), // Name of the menu item
  item_type: varchar('item_type', { length: 50 }).notNull(), // Type of the item
  breakfast: boolean('breakfast').notNull(), // Available for breakfast
  lunch: boolean('lunch').notNull(), // Available for lunch
  dinner: boolean('dinner').notNull(), // Available for dinner
  cuisine_id: varchar('cuisine_id', { length: 100 }).notNull(), // Cuisine type
  is_global: boolean('is_global').default(false), // Indicates if the item is global
  user_id: varchar('user_id', { length: 100 }), // ID of the user who created the item
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
  user_id: varchar('user_id', { length: 100 }).unique(), // Unique identifier for the user
  name: varchar('name', { length: 100 }).notNull(), // User's name
  email: varchar('email', { length: 100 }).notNull(), // User's email
  password: varchar('password', { length: 255 }).notNull(), // User's password
  menu_ids: varchar('menu_ids', { length: 255 }), // User's Menu IDs
  is_active: boolean('is_active').default(true), // Indicates if the user is active
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(), // Creation timestamp
  updated_at: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(), // Update timestamp
});

export type IUserActivity = InferSelectModel<typeof userActivitySchema>;
export const userActivitySchema = pgTable('user_activity', {
  id: serial('id').primaryKey(), // Auto-incrementing ID
  user_id: varchar('user_id').notNull(), // ID of the user
  menu_id: varchar('menu_id', { length: 100 }).notNull(), // Cuisine type
  meal_time: varchar('meal_time', { length: 50 }).notNull(), // Timestamp of the activity
  is_skipped: boolean('is_skipped').default(false), // Indicates if the item was skipped
  is_cooked: boolean('is_cooked').default(false), // Indicates if the item was cooked
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(), // Creation timestamp
});
