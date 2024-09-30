import React from 'react'
import { useParams } from 'react-router-dom';
import userData from '../data.json'
import ProfileComponent from '../components/ProfileComponent';
import ReviewsComponent from '../components/ReviewsComponent';
import PostsComponent from '../components/PostsComponent';
import { Box } from '@mui/material';

const ProfilePage = () => {
  
  const { id } = useParams();
  const userId = parseInt(id, 10);
  
  const user = userData.find(user => user.id === userId);
  
  if (!user) {
    return <p>User not found. {} </p>;
  }


  return (
    <Box>
      <ProfileComponent user={user}/>
      <ReviewsComponent reviews={user.reviews}/>
      <PostsComponent posts={user.reviews}/>
    </Box>
  );
}

export default ProfilePage