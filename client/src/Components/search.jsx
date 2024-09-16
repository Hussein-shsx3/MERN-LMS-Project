import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchToggle } from "../redux/searchSlice";

const Search = () => {
  const searchD = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const searchDisaplay = () => {
    dispatch(searchToggle());
  };
  return (
    <div
      className={`w-full flex ${searchD.display} justify-center items-center py-5 bg-gray-50 border-b-[1px] gap-2 `}
      id="search"
    >
      <div className="flex justify-center items-center w-[50%] h-[38px] border-[1px] border-gray-400 rounded-[50px] ">
        <input
          type="text"
          className="outline-none w-[90%] h-[38px] text-sm bg-transparent"
          placeholder="Search"
        />
        <i className="bx bx-search text-[22px] text-text translate-y-[2px] cursor-pointer"></i>
      </div>
      <i
        className="bx bx-x text-[25px] text-text cursor-pointer"
        onClick={searchDisaplay}
      ></i>
    </div>
  );
};

export default Search;
