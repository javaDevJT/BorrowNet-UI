import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const SearchBarComponent = ({ postList, setFilteredPostList }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);

    // Filter postList based on the search query
    const filteredPosts = postList.filter((post) => 
      post.itemName.toLowerCase().includes(searchQuery));

    // Update filtered postList in HomePage
    setFilteredPostList(filteredPosts);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div>
            <TextField
            id="outlined-basic"
            variant="outlined"
            label="Search Items"
            value={query}
            onChange={handleSearchChange}
            fullWidth
            margin="normal"
            InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
        </div>
    </div>
);
};

export default SearchBarComponent;