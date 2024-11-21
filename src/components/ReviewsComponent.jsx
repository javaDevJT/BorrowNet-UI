import React, { useEffect, useState } from 'react';
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CircularProgress, Grid2, Rating, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useFetchUserData from '../components/useFetchUserData';

const ReviewsComponent = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const authHeader = useAuthHeader();

    const { userData, loading, error } = useFetchUserData(id, authHeader);
    const [submittersData, setSubmittersData] = useState({});
    const [submittersLoading, setSubmittersLoading] = useState(true);

    useEffect(() => {
      if (userData && userData.ratingsReceived) {
        const fetchSubmitters = async () => {
          const submitterIds = userData.ratingsReceived.map(
            (review) => review.submitter
          );
          const uniqueSubmitterIds = [...new Set(submitterIds)];
  
          try {
            const responses = await Promise.all(
              uniqueSubmitterIds.map((submitterId) =>
                fetch(`/api/user/public/${submitterId}`, {
                  headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json',
                  },
                }).then((response) => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
              )
            );
  
            const submittersDataMap = {};
            responses.forEach((data) => {
              submittersDataMap[data.id] = data;
            });
  
            setSubmittersData(submittersDataMap);
          } catch (error) {
            console.error(
              'There was a problem with the fetch operation:',
              error
            );
          } finally {
            setSubmittersLoading(false);
            console.log(submittersData);
          }
        };
  
        fetchSubmitters();
      }
    }, [userData, authHeader, id]);

    if (loading || submittersLoading) {
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
                          avatar={
                            submittersData[review.submitter] ? (
                              <Avatar src={'data:image/JPG;base64,' + submittersData[review.submitter].userPreferences.profilePicture} />
                            ) : (
                              <Avatar>X</Avatar>
                            )
                          }
                                title={<Rating name="read-only" value={review.rating} readOnly />} 
                                subheader={
                                  submittersData[review.submitter]
                                    ? `${submittersData[review.submitter].firstName} ${submittersData[review.submitter].lastName}`
                                    : 'Loading...'
                                }/>
                                
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