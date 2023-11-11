import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ totalPages, currentPage, isAdmin = false }) => {
  return (
    totalPages > 1 && (
      <div className="flex justify-center mt-16">
        <ul className="flex flex-row gap-3">
          {[...Array(totalPages).keys()].map((x) => (
            <li key={x + 1}>
              <Link
                to={!isAdmin ? `/page/${x + 1}` : `/admin/productlist/${x + 1}`}
                className={`${
                  x + 1 === currentPage
                    ? "bg-darkGray text-white"
                    : "bg-gray-200 text-darkGray"
                } rounded-full w-8 h-8 text-center inline-flex items-center justify-center `}
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Paginate;
