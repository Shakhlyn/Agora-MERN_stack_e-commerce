import React from "react";

const Card = (props) => {
  return (
    <div className=" bg-gray-100 border-0 border-gray-150 shadow-md rounded-md p-3">
      {props.children}
    </div>
  );
};

export default Card;
