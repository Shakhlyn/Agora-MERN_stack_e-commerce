import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import PrivateRoute from "./components/PrivateRoute";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import store from "./store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomeScreen />} />
      <Route path="login" element={<LoginScreen />} />
      <Route path="register" element={<RegisterScreen />} />
      <Route path="cart" element={<CartScreen />} />
      <Route path="products/:id" element={<ProductScreen />} />

      {/* Private Routes for Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="shipping" element={<ShippingScreen />} />
        <Route path="payment" element={<PaymentMethodScreen />} />
        <Route path="placeorder" element={<PlaceOrderScreen />} />
        <Route path="orders/:id" element={<OrderScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
