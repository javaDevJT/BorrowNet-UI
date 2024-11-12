import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const SearchBarComponent = ({ postList, setFilteredPostList }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);

    // Filter the post list based on the search query
    const filteredPosts = postList.filter((post) => 
      post.itemName.toLowerCase().includes(searchQuery) || 
      (post.itemDescription && post.itemDescription.toLowerCase().includes(searchQuery))
    );

    // Update the filtered post list in HomePage
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