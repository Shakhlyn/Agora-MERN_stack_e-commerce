import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-white">
      <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 border-t-blue-600 animate-spin"></div>
    </div>
  );
};

export default Loader;
