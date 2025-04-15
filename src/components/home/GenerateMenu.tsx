'use client';

import type { MenuListItem } from '@/lib/constants';
import { MenuList } from '@/lib/constants';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { getCuisineDetails, getMealListByType, getMealTime } from './utils';

export function GenerateMenu({ item }: { item: MenuListItem }): React.ReactElement {
  const [shownItems, setShownItems] = useState<number[]>([]); // Track shown item IDs
  const [currentItem, setCurrentItem] = useState(item); // Initialize with a random item
  const [submitted, setSubmitted] = useState('false');
  const mealTime = getMealTime();
  // const router = useRouter();

  // Function to get a random menu item that hasn't been shown yet
  function getRandomMenuItem(excludedIds: number[]): MenuListItem {
    const menuList = getMealListByType(MenuList);
    const availableItems = menuList.filter(item => !excludedIds.includes(item.id));
    if (availableItems.length === 0) {
      return MenuList[0] as MenuListItem;
    }
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    if (availableItems[randomIndex]) {
      return availableItems[randomIndex];
    }
    return MenuList[0] as MenuListItem;
  }

  // Handle "Skip" button click
  function handleSkip() {
    const nextItem = getRandomMenuItem(shownItems);
    console.log('🚀 ~ handleSkip ~ nextItem:', nextItem);
    if (nextItem) {
      setShownItems(prev => [...prev, nextItem.id]); // Add the new item to the shown list
      setCurrentItem(nextItem);
    } else {
      // Reset when all items have been shown
      // eslint-disable-next-line no-alert
      alert('All menu items have been shown. Resetting the list.');
      setShownItems([]);
      const resetItem = getRandomMenuItem([]);
      setCurrentItem(resetItem);
    }
  }

  // Handle "Let's Cook it" button click
  async function handleCook() {
    // Implement your cooking logic here
    console.log('Cooking:', currentItem);
    if (submitted !== 'false') {
      return;
    }
    setSubmitted('true');

    const data = {
      user_id: 1,
      cuisine_id: currentItem.id,
      meal_time: mealTime,
    };

    const result = await fetch(`/api/member`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await result.json();
    console.log('🚀 ~ handleCook ~ res:', res);
    if (res?.user_id) {
      setSubmitted('done');
    }
    // const nextItem = getRandomMenuItem(shownItems);

    // router.refresh();
    // For example, you can show an alert or navigate to a cooking page
  }

  if (!currentItem) {
    return <p>No menu items available.</p>;
  }
  const { mainCuisine = '', subCuisine = '' } = getCuisineDetails(currentItem?.cuisine_id) || {};

  return (
    <div className="mt-5 p-4  rounded shadow">
      <h2 className="text-xl font-bold mb-2">
        It's
        {' '}
        {mealTime}
        , lets cook this Meal
        {' '}
      </h2>
      <p>
        <strong>Item:</strong>
        {' '}
        {currentItem?.item}
      </p>
      <p>
        <strong>Type:</strong>
        {' '}
        {currentItem?.item_type}
      </p>
      {
        subCuisine && (
          <p>
            <strong>Cuisine:</strong>
            {` ${subCuisine}, ${mainCuisine}`}
          </p>
        )
      }
      {
        submitted !== 'done'
        && (
          <Button
            onClick={handleCook}
            color="primary"
            className="mt-4   text-white rounded hover:bg-blue-600"
          >
            {submitted === 'true' && 'Cooking...'}
            {submitted === 'false' && 'Let\'s Cook it'}
          </Button>
        )
      }
      {' '}
      {
        submitted === 'done'
        && (
          <div className="mt-4 text-green-500">
            Thanks for using our service, enjoy your meal.
          </div>
        )
      }
      <Button
        onClick={handleSkip}
        variant="outline"
        className="mt-4  rounded hover:bg-blue-600"
      >
        Skip
      </Button>

    </div>
  );
}
