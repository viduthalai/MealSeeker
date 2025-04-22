'use client';

import type { MenuListItem } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { getCuisineDetails, getMealTime } from './utils';

export function GenerateMenu({ item, memberId }: { item: MenuListItem; memberId: string }): React.ReactElement {
  // const [shownItems, setShownItems] = useState<number[]>([]); // Track shown item IDs
  const [currentItem] = useState(item); // Initialize with a random item
  const [submitted, setSubmitted] = useState('false');
  const [cooked, setCooked] = useState('false');
  // const [skipped, setSkipped] = useState('false');
  const mealTime = getMealTime();
  const router = useRouter();
  // const router = useRouter();

  // Handle "Skip" button click
  async function handleSkip() {
    try {
      // Mark the current item as skipped
      await handleCook('skipped');

      // Navigate to the member page and refresh the router
      router.refresh();
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Error skipping the item:', error);
    }
  }

  // Handle "Let's Cook it" button click
  async function handleCook(method: 'cooked' | 'skipped' = 'cooked') {
    // Implement your cooking logic here
    if (submitted !== 'false') {
      return;
    }
    setSubmitted(method);

    const data = {
      user_id: memberId,
      menu_id: currentItem.id,
      meal_time: mealTime,
      is_skipped: method === 'skipped',
      is_cooked: method === 'cooked',
    };

    const result = await fetch(`/api/member`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await result.json();
    if (res?.user_id) {
      if (method === 'cooked') {
        setCooked('true');
      }
      setSubmitted('done');
    }
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
        submitted !== 'done' && submitted !== 'skipped'
        && (
          <Button
            onClick={() => handleCook('cooked')}
            color="primary"
            className="mt-4   text-white rounded hover:bg-blue-600"
          >
            {submitted === 'cooked' && 'Cooking...'}
            {submitted === 'false' && 'Let\'s Cook it'}
          </Button>
        )
      }
      {' '}
      {
        submitted === 'done' && cooked === 'true'
        && (
          <div className="mt-4 text-green-500">
            Thanks for using our service, enjoy your meal.
          </div>
        )
      }

      {' '}
      {/* Show "Skip" button only if not submitted */}
      {
        cooked !== 'true' && (
          <Button
            onClick={handleSkip}
            variant="outline"
            className="mt-4  rounded hover:bg-blue-600"
          >
            Skip
          </Button>
        )
      }
      {
        cooked === 'true' && (
          <Button
            onClick={handleSkip}

            className="mt-4  rounded hover:bg-blue-600"
          >
            Try Again !!!
          </Button>
        )
      }
    </div>
  );
}
