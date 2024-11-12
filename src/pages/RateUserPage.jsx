import React, { useState } from 'react';
import { Box, Button, CircularProgress, Paper, Rating, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useFetchUserData from '../components/useFetchUserData';

const RateUserPage = () => {

  const authHeader = useAuthHeader();
  const authUser = useAuthUser()
  const { profileId } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState(''); // State for form description
  const [rate, setRate] = useState(5); // State for form rate

  const { userData, loading, error } = useFetchUserData(profileId, authHeader);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error loading user data: {error.message}</p>;
  }



  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleRateChange = (event, newValue) => {
    setRate(newValue);
  }

  const handleSubmit = () => {
    // Prepare the data to be sent in the request
    const reviewData = {
      rating: rate,
      details: description,
    };

    console.log(reviewData);

    fetch(`/api/user/${profileId}/rate`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(reviewData), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to rate profile');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Profile rated successfully:', data);
        navigate('/home');
      })
      .catch((error) => {
        console.error('There was a problem with edit:', error);
      });
  }

  return (
    <React.Fragment>
      <Typography variant="h3" sx={{ my: 4, px: 3, color: "primary.main" }}>
        Leave a review to {userData.firstName}
      </Typography>
      <Paper
        sx={{
          p: 2,
          m: 2,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ mx: 6, marginTop: 3}}>
          <Typography sx={{marginBottom: 1}}>Overall Rating</Typography>
          <Rating
            size='large'
            value={rate}
            onChange={handleRateChange}
      />
        </Box>

        <TextField
            sx={{ mx: 6, my: 2 }}
            label="Written review"
            multiline
            rows={8}
            variant="outlined"
            value={description} // Set the value of the text field
            onChange={handleDescriptionChange} // Update the description state on change
            
          />

        
      </Paper>

      <Button
        color="primary"
        variant="contained"
        type="submit"
        onClick={handleSubmit} // Trigger form submission
        sx={{ borderRadius: 4, mx: 5, my: 1 }}
      >
        Submit
      </Button>
    </React.Fragment>
  )
}

export default RateUserPage