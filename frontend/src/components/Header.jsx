import { FaShoppingCart, FaUser } from "react-icons/fa";
import useWindowWidth from "../hooks/useWindowWidth";

const Header = () => {
  const windowWidth = useWindowWidth();
  const isLessThanSm = windowWidth < 640;

  return (
    <nav className=" flex flex-row justify-between items-center bg-gray px-10 py-2">
      <div className="text-3xl text-pink-100 ">Agora</div>
      <div>
        {isLessThanSm ? (
          <div>Items</div>
        ) : (
          <ul className="sm:flex sm:flex-row sm:gap-4">
            <li className="flex flex-row items-center gap-1 text-blue-50">
              <FaShoppingCart />
              <a href="/">Cart</a>
            </li>
            <li className="flex flex-row items-center gap-1 text-gray-400">
              <FaUser />
              <a href="/">Sign In</a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
