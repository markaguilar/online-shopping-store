import React, { ChangeEventHandler } from "react";
import MagnifyingGlass from "../../../asset/svg/magnifyingGlass";

interface SearchProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Search: React.FC<SearchProps> = ({ onChange }) => {
  return (
    <div className="relative z-0">
      <input
        onChange={onChange}
        className="w-full h-10 border border-gray-300 pl-9 p-3 rounded focus:outline-none"
        placeholder="Search Item"
      />
      <MagnifyingGlass className="absolute w-6 top-2 left-2 text-gray-500" />
    </div>
  );
};

export default Search;
