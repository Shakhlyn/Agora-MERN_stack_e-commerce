import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
  // The replace prop is used to indicate that you want to replace the current route in the navigation history
  // with the new one instead of pushing a new entry onto the history stack. This means that the user cannot navigate
  // back to the previous route using the browser's back button.
};

export default PrivateRoute;
