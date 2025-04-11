import { MenuList } from '@/lib/constants';
import { boolean, integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

// export const counterSchema = pgTable('counter', {
//   id: serial('id').primaryKey(),
//   count: integer('count').default(0),
//   updatedAt: timestamp('updated_at', { mode: 'date' })
//     .defaultNow()
//     .$onUpdate(() => new Date())
//     .notNull(),
//   createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
// });



export const menuList = pgTable('menu_list', {
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
const menuListArray = MenuList.map((menu) => ({
  item: menu.item,
  itemType: menu.itemType,
  breakfast: menu.breakfast,
  lunch: menu.lunch,
  dinner: menu.dinner,
  cuisine: menu.cuisineId,
  isGlobal: menu.isGlobal,
  userId: menu.userId,
  isActive: 1,
  createdAt: menu.createdAt,
  updatedAt: menu.updatedAt,
}));

export const cuisineList = pgTable('cuisine_list', {
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

export const userList = pgTable('user_list', {
  id: serial('id').primaryKey(), // Auto-incrementing ID
  name: varchar('name', { length: 100 }).notNull(), // User's name
  email: varchar('email', { length: 100 }).notNull(), // User's email
  password: varchar('password', { length: 255 }).notNull(), // User's password
  isActive: boolean('isActive').default(true), // Indicates if the user is active
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(), // Creation timestamp
  updatedAt: timestamp('updatedAt', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(), // Update timestamp
});