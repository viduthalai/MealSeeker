import { defaultMenuListItem, MenuList, MenuListItem } from "@/lib/constants";

const enum MealType {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner"
}

const enum MealTime {
  Morning = "Morning",
  Afternoon = "Afternoon",
  Evening = "Evening"
}

export const getMealTime = (): MealTime => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return MealTime.Morning;
  } else if (hour < 18) {
    return MealTime.Afternoon;
  } else {
    return MealTime.Evening;
  }
}

export function getGreeting(): string {
  const type = getMealTime();

  if (type === MealTime.Morning) {
    return "Good Morning";
  } else if (type === MealTime.Afternoon) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
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

export function getRandomMenuItem(): MenuListItem {


  let filteredMenu = getMealListByType(MenuList);

  // Randomly select an item from the filtered menu
  const randomIndex = Math.floor(Math.random() * filteredMenu.length);

  // Handle case when filteredMenu is empty
  if (filteredMenu[randomIndex]) {
    return filteredMenu[randomIndex];
  }
  return defaultMenuListItem;

}