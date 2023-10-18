import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { useState } from "react";

import useWindowWidth from "../hooks/useWindowWidth";

const Header = () => {
  const windowWidth = useWindowWidth();
  const isLessThanSm = windowWidth < 640;

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex flex-row justify-between items-center bg-darkGray px-10 py-2">
      <div className="text-3xl text-pink-100">Agora</div>
      <div>
        <>
          <FaShoppingCart />
        </>
      </div>

      {isLessThanSm ? (
        // Render the hamburger menu icon when the screen is small
        <div className="sm:flex">
          <div>
            <FaBars onClick={toggleMenu} className="cursor-pointer" />
          </div>
          {isMenuOpen && (
            <div className="">
              <ul className="sm:flex sm:flex-row sm:gap-4 start-0 ">
                <li className="flex flex-row items-center gap-1 text-white">
                  <FaShoppingCart />
                  <a href="/">Cart</a>
                </li>
                <li className="flex flex-row items-center gap-1 text-gray-400 ">
                  <FaUser />
                  <a href="/">Sign In</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        // Render header items under the logo
        <div>
          <ul className="sm:flex sm:flex-row sm:gap-4">
            <li className="flex flex-row items-center gap-1 text-white">
              <FaShoppingCart />
              <a href="/">Cart</a>
            </li>
            <li className="flex flex-row items-center gap-1 text-gray-400 ">
              <FaUser />
              <a href="/">Sign In</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
