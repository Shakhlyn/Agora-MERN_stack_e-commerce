import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
    // The replace prop is used to indicate that you want to replace the current route in the navigation history
    // with the new one instead of pushing a new entry onto the history stack. This means that the user cannot navigate
    // back to the previous route using the browser's back button.
  );
};

export default AdminRoute;
