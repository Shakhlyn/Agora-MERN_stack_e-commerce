import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomeScreen />} />
      <Route path="login" element={<LoginScreen />} />
      <Route path="cart" element={<CartScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
