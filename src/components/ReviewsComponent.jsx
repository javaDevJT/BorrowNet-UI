import React from 'react'
import { Avatar, Box, Card, CardActionArea, CardContent, CardHeader, Grid2, Modal, Rating, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const ReviewsComponent = ({ user }) => {


    const navigate = useNavigate();

    const reviewsList = ["John", "Emily", "Mike", "Henry", "Gerald", "Marta", "Mattia"];
    const reviewContent = `Niente è paragonabile. Esiste forse cosa
      che non sia tutta sola con sé stessa e indicibile?
      Invano diamo nomi, solo è dato accettare
      e accordarci che forse qua un lampo, là uno sguardo
      ci abbia sfiorato, come
      se proprio in questo consistesse vivere
      la nostra vita.`

    const [open, setOpen] = React.useState(false);
    const [selectedReviewIndex, setSelectedReviewIndex] = React.useState(null);
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
                                    {review.slice(0,1)}
                                </Avatar>
                                }
                                //subheader={review}
                                title={<Rating name="read-only" value={3} readOnly />}
                                subheader={review}
                                
                            />
                            <CardContent>
                                <Typography>{reviewContent.slice(0,100) + " ..."}</Typography>
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
                                            {reviewsList[selectedReviewIndex].slice(0, 1)}
                                        </Avatar>
                                    }
                                    title={<Rating name="read-only" value={3} readOnly />}
                                    subheader='Riccardo Morelli'
                                />
                            </CardActionArea>
                            <CardContent>
                                <Typography>{reviewContent}</Typography>
                            </CardContent>
                        </Card>
                    )}
                </Box>
            </Modal>
      </React.Fragment>
  )
}

export default ReviewsComponent