import React, { useState } from "react";
import { Input } from "./Input";

function Search() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        className="mt-5 w-72 rounded-3xl"
        placeholder="Search user"
        type="text"
      />
    </div>
  );
}
export default Search;
