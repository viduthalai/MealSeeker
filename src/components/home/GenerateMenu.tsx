'use client';

import type { MenuListItem } from '@/lib/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';
import React, { useState } from 'react';
import { getCuisineDetails, getGreeting, getMealTime, getMenuItem } from './utils';

export function GenerateMenu({ user, menuIds }: { user: {
  memberId?: string;
  firstName?: string;
  lastName?: string;
}; menuIds: string; }): React.ReactElement {
  const [revealed, setRevealed] = useState(false);
  const [cooked, setCooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuListItem | null>(null);
  const isRare = true;
  const mealTime = getMealTime();
  const memberId = user?.memberId?.toString() || '';

  const getMenuItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        memberId,
        menuIds,
      }).toString();

      const response = await fetch(`/api/member/home/generate?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch menu list');
      }
      const data = await response.json();

      const item = getMenuItem(data?.menuListData, data?.userActivity) || {};
      setSelectedDish(item);
      setLoading(false);
      setRevealed(true);
    } catch (error) {
      console.error('Error fetching menu list:', error);
    }
  };

  const resetBox = () => {
    setRevealed(false);
    setSelectedDish(null);
  };

  // Handle "Skip" button click
  async function handleSkip() {
    try {
      // Mark the current item as skipped
      console.log('🚀 ~ handleSkip ~ handleSkip:', 'Skipping the item');
      await handleCook('skipped');

      // Navigate to the member page and refresh the router
      // router.refresh();
      // window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Error skipping the item:', error);
    }
  }

  // Handle "Let's Cook it" button click
  async function handleCook(method: 'cooked' | 'skipped' = 'cooked') {
    const data = {
      user_id: memberId,
      menu_id: selectedDish?.id,
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
        setCooked(true);
      }
    }
  }

  const { mainCuisine = '', subCuisine = '' } = getCuisineDetails(selectedDish?.cuisine_id) || {};
  console.log('🚀 ~ GenerateMenu ~ mainCuisine:', getGreeting());
  return (
    <>
      <div className="mt-5 p-4 mb-30  rounded shadow">
        <div className="flex flex-col items-center space-y-8 pt-5 pb-10 relative overflow-hidden">
          {/* Sparkles for Rare */}
          {isRare && revealed && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute w-full h-full bg-[radial-gradient(#fff7c2_1px,transparent_1px)] bg-[length:20px_20px] opacity-40 animate-pulse"></div>
            </motion.div>
          )}

          <div className="relative w-64 h-64 z-10">
            <motion.div
              className="w-full h-full rounded-xl bg-gradient-to-br from-teal-500 to-indigo-500 shadow-2xl flex flex-col items-center justify-center cursor-pointer border-4 border-white relative"
              initial={{ scale: 1 }}
              animate={{ scale: revealed ? 0.95 : 1 }}
              transition={{ duration: 0.3 }}
              onClick={!revealed && !loading ? getMenuItems : undefined}
            >
              {!revealed && !loading && (
                <div className="flex flex-col items-center text-white text-lg">
                  <ChefHat className="w-12 h-12 mb-2 animate-bounce" />
                  <span>Chef’s Mystery Box</span>
                </div>
              )}
              {loading && (
                <motion.div
                  className="text-white flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                  <span className="text-sm">Picking a dish...</span>
                </motion.div>
              )}
              {!revealed && !loading && (
                <motion.div
                  className="absolute bottom-2 bg-white text-indigo-600 text-sm font-semibold px-3 py-1 rounded-full shadow-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Click Me
                </motion.div>
              )}
            </motion.div>

            <AnimatePresence>
              {revealed && !loading && (
                <motion.div
                  className={`absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-72 text-center px-4 py-4 rounded-2xl shadow-2xl border ${isRare ? 'bg-yellow-100 border-yellow-500' : 'bg-white border-indigo-400'}`}
                  initial={{ opacity: 0, y: 150, scale: 0 }}
                  animate={{ opacity: 1, y: -60, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className={`text-xl font-semibold mb-2 ${isRare ? 'text-yellow-700' : 'text-indigo-700'}`}>
                      🍽️ Your Dish of the Day:
                    </div>
                    <motion.div
                      initial={{ scale: 0.5, rotate: -5 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className={`text-2xl font-bold underline ${isRare ? 'text-yellow-800' : 'text-gray-800'}`}
                    >
                      {selectedDish?.item}
                    </motion.div>

                    {
                      !cooked && (
                        <>

                          <button
                            type="button"
                            onClick={() => {
                              handleCook('cooked');
                            }}
                            className="mt-4 mr-2 text-sm font-bold text-lime-500 hover:underline"
                          >
                            Cook it
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              resetBox();
                              handleSkip();
                            }}
                            className="mt-4 text-sm text-indigo-600 hover:underline"
                          >
                            Try Again !!!
                          </button>
                        </>
                      )
                    }
                    {
                      cooked && (
                        <div className="text-green-500 text-sm mt-2">
                          Your dish has been marked as cooked!
                        </div>
                      )
                    }

                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {
          !cooked && (
            <h4 className="text-xl font-bold mb-2">
              It's
              {' '}
              {mealTime}
              , lets cook this Meal
              {' '}
            </h4>
          )
        }

        {
          revealed && !loading && !cooked && (
            <div className="text-left mt-4">
              <p>
                <strong>Type:</strong>
                {' '}
                {selectedDish?.item_type}
              </p>
              {
                subCuisine && (
                  <p>
                    <strong>Cuisine:</strong>
                    {` ${subCuisine}, ${mainCuisine}`}
                  </p>
                )
              }
              <p>
                <strong>Meal Time:</strong>
                {' '}
                {mealTime}
              </p>
              <p>
                <strong>Calories:</strong>
                {' '}
                Coming Soon...
              </p>
              <p>
                <strong>Ingredients:</strong>
                {' '}
                Coming Soon...
              </p>
            </div>
          )
        }

      </div>

    </>
  );
}
