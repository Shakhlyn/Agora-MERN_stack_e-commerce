import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import useWindowWidth from "../hooks/useWindowWidth";

const Header = () => {
  const windowWidth = useWindowWidth();
  const isLessThanSm = windowWidth < 640;

  const { cartItems } = useSelector((state) => state.cart);
  const nCartItems = cartItems.reduce((acc, cur) => acc + cur.qty, 0);

  const styleClass = `absolute -top-2 -right-2 bg-blue-500 text-white rounded-full ${
    nCartItems < 10 ? "px-[.40rem] py-[.1rem]" : "p-1"
  } text-xs`;

  return (
    <nav className=" flex flex-row justify-between items-center bg-darkGray px-10 py-2">
      <div className="text-3xl text-pink-100 ">
        <Link to="/">Agora</Link>
      </div>
      <div>
        <ul className="flex flex-row gap-4">
          <li className="flex items-center ">
            <Link to="/cart">
              <div className=" relative flex flex-row items-center justify-between gap-1 text-white">
                <FaShoppingCart />
                {!isLessThanSm && <p>Cart</p>}
                {cartItems.length > 0 && (
                  <div className={styleClass}>{nCartItems}</div>
                )}
              </div>
            </Link>
          </li>
          <li className="text-gray-400 ">
            <Link to="/login">
              <div className="flex flex-row items-center justify-between gap-1 ">
                {!isLessThanSm && (
                  <p>
                    <FaUser />
                  </p>
                )}
                <p>Login</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
