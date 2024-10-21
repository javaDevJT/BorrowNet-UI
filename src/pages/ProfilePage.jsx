import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ProfileComponent from '../components/ProfileComponent';
import ReviewsComponent from '../components/ReviewsComponent';
import PostsComponent from '../components/PostsComponent';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import ReportIcon from '@mui/icons-material/Report';
import RateReviewIcon from '@mui/icons-material/RateReview';

const ProfilePage = () => {
  
  const { id } = useParams();

  const authHeader = useAuthHeader();
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

    useEffect(() => {
      // Example token from localStorage, replace with actual logic
      // GET user data
      fetch(`/api/user/public/${id}`, {
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


    const redirectToRatePage = () => {
      navigate(`/profile/${id}/rate`);
    };

    const redirectToReportPage = () => {
      navigate(`/profile/${id}/report`);
    };


  return (
    <React.Fragment>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" startIcon={<RateReviewIcon />} onClick={redirectToRatePage}>
          Rate
        </Button>
        <Button variant="contained" startIcon={<ReportIcon />} onClick={redirectToReportPage}>
          Report
        </Button>
      </Stack>
      <Box>
          <ProfileComponent firstName={userData.firstName} lastName={userData.lastName} description={userData.userPreferences.profileDescription} profilePicture={'data:image/JPG;base64,' + userData.userPreferences.profilePicture}/>
          <ReviewsComponent/>
          <PostsComponent/>    
      </Box>

    </React.Fragment>

  );
}

export default ProfilePage