// Define food preferences and dietary restrictions
export const dietaryRestrictions = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'glutenFree', label: 'Gluten-Free' },
  { id: 'dairyFree', label: 'Dairy-Free' },
  { id: 'nutFree', label: 'Nut-Free' },
  { id: 'lowCarb', label: 'Low Carb' },
];

export const cuisineTypes = [
  { id: 'italian', label: 'Italian' },
  { id: 'japanese', label: 'Japanese' },
  { id: 'mexican', label: 'Mexican' },
  { id: 'indian', label: 'Indian' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'thai', label: 'Thai' },
  { id: 'mediterranean', label: 'Mediterranean' },
  { id: 'american', label: 'American' },
];



// convert above data into json format with unique id for each item as MenuList array  and export it as MenuList
export type MenuListItem = {
  id: string;
  item: string;
  itemType: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  cuisineId: number;
  isGlobal?: boolean;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const defaultMenuListItem: MenuListItem = { id: '0', item: 'Tomato rice', itemType: 'Main Course', breakfast: false, lunch: true, dinner: false, cuisineId: 1, isGlobal: true, userId: 0, createdAt: new Date(), updatedAt: new Date() };

export const MenuList: MenuListItem[] = [
  { id: '0', item: 'Tomato rice', itemType: 'Main Course', breakfast: false, lunch: true, dinner: false, cuisineId: 1, isGlobal: true, userId: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: '1', item: 'Idly', itemType: 'Main Course', breakfast: true, lunch: false, dinner: true, cuisineId: 1, isGlobal: true, userId: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: '2', item: 'Sambhar', itemType: 'Curry', breakfast: true, lunch: true, dinner: true, cuisineId: 1, isGlobal: true, userId: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: '3', item: 'Mint Chutney', itemType: 'Curry', breakfast: true, lunch: false, dinner: true, cuisineId: 1, isGlobal: true, userId: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: '4', item: 'Dosa', itemType: 'Main Course', breakfast: true, lunch: false, dinner: true, cuisineId: 1, isGlobal: true, userId: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: '5', item: 'Peanut chutney', itemType: 'Curry', breakfast: true, lunch: false, dinner: true, cuisineId: 1, isGlobal: true, userId: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: '6', item: 'Coconut chutney', itemType: 'Curry', breakfast: true, lunch: false, dinner: true, cuisineId: 1, isGlobal: true, userId: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: '7', item: 'Pongal', itemType: 'Main Course', breakfast: true, lunch: false, dinner: true, cuisineId: 1, isGlobal: true, userId: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: '8', item: 'Upma', itemType: 'Main Course', breakfast: true, lunch: false, dinner: true, cuisineId: 1, isGlobal: true, userId: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: '9', item: 'Kichadi', itemType: 'Main Course', breakfast: true, lunch: false, dinner: true, cuisineId: 1, isGlobal: true, userId: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: '10', item: 'Veg kurma', itemType: 'Curry', breakfast: false, lunch: true, dinner: true, cuisineId: 1, isGlobal: true, userId: 0, createdAt: new Date(), updatedAt: new Date() },
  { id: '11', item: 'Ragi', itemType: 'Main Course', breakfast: true, lunch: false, dinner: false, cuisineId: 1 },
  { id: '12', item: 'Bread omelette', itemType: 'Main Course', breakfast: true, lunch: false, dinner: false, cuisineId: 1 },
  { id: '13', item: 'Mint pulao', itemType: 'Main Course', breakfast: false, lunch: true, dinner: false, cuisineId: 1 },
  { id: '14', item: 'Dhill rice', itemType: 'Main Course', breakfast: false, lunch: true, dinner: false, cuisineId: 1 },
  { id: '15', item: 'Cococnut milk rice', itemType: 'Main Course', breakfast: false, lunch: true, dinner: false, cuisineId: 1 },
  { id: '16', item: 'Fish curry', itemType: 'Curry', breakfast: false, lunch: true, dinner: true, cuisineId: 1 },
  { id: '17', item: 'Chicken kurma', itemType: 'Curry', breakfast: false, lunch: true, dinner: true, cuisineId: 1 },
  { id: '18', item: 'Chicken thokku', itemType: 'Curry', breakfast: false, lunch: true, dinner: true, cuisineId: 1 },
  { id: '19', item: 'Lemon rice', itemType: 'Main Course', breakfast: false, lunch: true, dinner: false, cuisineId: 1 },
  { id: '20', item: 'Puli rice', itemType: 'Main Course', breakfast: false, lunch: true, dinner: false, cuisineId: 1 },



];


export const cuisineList = [
  { id: "1", mainCuisine: "Indian", subCuisine: "South Indian" },
  { id: "2", mainCuisine: "Indian", subCuisine: "North Indian" },
  { id: "3", mainCuisine: "Indian", subCuisine: "Gujarati" },
  { id: "4", mainCuisine: "Indian", subCuisine: "Rajasthani" },

  { id: "5", mainCuisine: "Japanese", subCuisine: "Sushi" },
  { id: "6", mainCuisine: "Japanese", subCuisine: "Ramen" },
  { id: "7", mainCuisine: "Japanese", subCuisine: "Tempura" },

  { id: "8", mainCuisine: "Mexican", subCuisine: "Tacos" },
  { id: "9", mainCuisine: "Mexican", subCuisine: "Burritos" },
  { id: "10", mainCuisine: "Mexican", subCuisine: "Quesadillas" },

  { id: "11", mainCuisine: "Italian", subCuisine: "Pasta" },
  { id: "12", mainCuisine: "Italian", subCuisine: "Pizza" },
  { id: "13", mainCuisine: "Italian", subCuisine: "Risotto" },

  { id: "14", mainCuisine: "Chinese", subCuisine: "Szechuan" },
  { id: "15", mainCuisine: "Chinese", subCuisine: "Cantonese" },
  { id: "16", mainCuisine: "Chinese", subCuisine: "Hunan" },

  { id: "17", mainCuisine: "Thai", subCuisine: "Northern Thai" },
  { id: "18", mainCuisine: "Thai", subCuisine: "Southern Thai" },

  { id: "19", mainCuisine: "Mediterranean", subCuisine: "Greek" },
  { id: "20", mainCuisine: "Mediterranean", subCuisine: "Lebanese" },
  { id: "21", mainCuisine: "Mediterranean", subCuisine: "Turkish" },

  { id: "22", mainCuisine: "American", subCuisine: "Southern" },
  { id: "23", mainCuisine: "American", subCuisine: "Tex-Mex" },
  { id: "24", mainCuisine: "American", subCuisine: "New England" },

  { id: "25", mainCuisine: "French", subCuisine: "Haute Cuisine" },
  { id: "26", mainCuisine: "French", subCuisine: "Provencal" },
  { id: "27", mainCuisine: "French", subCuisine: "Bistro" },

  { id: "28", mainCuisine: "Korean", subCuisine: "Kimchi" },
  { id: "29", mainCuisine: "Korean", subCuisine: "Barbecue" },
  { id: "30", mainCuisine: "Korean", subCuisine: "Bibimbap" }
];





// INSERT INTO menu_list (id, item, item_type, breakfast, lunch, dinner, cuisine_id, is_global, user_id, created_at, updated_at) VALUES
// ('0', 'Tomato rice', 'Main Course', false, true, false, 1, true, 0, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('1', 'Idly', 'Main Course', true, false, true, 1, true, 0, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('2', 'Sambhar', 'Curry', true, true, true, 1, true, 0, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('3', 'Mint Chutney', 'Curry', true, false, true, 1, true, 0, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('4', 'Dosa', 'Main Course', true, false, true, 1, true, 0, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('5', 'Peanut chutney', 'Curry', true, false, true, 1, true, 0, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('6', 'Coconut chutney', 'Curry', true, false, true, 1, true, 0, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('7', 'Pongal', 'Main Course', true, false, true, 1, true, 0, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('8', 'Upma', 'Main Course', true, false, true, 1, true, 0, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('9', 'Kichadi', 'Main Course', true, false, true, 1, true, 0, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('10', 'Veg kurma', 'Curry', false, true, true, 1, true, 0, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('11', 'Ragi', 'Main Course', true, false, false, 1, false, NULL, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('12', 'Bread omelette', 'Main Course', true, false, false, 1, false, NULL, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('13', 'Mint pulao', 'Main Course', false, true, false, 1, false, NULL, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('14', 'Dhill rice', 'Main Course', false, true, false, 1, false, NULL, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('15', 'Cococnut milk rice', 'Main Course', false, true, false, 1, false, NULL, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('16', 'Fish curry', 'Curry', false, true, true, 1, false, NULL, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('17', 'Chicken kurma', 'Curry', false, true, true, 1, false, NULL, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('18', 'Chicken thokku', 'Curry', false, true, true, 1, false, NULL, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('19', 'Lemon rice', 'Main Course', false, true, false, 1, false, NULL, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// ('20', 'Puli rice', 'Main Course', false, true, false, 1, false, NULL, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z')
// ON CONFLICT (id) DO NOTHING;