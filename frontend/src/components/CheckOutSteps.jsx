import React from "react";
import { NavLink } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = {
    login: step1,
    shipping: step2,
    payment: step3,
    order: step4,
  };

  const stepEntries = Object.entries(steps);

  return (
    <nav className="flex justify-center mb-4 gap-4">
      {stepEntries.map(([key, value]) => (
        <NavLink
          key={key}
          to={`/${key}`}
          className={`text-blue-500 hover:text-blue-700 ${
            value ? "" : "text-gray-300"
          }`}
          style={{ pointerEvents: value ? "auto" : "none" }}
        >
          {key.split("")[0].toUpperCase() + key.slice(1)}
        </NavLink>
      ))}
    </nav>
  );
};

export default CheckoutSteps;
