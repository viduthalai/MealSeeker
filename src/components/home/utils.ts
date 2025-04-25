import type { MenuListItem } from '@/lib/constants';
import type { IUserActivity } from '@/models/Schema';
import { cuisineList, MenuList } from '@/lib/constants';

// eslint-disable-next-line no-restricted-syntax
const enum MealType {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
}

// eslint-disable-next-line no-restricted-syntax
const enum MealTime {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Evening = 'Evening',
}

export const getCuisineDetails = (cuisineId = ''): typeof cuisineList[0] | undefined => {
  if (!cuisineId) {
    return undefined; // Return undefined if no cuisineId is provided
  }
  const cuisine = cuisineList.find(item => item.id === cuisineId.toString());
  return cuisine;
};

export const getMealTime = (): MealTime => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return MealTime.Morning;
  } else if (hour < 18) {
    return MealTime.Afternoon;
  } else {
    return MealTime.Evening;
  }
};

export function getGreeting(): string {
  const type = getMealTime();

  if (type === MealTime.Morning) {
    return 'Good Morning';
  } else if (type === MealTime.Afternoon) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
}

export function getMealType(): string {
  const type = getMealTime();
  if (type === MealTime.Morning) {
    return MealType.Breakfast;
  } else if (type === MealTime.Afternoon) {
    return MealType.Lunch;
  } else {
    return MealType.Dinner;
  }
}

export function getMealListByType(MenuList: MenuListItem[]): MenuListItem[] {
  const mealTime = getMealTime();
  if (mealTime === MealTime.Morning) {
    return MenuList.filter(item => item.breakfast);
  } else if (mealTime === MealTime.Afternoon) {
    return MenuList.filter(item => item.lunch);
  } else {
    return MenuList.filter(item => item.dinner);
  }
}

export function getMenuItem(menuItems: MenuListItem[] = MenuList, userActivity: IUserActivity[]): MenuListItem {
  const filteredMenu = getMealListByType(menuItems);

  // Get IDs of recently used items
  const recentlyUsedIds = new Set(userActivity.map(activity => Number(activity.menu_id)));

  // Filter out recently used items
  const availableMenu = filteredMenu.filter(item => !recentlyUsedIds.has(item.id));

  // Return the first available menu item if any
  if (availableMenu.length > 0) {
    return availableMenu[0] as MenuListItem;
  }

  // If all items have been used, return the last used item from the filtered menu
  const lastViewedId = [...recentlyUsedIds].pop();
  const lastViewedItem = filteredMenu.find(item => item.id === lastViewedId);
  if (lastViewedItem) {
    return lastViewedItem;
  }

  // Fallback to the random item in the original menu list
  const randomIndex = Math.floor(Math.random() * menuItems.length);
  if (menuItems.length > 0) {
    return menuItems[randomIndex] as MenuListItem;
  }

  return menuItems[0] as MenuListItem;

  // // Throw an error if no valid menu item can be returned
  // throw new Error('Menu list is empty. Unable to return a valid menu item.');
}

export const getHeaderText = (path: string): string => {
  const page = path.split('/').pop(); // Remove query parameters if any
  switch (page) {
    case 'menu':
      return 'Update Menu';

    default:
      return 'My Home';
  }
};
