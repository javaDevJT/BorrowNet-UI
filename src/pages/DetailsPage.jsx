import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Avatar, TextField, Button } from '@mui/material';

const DetailsPage = () => {
  const location = useLocation();
  const { post } = location.state;
  const [rentalDays, setRentalDays] = useState(1);

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1 && value <= post.maxRentalDays) {
      setRentalDays(value);
    } else if (value > post.maxRentalDays) {
      setRentalDays(post.maxRentalDays);
    }
  };

  const handleBorrow = () => {
    console.log(`Borrowing for ${rentalDays} days`);
  }

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        {post.itemName}
      </Typography>
      <Avatar
        variant="square"
        src={post.itemPhoto ? `data:image/JPG;base64,${post.itemPhoto}` : 'src/assets/n-a-512.png'}
        alt={post.itemName}
        sx={{ width: 200, height: 200, mb: 2 }}
      />
      <Typography variant="body1" gutterBottom>
        {post.itemDescription || 'Description not available.'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Available for a maximum of {post.maxRentalDays} days
      </Typography>
      <Typography variant="body1" gutterBottom>
        Condition of the item: {post.condition}
      </Typography>
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 400 }}>
        <TextField
          label={`Choose a number of days`}
          type="number"
          value={rentalDays}
          onChange={handleChange}
          inputProps={{ min: 1, max: post.maxRentalDays }}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button /*type="submit"*/ onClick={handleBorrow} variant="contained" color="primary" sx={{ borderRadius: 4 }}>
            Borrow
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsPage;