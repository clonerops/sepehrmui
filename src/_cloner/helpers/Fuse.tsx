import React, { useState } from "react";
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
}: FuzzySearchProps<T>) => {

  const [query, setQuery] = useState("");

    
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
  
    if (inputValue === "") {
      setResults(data);
    } else {
      // Split the input value into individual terms
      const terms = inputValue.split(/\s+/).filter(Boolean); // Remove empty terms
  
      // Escape special characters in terms and create a regular expression pattern
      const pattern = terms.map((term) => term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")).join('.*');
  
      // Create a regular expression with the pattern
      const regex = new RegExp(pattern, 'i');
  
      // Helper function to get the value from an object given a nested key
      const getNestedValue = (obj: any, path: string) => {
        return path.split('.').reduce((value, key) => {
          return value && value[key] !== undefined ? value[key] : undefined;
        }, obj);
      };
  
      // Filter the data based on the regular expression
      const filteredResults = data.filter((item: any) => {
        const itemText = keys.map((key) => {
          const value = getNestedValue(item, key);
          return value ? String(value) : '';
        }).join(" ");
        return regex.test(itemText);
      });
  
      setResults(filteredResults);
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
