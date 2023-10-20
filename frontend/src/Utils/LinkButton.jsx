import React from "react";
import { Link } from "react-router-dom";

const LinkButton = (props) => {
  return (
    <>
      <Link
        to={props.to}
        className="bg-blue-500 hover:bg-blue-700 duration-200 text-white font-bold py-2 px-4 rounded text-center mobile:text-sm "
      >
        {props.button}
      </Link>
    </>
  );
};

export default LinkButton;
