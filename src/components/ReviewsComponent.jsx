import React from 'react'
import { Avatar, Box, Card, CardActionArea, CardContent, CardHeader, CircularProgress, Grid2, Modal, Rating, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useFetchUserData from '../components/useFetchUserData'


const ReviewsComponent = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const authHeader = useAuthHeader();

    const { userData, loading, error } = useFetchUserData(id, authHeader);


    if (loading) {
      return <CircularProgress />;
    }

    if (error) {
      console.log(error.message);
      return;
    }

    const reviewsList = userData.ratingsReceived;
    console.log(reviewsList)

    const redirectToProfile = (profileId) => {
        navigate(`/profile/${profileId}`);
    };

      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        p: 4,
      };

  return (  
    <React.Fragment>
        {reviewsList.length >= 1 && (
        <Typography
            variant="h3"
            sx={{ my: 4, color: "primary.main" }}
        >
            Reviews
        </Typography>
        )}
          <Grid2 container spacing={3}>
              {reviewsList.map((review, index) => (
                  <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                      <Card
                        sx = {{borderRadius: 4}}
                      >
                        <CardActionArea onClick={() => redirectToProfile(review.submitter)}>
                            <CardHeader
                                title={<Rating name="read-only" value={review.rating} readOnly />}                                
                            />
                            <CardContent>
                                <Typography>{review.details}</Typography>
                            </CardContent>
                        </CardActionArea>
                      </Card>
                  </Grid2>
              ))}
          </Grid2>
          
      </React.Fragment>
  )
}

export default ReviewsComponent