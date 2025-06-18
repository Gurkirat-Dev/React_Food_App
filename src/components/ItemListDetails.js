import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItems, decrementQty, incrementQty, removeItems } from "../utils/cardSlice";
const ItemListDetails = ({ item, newItem }) => {
  const dispatch = useDispatch();

  const handleItems = (item) => {
    dispatch(addItems({ item: item?.card, quantity: 1 }));
  };
  const { imageId, name, defaultPrice, description, price, id } =
    item?.card?.info || newItem?.item?.info || {};
  return (
    <div className="flex justify-between p-4 border-b-1 border-gray-200 pb-10 ">
      <div>
        {" "}
        <h3 className="text-xl font-semibold">{name}</h3>
        <h4 className="font-medium">₹ {defaultPrice / 100 || price / 100}</h4>
        <p className="mt-4 opacity-60">{description}</p>
      </div>
      <div className=" ml-10 relative">
        {" "}
        <img
          className="min-w-[156px] max-w-[157px] h-[174px] rounded-2xl object-cover"
          src={CDN_URL + imageId}
        />
        {newItem && newItem.quantity >= 1 ? (
          <button className="bg-blue-400 p-2 rounded text-white">
            <span
              onClick={() => dispatch(decrementQty(id))}
              className="bg-amber-50 rounded-full text-black font-semibold px-2 cursor-pointer py-1 mx-2"
            >
              -
            </span>
            {newItem.quantity}
            <span
              onClick={() => dispatch(incrementQty(id))}
              className="bg-amber-50 rounded-full text-black font-semibold cursor-pointer px-2 py-1 mx-2"
            >
              +
            </span>{" "}
            <span className="cursor-pointer bg-red-500 p-2 rounded" onClick={() => dispatch(removeItems(id))}>X</span>
          </button>
        ) : (
          <button
            onClick={() => handleItems(item)}
            className="absolute left-[50%] -translate-x-[50%] cursor-pointer -bottom-[10%] px-12 py-2 bg-white  rounded-xl border-1 border-gray-400 text-green-600 font-bold hover:bg-gray-200"
          >
            ADD
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemListDetails;
export const BestSellerItemsList = (ItemsList) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute text-orange-400 font-semibold animate-bounce">
          <h1>Bestseller</h1>
        </label>
        <ItemsList {...props} />
      </div>
    );
  };
};
