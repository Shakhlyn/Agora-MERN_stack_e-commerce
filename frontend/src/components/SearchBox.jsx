import { FaSistrix } from "react-icons/fa6";

import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

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
    <form onSubmit={searchHandler} className="flex flex-row mx-1">
      <input
        className=" px-2 py-1 rounded-s text-mobile sm:text-sm mobile:w-32 md:w-96 "
        type="text"
        placeholder="Search what you want"
        name="search"
        value={urlSearchKeyword || ""}
        onChange={(e) => setUrlSearchKeyword(e.target.value)}
      />
      <button
        type="submit"
        className=" px-2 py-1 bg-slate-400 hover:bg-slate-300 text-slate-100 hover:text-darkGray duration-300 rounded-e text-mobile sm:text-sm"
      >
        <FaSistrix />
        {/* Search */}
      </button>
    </form>
  );
};

export default SearchBox;
