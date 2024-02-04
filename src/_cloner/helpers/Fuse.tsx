import React, { useState } from "react";
import Fuse from "fuse.js";
import { InputAdornment, TextField } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";

interface FuzzySearchProps<T> {
  data: T[];
  keys: string[];
  threshold?: number;
  setResults: any;
}

const FuzzySearch = <T extends {}>({
  data,
  keys,
  setResults,
  threshold = 0,
}: FuzzySearchProps<T>) => {

  const [query, setQuery] = useState("");

  const fuse = new Fuse(data, {
    keys,
    includeScore: true,
    threshold,
    findAllMatches: true,
    includeMatches: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    if (inputValue === "") {
      setResults(data);
    } else {
      const fuzzyResults = fuse.search(inputValue);
      setResults(fuzzyResults.map((result) => result.item));
    }
  };

  return (
    <>
      <TextField
        value={query}
        onChange={handleInputChange}
        color="primary"
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <SearchRounded />
          </InputAdornment>,
        }}
        fullWidth
        size="small"
        label={"جستجو پیشرفته"}
      />
    </>
  );
};

export default FuzzySearch;
