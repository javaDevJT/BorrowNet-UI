import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ProfileComponent from '../components/ProfileComponent';
import ReviewsComponent from '../components/ReviewsComponent';
import PostsComponent from '../components/PostsComponent';
import { Box, CircularProgress } from '@mui/material';

const ProfilePage = () => {
  
  const { id } = useParams();
  //const userId = parseInt(id, 10);

  const [userData, setUserData] = useState(null);

    useEffect(() => {
      // Example token from localStorage, replace with actual logic
      // const token = localStorage.getItem('authToken');
  
      // GET user data
      fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: {
          //'Authorization': `Bearer ${token}`,
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
        <ProfileComponent firstName={userData.firstName} lastName={userData.lastName} description={userData.userPreferences.profileDescription} profilePicture={userData.userPreferences.profilePicture}/> 
        <ReviewsComponent/>
        <PostsComponent/>    
    </Box>
  );
}

export default ProfilePage