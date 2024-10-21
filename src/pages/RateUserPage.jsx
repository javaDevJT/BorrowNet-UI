import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, CircularProgress, Paper, Rating, TextField, Typography } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { styled } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const RateUserPage = () => {

  const { profileId } = useParams();
  console.log(profileId)


  return (
    <React.Fragment>
      <Typography variant="h3" sx={{ my: 4, px: 3, color: "primary.main" }}>
        Leave a Review to 
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
          <Rating size='large'/>
        </Box>

        <TextField
            sx={{ mx: 6, my: 2 }}
            label="Written review"
            multiline
            rows={8}
            variant="outlined"
            //fullWidth
            //value={description} // Set the value of the text field
            //onChange={handleDescriptionChange} // Update the description state on change
            
          />

        
      </Paper>

      <Button
        color="primary"
        variant="contained"
        type="submit"
        //onClick={handleSubmit} // Trigger form submission
        sx={{ borderRadius: 4, mx: 5, my: 1 }}
      >
        Submit
      </Button>
    </React.Fragment>
  )
}

export default RateUserPage