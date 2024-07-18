import React from "react";
import "./searchBar.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ onChange, value, onClearSearch ,handleSearch}) => {
  
  
  
    return (
      <div className="input-sec">
        <input
          onChange={onChange}
          value={value}
          className="input-search-bar"
          placeholder="Search a Note"
        />

        {value && (
          <IoMdClose
            size={40}
            className="icon-search-bar"
            onClick={onClearSearch}
          />
        )}
        <FaMagnifyingGlass
          className="icon-search-bar-2"
          onClick={handleSearch}
        />
      </div>
    );
};

export default SearchBar;
