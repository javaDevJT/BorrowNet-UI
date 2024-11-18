import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, Avatar, TextField, Button, CircularProgress, Paper } from '@mui/material';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from 'react-router-dom';
import useFetchUserData from '../components/useFetchUserData';

const DetailsPage = () => {
  const location = useLocation();
  const { post } = location.state;
  const [rentalDays, setRentalDays] = useState(1);

  const authHeader = useAuthHeader();

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 1 && value <= post.maxRentalDays) {
      setRentalDays(value);
    } else if (value > post.maxRentalDays) {
      setRentalDays(post.maxRentalDays);
    }
  };

  const { userData, loading, error } = useFetchUserData(post.lender, authHeader);
  const navigate = useNavigate();

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error loading user data: {error.message}</p>;
  }

  const handleBorrow = async () => {
    const dataToSend = {
      postingId: post.id,
      itemRequestLength: rentalDays
    };

    try {
      const response = await fetch('/api/posts/request', {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Request successful:', data);
      navigate('/my-requests');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{marginBottom: 4}}>
        {post.itemName}
      </Typography>

      <Paper sx={{display: 'flex', flexDirection: 'row', p:4, borderRadius: 4}}>
        <Avatar
          variant="square"
          src={post.itemPhoto ? `data:image/JPG;base64,${post.itemPhoto}` : 'src/assets/n-a-512.png'}
          alt={post.itemName}
          sx={{ width: 200, height: 200, mb: 2, borderRadius: 4, marginRight: 3, marginLeft: 1 }}
        />
        <Box>

          <Typography variant='h6'>Details</Typography>
          <Typography variant="body1" gutterBottom>
          {post.itemDescription || ''}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Available for a maximum of {post.maxRentalDays} days
          </Typography>
          <Typography variant="body1" gutterBottom>
            Condition of the item: {post.condition}
          </Typography>
          <Typography variant='h6'>Lender</Typography>
          <Typography
            variant="body1"
            component={Link}
            to={`/profile/${userData.id}`}
            sx={{ textDecoration: 'underline', color: 'inherit', cursor: 'pointer' }}          >
            {userData.firstName + ' ' + userData.lastName}
          </Typography>          
        </Box>


      </Paper>
      
      
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 530 }}>
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
          <Button type="submit" onClick={handleBorrow} variant="contained" color="primary" sx={{ borderRadius: 4 }}>
            Borrow
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsPage;