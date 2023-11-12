import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import useWindowWidth from "../hooks/useWindowWidth";

import Dropdown from "./DropDown";
import SearchBox from "./SearchBox";

const Header = () => {
  const windowWidth = useWindowWidth();
  const isLessThanSm = windowWidth < 640;

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const nCartItems = cartItems.reduce((acc, cur) => acc + cur.qty, 0);

  const styleClass = `absolute -top-2 -right-2 bg-blue-500 text-white rounded-full ${
    nCartItems < 10 ? "px-[.40rem] py-[.1rem]" : "p-1"
  } text-xs`;

  return (
    <div className="fixed top-0 left-0 right-0 z-20">
      <nav className=" flex flex-row justify-between items-center bg-darkGray mobile:px-2 md:px-10 py-2">
        <div className="text-3xl text-pink-100 ">
          <Link to="/">Agora</Link>
        </div>
        <div>
          <SearchBox />
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
            <li className="text-gray-400 flex flex-row">
              {userInfo ? (
                <Dropdown
                  username={userInfo.name.trim().split(" ").slice(0)[0]}
                />
              ) : (
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
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
