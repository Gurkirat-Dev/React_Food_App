import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { name, cloudinaryImageId, avgRating, sla, cuisines } = resData.info;
  return (
    <div className="relative res-card flex flex-col w-70 h-100 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow rounded-3xl">
      <img
        alt="res-logo"
        className="res-logo w-full h-[50%] object-cover"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="px-2 mt-4 mb-2 font-semibold text-xl">{name}</h3>
      <h4 className="px-2 opacity-50">{cuisines.join(", ")}</h4>
      <h4 className="px-2 mt-2">{avgRating}★</h4>
      <h4 className="absolute bottom-5 px-2 bg-green-300 w-fit rounded self-center">
        {sla.deliveryTime} minutes
      </h4>
    </div>
  );
};

export default RestaurantCard;