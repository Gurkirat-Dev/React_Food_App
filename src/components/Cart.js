import { useDispatch, useSelector } from "react-redux";
import ItemListDetails from "./ItemListDetails";
import { clearItems } from "../utils/cardSlice";
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleCart = () => {
    dispatch(clearItems());

  };

  return (
    <div className="w-6/12 mx-auto flex flex-col justify-start items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl m-10 bg-orange-400 px-3 py-1 rounded">Cart</h1>
        <button
          onClick={handleCart}
          className="bg-blue-400 rounded cursor-pointer px-2 py-1 text-gray-50"
        >
          Clear Cart
        </button>
      </div>
      <div>
        {cartItems.length === 0 ? <h1 className="text-center mt-70 animate-pulse text-4xl">Cart is Empty</h1> : cartItems.map((item, index) => {
          return <ItemListDetails key={index} newItem={item} />
        })}
      </div>
    </div>
  );
};

export default Cart;
