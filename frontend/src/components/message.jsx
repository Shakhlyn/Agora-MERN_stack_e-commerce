import React from "react";

const Message = ({ variant, children }) => {
  // Define Tailwind CSS classes based on the variant
  const classes = {
    info: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };

  const containerClasses = `p-4 rounded-lg shadow-md ${classes[variant]}`;

  return <div className={containerClasses}>{children}</div>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
