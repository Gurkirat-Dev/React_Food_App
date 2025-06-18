import { LOGO_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router";
import useInternetCheck from "../utils/useInternetCheck";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleClick = () => {
    localStorage.removeItem("loggedin");
    navigate("/login");
  };
  const checkInternet = useInternetCheck();

  const cartItems = useSelector((store) => store.cart.items)
  return (
    <div className="header h-30 flex justify-between items-center shadow-xl">
      <div className="logo-container h-full flex justify-center items-center overflow-hidden">
        <img className="logo w-45" src={LOGO_URL} />
        <h4 className="bg-amber-200 p-2 rounded">Welcome, {user.name}</h4>
      </div>
      <div className="nav-items">
        <ul className="flex gap-6 cursor-pointer text-xl items-center p-4 m-4">
          <li>Online:{checkInternet ? "✅" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/cart">Cart-{cartItems.length} </Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <button
            style={{ background: `red` }}
            onClick={handleClick}
            className="login cursor-pointer py-2 px-3 rounded text-white font-light"
          >
            Log out
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
