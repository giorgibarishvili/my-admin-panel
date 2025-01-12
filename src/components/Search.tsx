import React, { useState } from "react";
import { Input } from "./Input";
import SearchIcon from "../assets/icons/magnifying-glass-solid.svg";
import Xmark from "../assets/icons/xmark-solid.svg";
import { SearchProps } from "../models/SearchModels";

function Search({ onSearch, searchValue }: SearchProps) {
  const [localQuery, setLocalQuery] = useState(searchValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch(localQuery);
  };

  const handleClearClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLocalQuery("");
    onSearch("");
  };
  return (
    <div className="ms-5 my-3">
      <Input
        value={localQuery}
        onChange={handleInputChange}
        className="mt-5 w-72 rounded-3xl flex justify-end"
        placeholder="Search user"
        type="text"
      >
        <div className="flex absolute">
          <button onClick={handleSearchClick} className="mt-1 mx-1">
            <img src={SearchIcon} alt="Search" />
          </button>
          <button onClick={handleClearClick} className="mt-1 mx-1">
            <img src={Xmark} alt="Clean search" />
          </button>
        </div>
      </Input>
    </div>
  );
}

export default Search;
