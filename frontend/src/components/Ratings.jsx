import React from "react";
import { FaStar } from "react-icons/fa";

const Ratings = (props) => {
  return (
    <>
      <div className="flex flex-row gap-2 items-center text-sm mb-1">
        <div className="flex flex-row gap-1 items-center">
          <FaStar className="text-yellow-500 inline" />
          <p>
            <strong>{props.rating}</strong>
          </p>
        </div>

        <p>({props.ratingNumber} reviews)</p>
      </div>
    </>
  );
};

export default Ratings;
