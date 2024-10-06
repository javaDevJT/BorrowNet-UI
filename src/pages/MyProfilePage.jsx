import React from 'react'
import userData from '../data.json'
import ProfileComponent from '../components/ProfileComponent';
import ReviewsComponent from '../components/ReviewsComponent';
import PostsComponent from '../components/PostsComponent';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const MyProfilePage = () => {

    const user = userData.find(user => user.id === 1);


    const navigate = useNavigate();

    const redirectToEditProfile = () => {
      navigate('/edit-profile');
    };
    
    return (
      <Box>
        <Button variant="contained" startIcon={<EditIcon />} color='primary' size='large' sx={{mx:6, marginTop:2}} onClick={redirectToEditProfile}>
            Edit
        </Button>
        <ProfileComponent user={user}/>
        <ReviewsComponent reviews={user.reviews}/>
        <PostsComponent posts={user.reviews}/>
      </Box>
    );
}

export default MyProfilePage