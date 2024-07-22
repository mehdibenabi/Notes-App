import React, { useState, useEffect } from "react";
import "./navbar.css";
import ProfilInfo from "../ProfilInfo/ProfilInfo";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({userInfo}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(token);
  }, []);

  const onClearSearch = () => {
    setSearchQuery("");
  };

  const handleSearch = () => {
    console.log("searching for", searchQuery);
  };

  return (
    <div className="section-nav">
      <h2 className="titleNav">Notes</h2>

      {user ? (
        <div className="search-user-info">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClearSearch={onClearSearch}
            handleSearch={handleSearch}
          />
          <ProfilInfo userInfo={userInfo}/>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
