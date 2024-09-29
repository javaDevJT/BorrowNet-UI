import React from 'react'
import { useParams } from 'react-router-dom';
import userData from '../data.json'
import ProfileComponent from '../components/ProfileComponent';
import ReviewsComponent from '../components/ReviewsComponent';

const ProfilePage = () => {
  
  const { id } = useParams();
  const userId = parseInt(id, 10);
  
  const user = userData.find(user => user.id === userId);
  
  if (!user) {
    return <p>User not found. {} </p>;
  }


  return (
    <div>
      <ProfileComponent user={user}/>
      <ReviewsComponent reviews={user.reviews}/>
    </div>
  );
}

export default ProfilePage