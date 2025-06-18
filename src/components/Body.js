import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestuarantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import useInternetCheck from "../utils/useInternetCheck";

const Body = () => {
  const [loading, setLoading] = useState(false);
  const [nextOffset, setNextOffset] = useState("");
  const [widgetOffset, setWidgetOffset] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCopy, setFilteredCopy] = useState([]);

  // Helper to remove duplicates by restaurant id
  const getUniqueRestaurants = (arr) => {
    const seen = new Set();
    return arr.filter((res) => {
      if (seen.has(res.info.id)) {
        return false;
      } else {
        seen.add(res.info.id);
        return true;
      }
    });
  };

  const filterList = () => {
    const filterData = listOfRestaurant.filter((res) => res.info.avgRating > 4);
    setFilteredCopy(getUniqueRestaurants(filterData));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!hasMore) return; // stop if no more data

    setLoading(true);
    try {
      // Build API URL dynamically with pagination tokens
      const apiUrl = `https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&page_type=DESKTOP_WEB_LISTING&is-seo-homepage-enabled=true${
        nextOffset ? `&nextOffset=${nextOffset}` : ""
      }${
        widgetOffset && Object.keys(widgetOffset).length > 0
          ? `&widgetOffset=${encodeURIComponent(JSON.stringify(widgetOffset))}`
          : ""
      }`;

      console.log("Fetching restaurants from:", apiUrl);

      const response = await fetch(apiUrl);
      const json = await response.json();

      // Extract restaurants from all cards
      const newRestaurants =
        json?.data?.cards
          ?.map(
            (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
          )
          .filter(Boolean)
          .flat() || [];

      if (newRestaurants.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      // Remove duplicates compared to existing restaurants
      const existingIds = new Set(listOfRestaurant.map((res) => res.info.id));
      const filteredNew = newRestaurants.filter(
        (res) => !existingIds.has(res.info.id)
      );

      if (filteredNew.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      // Append new unique restaurants
      setListOfRestaurant((prev) =>
        getUniqueRestaurants([...prev, ...filteredNew])
      );
      setFilteredCopy((prev) =>
        getUniqueRestaurants([...prev, ...filteredNew])
      );

      // Update pagination tokens for next fetch
      setNextOffset(json?.data?.pageOffset?.nextOffset || "");
      setWidgetOffset(json?.data?.pageOffset?.widgetOffset || {});

      // Stop fetching if no nextOffset
      if (!json?.data?.pageOffset?.nextOffset) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching Swiggy restaurants:", error);
    }
    setLoading(false);
  };

  const searchItems = () => {
    const filteredNames = listOfRestaurant.filter((res) =>
      res.info.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCopy(getUniqueRestaurants(filteredNames));
  };

  const checkInternet = useInternetCheck();

  if (checkInternet === false) {
    return (
      <h1 className="no-internet">Please, Check your internet connection</h1>
    );
  }

  return listOfRestaurant && listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body flex flex-col p-10 w-full  ">
      <div className="filter flex gap-25 mb-10">
        <button
          onClick={() => filterList()}
          className="filter-btn px-3 cursor-pointer py-2 bg-gray-500 text-white rounded"
        >
          Top Rated Restaurants
        </button>
        <div className="search flex gap-5">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            className="bg-gray-100 w-90 p-1 rounded border-1 border-gray-400"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="px-3 py-2 cursor-pointer bg-blue-600 rounded text-white"
            onClick={() => {
              searchItems();
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className="res-container flex gap-20 flex-wrap justify-center items-center ">
        {filteredCopy.map((restaurant) => (
          <Link
            className="card"
            key={restaurant.info.id}
            to={`/restaurants/${restaurant.info.id}`}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
            onClick={() => fetchData()}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* No more message */}
      {!hasMore && (
        <p className="text-center text-gray-500 mt-8">
          No more restaurants to show.
        </p>
      )}
    </div>
  );
};

export default Body;
