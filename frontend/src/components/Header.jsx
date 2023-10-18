import { FaShoppingCart, FaUser } from "react-icons/fa";
import useWindowWidth from "../hooks/useWindowWidth";

const Header = () => {
  const windowWidth = useWindowWidth();
  const isLessThanSm = windowWidth < 640;

  return (
    <nav className=" flex flex-row justify-between items-center bg-darkGray px-10 py-2">
      <div className="text-3xl text-pink-100 ">Agora</div>
      <div>
        <ul className="flex flex-row gap-4">
          <li className="flex items-center ">
            <a href="/">
              <div className="flex flex-row items-center justify-between gap-1 text-white">
                <FaShoppingCart />
                {!isLessThanSm && <p>Cart</p>}
              </div>
            </a>
          </li>
          <li className="text-gray-400 ">
            <a href="/">
              <div className="flex flex-row items-center justify-between gap-1 ">
                {!isLessThanSm && (
                  <p>
                    <FaUser />
                  </p>
                )}
                <p>Login</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
