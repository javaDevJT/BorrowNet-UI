import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileComponent from '../components/ProfileComponent';
import ReviewsComponent from '../components/ReviewsComponent';
import PostsComponent from '../components/PostsComponent';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import ReportIcon from '@mui/icons-material/Report';
import RateReviewIcon from '@mui/icons-material/RateReview';
import useFetchUserData from '../components/useFetchUserData';
import ChatIcon from '@mui/icons-material/Chat';

const ProfilePage = () => {
  
    const { id } = useParams();

    const authHeader = useAuthHeader();
    const navigate = useNavigate();
    const { userData, loading, error } = useFetchUserData(id, authHeader);

    if (loading) {
      return <CircularProgress />;
    }

    if (error) {
      return <p>Error loading user data: {error.message}</p>;
    }


    const redirectToRatePage = () => {
      navigate(`/profile/${id}/rate`);
    };

    const redirectToReportPage = () => {
      navigate(`/profile/${id}/report`);
    };

    const redirectToChatPage = () => {
      navigate(`/chat/${id}`);
    };


  return (
    <React.Fragment>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" startIcon={<ChatIcon />} onClick={redirectToChatPage}>
          Send message
        </Button>
        <Button variant="contained" startIcon={<RateReviewIcon />} onClick={redirectToRatePage}>
          Rate
        </Button>
        <Button variant="contained" startIcon={<ReportIcon />} onClick={redirectToReportPage}>
          Report
        </Button>
      </Stack>
      <Box>
          <ProfileComponent id={id} firstName={userData.firstName} lastName={userData.lastName} description={userData.userPreferences.profileDescription} profilePicture={'data:image/JPG;base64,' + userData.userPreferences.profilePicture} ratings={userData.ratingsReceived}/>
          <ReviewsComponent/>
      </Box>

    </React.Fragment>

  );
}

export default ProfilePage