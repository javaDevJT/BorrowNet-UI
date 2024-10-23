import React, { useEffect, useState } from 'react';
import ProfileComponent from '../components/ProfileComponent';
import ReviewsComponent from '../components/ReviewsComponent';
import PostsComponent from '../components/PostsComponent';
import { Box, Button, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const MyProfilePage = () => {

    const authHeader = useAuthHeader();

    const navigate = useNavigate();

    const redirectToEditProfile = () => {
      navigate('/edit-profile');
    };

    const [userData, setUserData] = useState(null);

    useEffect(() => {
      

      // GET user data
      fetch('/api/user', {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }, []);
  
    if (!userData) {
      return (
        <CircularProgress/>
      );
    }

    
    return (
      <Box>
        <Button variant="contained" startIcon={<EditIcon />} color='primary' size='large' sx={{mx:6, marginTop:2}} onClick={redirectToEditProfile}>
            Edit
        </Button>
        <ProfileComponent firstName={userData.firstName} lastName={userData.lastName} description={userData.userPreferences.profileDescription} profilePicture={'data:image/JPG;base64,' + userData.userPreferences.profilePicture}/>
        <ReviewsComponent/>
        <PostsComponent/>    
      </Box>
    );
}

export default MyProfilePage