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
  id: number;
  item: string;
  item_type: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  cuisine_id: string;
  is_global?: boolean | null;
  user_id?: string | null;
  created_at?: Date;
  updated_at?: Date;
};

export const MenuList: MenuListItem[] = [
  { id: 0, item: 'Tomato rice', item_type: 'Main Course', breakfast: false, lunch: true, dinner: false, cuisine_id: '1', is_global: true, user_id: '0', created_at: new Date(), updated_at: new Date() },
  { id: 1, item: 'Idly', item_type: 'Main Course', breakfast: true, lunch: false, dinner: true, cuisine_id: '1', is_global: true, user_id: '0', created_at: new Date(), updated_at: new Date() },
  { id: 2, item: 'Sambhar', item_type: 'Curry', breakfast: true, lunch: true, dinner: true, cuisine_id: '1', is_global: true, user_id: '0', created_at: new Date(), updated_at: new Date() },
  { id: 3, item: 'Mint Chutney', item_type: 'Curry', breakfast: true, lunch: false, dinner: true, cuisine_id: '1', is_global: true, user_id: '0', created_at: new Date(), updated_at: new Date() },
  { id: 4, item: 'Dosa', item_type: 'Main Course', breakfast: true, lunch: false, dinner: true, cuisine_id: '1', is_global: true, user_id: '0', created_at: new Date(), updated_at: new Date() },
  { id: 5, item: 'Peanut chutney', item_type: 'Curry', breakfast: true, lunch: false, dinner: true, cuisine_id: '1', is_global: true, user_id: '0', created_at: new Date(), updated_at: new Date() },
  { id: 6, item: 'Coconut chutney', item_type: 'Curry', breakfast: true, lunch: false, dinner: true, cuisine_id: '1', is_global: true, user_id: '0', created_at: new Date(), updated_at: new Date() },
  { id: 7, item: 'Pongal', item_type: 'Main Course', breakfast: true, lunch: false, dinner: true, cuisine_id: '1', is_global: true, user_id: '0', created_at: new Date(), updated_at: new Date() },
  { id: 8, item: 'Upma', item_type: 'Main Course', breakfast: true, lunch: false, dinner: true, cuisine_id: '1', is_global: true, user_id: '0', created_at: new Date(), updated_at: new Date() },
  { id: 9, item: 'Kichadi', item_type: 'Main Course', breakfast: true, lunch: false, dinner: true, cuisine_id: '1', is_global: true, user_id: '0', created_at: new Date(), updated_at: new Date() },
  { id: 10, item: 'Veg kurma', item_type: 'Curry', breakfast: false, lunch: true, dinner: true, cuisine_id: '1', is_global: true, user_id: '0', created_at: new Date(), updated_at: new Date() },
  { id: 11, item: 'Ragi', item_type: 'Main Course', breakfast: true, lunch: false, dinner: false, cuisine_id: '1' },
  { id: 12, item: 'Bread omelette', item_type: 'Main Course', breakfast: true, lunch: false, dinner: false, cuisine_id: '1' },
  { id: 13, item: 'Mint pulao', item_type: 'Main Course', breakfast: false, lunch: true, dinner: false, cuisine_id: '1' },
  { id: 14, item: 'Dhill rice', item_type: 'Main Course', breakfast: false, lunch: true, dinner: false, cuisine_id: '1' },
  { id: 15, item: 'Cococnut milk rice', item_type: 'Main Course', breakfast: false, lunch: true, dinner: false, cuisine_id: '1' },
  { id: 16, item: 'Fish curry', item_type: 'Curry', breakfast: false, lunch: true, dinner: true, cuisine_id: '1' },
  { id: 17, item: 'Chicken kurma', item_type: 'Curry', breakfast: false, lunch: true, dinner: true, cuisine_id: '1' },
  { id: 18, item: 'Chicken thokku', item_type: 'Curry', breakfast: false, lunch: true, dinner: true, cuisine_id: '1' },
  { id: 19, item: 'Lemon rice', item_type: 'Main Course', breakfast: false, lunch: true, dinner: false, cuisine_id: '1' },
  { id: 20, item: 'Puli rice', item_type: 'Main Course', breakfast: false, lunch: true, dinner: false, cuisine_id: '1' },
];

export const cuisineList = [
  { id: '1', mainCuisine: 'Indian', subCuisine: 'South Indian' },
  { id: '2', mainCuisine: 'Indian', subCuisine: 'North Indian' },
  { id: '3', mainCuisine: 'Indian', subCuisine: 'Gujarati' },
  { id: '4', mainCuisine: 'Indian', subCuisine: 'Rajasthani' },

  { id: '5', mainCuisine: 'Japanese', subCuisine: 'Sushi' },
  { id: '6', mainCuisine: 'Japanese', subCuisine: 'Ramen' },
  { id: '7', mainCuisine: 'Japanese', subCuisine: 'Tempura' },

  { id: '8', mainCuisine: 'Mexican', subCuisine: 'Tacos' },
  { id: '9', mainCuisine: 'Mexican', subCuisine: 'Burritos' },
  { id: '10', mainCuisine: 'Mexican', subCuisine: 'Quesadillas' },

  { id: '11', mainCuisine: 'Italian', subCuisine: 'Pasta' },
  { id: '12', mainCuisine: 'Italian', subCuisine: 'Pizza' },
  { id: '13', mainCuisine: 'Italian', subCuisine: 'Risotto' },

  { id: '14', mainCuisine: 'Chinese', subCuisine: 'Szechuan' },
  { id: '15', mainCuisine: 'Chinese', subCuisine: 'Cantonese' },
  { id: '16', mainCuisine: 'Chinese', subCuisine: 'Hunan' },

  { id: '17', mainCuisine: 'Thai', subCuisine: 'Northern Thai' },
  { id: '18', mainCuisine: 'Thai', subCuisine: 'Southern Thai' },

  { id: '19', mainCuisine: 'Mediterranean', subCuisine: 'Greek' },
  { id: '20', mainCuisine: 'Mediterranean', subCuisine: 'Lebanese' },
  { id: '21', mainCuisine: 'Mediterranean', subCuisine: 'Turkish' },

  { id: '22', mainCuisine: 'American', subCuisine: 'Southern' },
  { id: '23', mainCuisine: 'American', subCuisine: 'Tex-Mex' },
  { id: '24', mainCuisine: 'American', subCuisine: 'New England' },

  { id: '25', mainCuisine: 'French', subCuisine: 'Haute Cuisine' },
  { id: '26', mainCuisine: 'French', subCuisine: 'Provencal' },
  { id: '27', mainCuisine: 'French', subCuisine: 'Bistro' },

  { id: '28', mainCuisine: 'Korean', subCuisine: 'Kimchi' },
  { id: '29', mainCuisine: 'Korean', subCuisine: 'Barbecue' },
  { id: '30', mainCuisine: 'Korean', subCuisine: 'Bibimbap' },
];
// ];
// INSERT INTO menu_list (id, item, item_type, breakfast, lunch, dinner, cuisine_id, is_global, user_id, created_at, updated_at) VALUES
// (0, 'Idly', 'Main Course', true, false, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (1, 'Sambhar', 'Curry', true, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (2, 'Mint Chutney', 'Curry', true, false, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (3, 'Dosa', 'Main Course', true, false, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (4, 'Peanut chutney', 'Curry', true, false, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (5, 'Coconut chutney', 'Curry', true, false, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (6, 'Pongal', 'Main Course', true, false, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (7, 'Upma', 'Main Course', true, false, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (8, 'Kichadi', 'Main Course', true, false, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (9, 'Veg kurma', 'Curry', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (10, 'Ragi', 'Main Course', true, false, false, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (11, 'Bread omelette', 'Main Course', true, false, false, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (12, 'Mint pulao', 'Main Course', false, true, false, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (13, 'Dhill rice', 'Main Course', false, true, false, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (14, 'Cococnut milk rice', 'Main Course', false, true, false, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (15, 'Fish curry', 'Curry', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (16, 'Chicken kurma', 'Curry', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (17, 'Chicken thokku', 'Curry', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (18, 'Tomato rice', 'Main Course', false, true, false, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (19, 'Lemon rice', 'Main Course', false, true, false, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (20, 'Puli rice', 'Main Course', false, true, false, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (21, 'Veg rice', 'Main Course', false, true, false, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (22, 'Veg egg rice', 'Main Course', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (23, 'Mint rice', 'Main Course', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (24, 'Briyani', 'Main Course', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (25, 'Egg briyani', 'Main Course', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (26, 'Veg briyani', 'Main Course', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (27, 'Kara kolabu', 'Curry', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (28, 'Fish curry', 'Curry', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (29, 'Chicken kurma', 'Curry', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (30, 'Chicken thokku', 'Curry', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (31, 'Chicken gravy', 'Curry', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (32, 'Egg thokku', 'Curry', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (33, 'Parupu vada kolambu', 'Curry', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (34, 'Coconut Chutney', 'Curry', true, false, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (35, 'Peanut Chutney', 'Curry', true, false, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (36, 'Tomato Chutney', 'Curry', true, false, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (37, 'Rava upma', 'Main Course', true, false, false, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (38, 'Veg upma', 'Main Course', false, false, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (39, 'Peanut salad', 'Main Course', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (40, 'Channa salad', 'Main Course', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (41, 'Black Channa salad', 'Main Course', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z'),
// (42, 'Kidney Bean salad', 'Main Course', false, true, true, '1', true, 1, '2023-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z');
