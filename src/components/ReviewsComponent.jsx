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
    const [open, setOpen] = React.useState(false);
    const [selectedReviewIndex, setSelectedReviewIndex] = React.useState(null);

    const { userData, loading, error } = useFetchUserData(id, authHeader);


    if (loading) {
      return <CircularProgress />;
    }

    if (error) {
      return <p>Error loading user data: {error.message}</p>;
    }

    const reviewsList = userData.ratingsReceived;
    console.log(reviewsList)


    const handleOpen = (index) => {
        setSelectedReviewIndex(index);
        setOpen(true);
    };      
    const handleClose = () => setOpen(false)

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
      <Typography
          variant="h3"
          sx={{my: 4, color: "primary.main"}}
          >
              Reviews
      </Typography>
          <Grid2 container spacing={3}>
              {reviewsList.map((review, index) => (
                  <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                      <Card
                        sx = {{borderRadius: 4}}
                      >
                        <CardActionArea onClick={() => handleOpen(index)}>
                            <CardHeader
                                avatar={
                                <Avatar sx={{ bgcolor: red[500] }}>
                                    A
                                </Avatar>
                                }
                                title={<Rating name="read-only" value={review.rating} readOnly />}
                                //subheader={1}
                                
                            />
                            <CardContent>
                                <Typography>{review.details}</Typography>
                            </CardContent>
                        </CardActionArea>
                      </Card>
                  </Grid2>
              ))}
          </Grid2>
          <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* Check if selectedReviewIndex is valid */}
                    {selectedReviewIndex !== null && selectedReviewIndex < reviewsList.length && (
                        <Card sx={{ borderRadius: 4 }}>
                            <CardActionArea onClick={() => redirectToProfile(1)}>
                                <CardHeader 
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} >
                                            A
                                        </Avatar>
                                    }
                                    title={<Rating name="read-only" value={reviewsList[selectedReviewIndex].rating} readOnly />}
                                    //subheader='Riccardo Morelli'
                                />
                            </CardActionArea>
                            <CardContent>
                                <Typography>{reviewsList[selectedReviewIndex].details}</Typography>
                            </CardContent>
                        </Card>
                    )}
                </Box>
            </Modal>
      </React.Fragment>
  )
}

export default ReviewsComponent