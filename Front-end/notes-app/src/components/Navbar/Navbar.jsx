import React from "react";
import "./navbar.css";
import ProfilInfo from "../ProfilInfo/ProfilInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";


const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onClearSearch = () =>{
    setSearchQuery("");
  }
  const handleSearch = () => {
    console.log("searching for", searchQuery);
  }
  return (
    <div className="section-nav">
      <h2 className="titleNav">Notes</h2>

      <SearchBar
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onClearSearch={onClearSearch}
      handleSearch={handleSearch}
      />

      <ProfilInfo />
    </div>
  );
};

export default Navbar;
