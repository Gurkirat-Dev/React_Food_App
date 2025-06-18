import { useState } from "react";
import ItemsList from "./ItemsList";

const RestaurantMenuListing = ({ data }) => {
  const { categories, image, title } = data;
  const [seeLists,setSeeLists] = useState(null);
  const handleClick = (index) => {
    setSeeLists(index === seeLists ? null : index);
  };
  return (
    <div className="flex mt-20 mb-10 px-2 pb-5 border-b-20 border-gray-200 flex-col items-center ">
      <div className="w-full">
        <div className="w-full">
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        {categories &&
          categories.map((category, index) => {


            return (
              <div
              onClick={() => handleClick(index)}
                key={category.categoryId}
                className="flex flex-col justify-between w-full"
              >
                <div className="flex cursor-pointer border-b-1 border-gray-300 mt-5 justify-between items-center w-full ">
                  <h2 className=" font-medium ">
                    {category.title} ({category.itemCards.length})
                  </h2>
                  <span className="text-4xl font-semibold">˅</span>
                </div>
                
                {seeLists === index &&  <ItemsList data={category.itemCards} />}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RestaurantMenuListing;
