import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantMenuListing from "./RestaurantMenuListing";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  if (resInfo === null) {
    return <Shimmer />;
  }
  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRatingString,
    totalRatingsString,
  } = resInfo?.cards[2]?.card?.card?.info;
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    );

  return (
    <div className="menu max-w-[800px] min-h-[800px] mx-auto mt-[20px]">
      <div className="flex mt-20 justify-start items-center mb-[8px] ml-4">
        <h1 className="text-3xl font-semibold">{name}</h1>
      </div>

      <div className="border-[16px] mt-10 border-gray-100  rounded-4xl bg-gray-100">
        <div className="border-1 border-gray-300 px-[16px] pb-[16px] bg-white rounded-2xl">
          <div className="flex items-center gap-5">
            <div>
              <h5 className="font-semibold py-4">
                <span className="text-yellow-500">★</span> {avgRatingString} (
                {totalRatingsString})
              </h5>
            </div>
            <div>
              <p className="font-semibold">
                <span className="mr-2 text-gray-500">•</span>{" "}
                {costForTwoMessage}
              </p>
            </div>
          </div>
          <div className="text-orange-600 text-sm font-semibold underline decoration-solid">
            {cuisines.join(", ")}
          </div>
        </div>
      </div>
      <div className="w-full h-20 flex justify-center items-center">
        <h1 className="text-2xl font-semibold bg-yellow-300 px-2 rounded">Menu</h1>
      </div>
      {categories.length === 0 || !categories ? "No data found." : categories.map((category,index) => {
        return (
          <RestaurantMenuListing
          
            data={category?.card?.card}
            key={category.card?.card?.categoryId}
            
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
