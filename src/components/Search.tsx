import React from "react";
import { Input } from "./Input";
import { SearchProps } from "../models/UserModels";

function Search({ onSearch, searchValue }: SearchProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <Input
        value={searchValue}
        onChange={handleSearchChange}
        className="mt-5 w-72 rounded-3xl"
        placeholder="Search user"
        type="text"
      />
    </div>
  );
}

export default Search;
