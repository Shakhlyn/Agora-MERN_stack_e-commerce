import { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { clearCartItems, clearShippingAddress } from "../slices/cartSlice";

const Dropdown = ({ username }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi] = useLogoutMutation(); // to use the mutation, we have destructure in this way of normal hook destructure

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApi().unwrap(); //API call to the backend to clear the cookie
      dispatch(logout()); //To clear localStorage
      dispatch(clearCartItems()); //clear cartItems after logging out so that another user doesn't get current user's cart history.
      dispatch(clearShippingAddress()); //clear shipping address

      navigate("/login");
    } catch (error) {
      console.log(error?.error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="relative">
      <button
        className="text-white hover:text-gray-300 flex flex-row"
        onClick={toggleDropdown}
      >
        <div>{username}</div>
        <div className="flex self-end pb-[.15rem] ">
          {isDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      </button>
      {isDropdownOpen && (
        <>
          <ul className="absolute mt-2 -right-8 w-32 rounded-md bg-darkGray text-gray-100 shadow-md text-sm py-2 z-10">
            <li>
              <Link
                onClick={toggleDropdown}
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-700 overflow-hidden"
              >
                Profile
              </Link>
            </li>
            <hr />

            {userInfo.isAdmin && (
              <li>
                <Link
                  onClick={toggleDropdown}
                  to="/admin/orderlist"
                  className="block px-4 py-2 hover:bg-gray-700 overflow-hidden"
                >
                  Orders
                </Link>
              </li>
            )}

            {userInfo.isAdmin && (
              <li>
                <Link
                  onClick={toggleDropdown}
                  to="/admin/productlist"
                  className="block px-4 py-2 hover:bg-gray-700 overflow-hidden"
                >
                  Products
                </Link>
              </li>
            )}

            {userInfo.isAdmin && (
              <li>
                <Link
                  onClick={toggleDropdown}
                  to="/admin/userlist"
                  className="block px-4 py-2 hover:bg-gray-700 overflow-hidden"
                >
                  Users
                </Link>
              </li>
            )}

            <li>
              <Link
                onClick={logoutHandler}
                to="/"
                className="block px-4 py-2 hover:bg-gray-700 overflow-hidden"
              >
                Log out
              </Link>
            </li>
            <hr />
          </ul>
        </>
      )}
    </div>
  );
};

export default Dropdown;
