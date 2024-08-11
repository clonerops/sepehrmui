import React, { ChangeEvent, useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import _ from 'lodash';

interface SearchBarProps {
  rows: any[];
  setFilteredRows: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ rows, setFilteredRows }) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value || '';
    const searchTerms = newQuery.split(' ').filter((term) => term.trim() !== '');
    // Update the query state
    setQuery(newQuery);
    // Debounce the search function (example uses lodash's debounce)
    debounceSearch(searchTerms);
  };

  const searchResults = useMemo(() => {
    // Implement your search logic here
    return rows?.filter((row) =>
      Object.values(row).some((value: any) =>
        value?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [rows, query]);

  const debounceSearch = useMemo(() => {
    // Debounce function using lodash's debounce
    return _.debounce((searchTerms: string[]) => {
      // Update the filtered rows with the new search results
      setFilteredRows(searchResults);
    }, 300);
  }, [searchResults, setFilteredRows]);

  return (
    <TextField
      label="جستجو"
      variant="outlined"
      fullWidth
      size="small"
      color="primary"
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
