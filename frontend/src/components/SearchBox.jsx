import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { useGetProductsQuery } from "../slices/productsApiSlice";

const SearchBox = () => {
  const { searchKeyword } = useParams();
  const [urlSearchKeyword, setUrlSearchKeyword] = useState(searchKeyword || "");

  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (urlSearchKeyword.trim()) {
      setUrlSearchKeyword("");
      navigate(`/s/${urlSearchKeyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={searchHandler} className="flex flex-row gap-3 text:mobile">
      <input
        className=" px-2 py-1 rounded-md "
        type="text"
        placeholder="Search what you want"
        name="search"
        value={urlSearchKeyword || ""}
        onChange={(e) => setUrlSearchKeyword(e.target.value)}
      />
      <button
        type="submit"
        className=" border-solid border-white bg-slate-200 text-darkGray px-2 py-1 rounded-lg"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
