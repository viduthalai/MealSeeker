'use client';

import React, { useState } from "react";
import { defaultMenuListItem, MenuList, MenuListItem } from "@/lib/constants";
import { getMealListByType, getMealTime } from "./utils";
import { Button } from "../ui/button";

export function GenerateMenu({ item }: { item: MenuListItem }): React.ReactElement {
    const [shownItems, setShownItems] = useState<string[]>([]); // Track shown item IDs
    const [currentItem, setCurrentItem] = useState(item); // Initialize with a random item

    // Function to get a random menu item that hasn't been shown yet
    function getRandomMenuItem(excludedIds: string[]) {
        const menuList = getMealListByType(MenuList)
        const availableItems = menuList.filter(item => !excludedIds.includes(item.id));
        if (availableItems.length === 0) {
            return defaultMenuListItem
        }
        const randomIndex = Math.floor(Math.random() * availableItems.length);
        return availableItems[randomIndex];
    }

    // Handle "Skip" button click
    function handleSkip() {
        const nextItem = getRandomMenuItem(shownItems);
        console.log("🚀 ~ handleSkip ~ nextItem:", nextItem)
        if (nextItem) {
            setShownItems(prev => [...prev, nextItem.id]); // Add the new item to the shown list
            setCurrentItem(nextItem);
        } else {
            // Reset when all items have been shown
            alert("All menu items have been shown. Resetting the list.");
            setShownItems([]);
            const resetItem = getRandomMenuItem([]);
            setCurrentItem(resetItem ?? defaultMenuListItem);
        }
    }

    if (!currentItem) {
        return <p>No menu items available.</p>;
    }

    return (
        <div className="mt-5 p-4  rounded shadow">
            <h2 className="text-xl font-bold mb-2">It's {getMealTime()}, lets cook this Meal </h2>
            <p>
                <strong>Item:</strong> {currentItem?.item}
            </p>
            <p>
                <strong>Type:</strong> {currentItem?.itemType}
            </p>
            <p>
                <strong>Cuisine:</strong> {currentItem?.cuisine}
            </p>
            <Button
                onClick={handleSkip}
                color="primary"
                className="mt-4   text-white rounded hover:bg-blue-600"
            >
                Skip
            </Button>
        </div>
    );
}