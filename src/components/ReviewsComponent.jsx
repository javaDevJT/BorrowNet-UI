import React from 'react'
import { Avatar, Card, CardContent, CardHeader, Grid2, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

const ReviewsComponent = ({ reviews }) => {

  const reviewsList = ["John", "Emily", "Mike", "Henry", "Gerald", "Marta", "Mattia"];
  const reviewContent = `Niente è paragonabile. Esiste forse cosa
      che non sia tutta sola con sé stessa e indicibile?
      Invano diamo nomi, solo è dato accettare
      e accordarci che forse qua un lampo, là uno sguardo
      ci abbia sfiorato, come
      se proprio in questo consistesse vivere
      la nostra vita.`
  return (  
    <React.Fragment>
      <Typography
          variant="h3"
          sx={{my: 4, color: "primary.main"}}
          >
              Reviews
      </Typography>
          <Grid2 container spacing={3}>
              {reviewsList.map((review) => (
                  <Grid2 item size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                      <Card
                        sx = {{borderRadius: 4}}
                      >
                          <CardHeader
                              avatar={
                              <Avatar sx={{ bgcolor: red[500] }}>
                                  {review.slice(0,1)}
                              </Avatar>
                              }
                              title={review}
                              subheader="September 14, 2016"
                          />
                          <CardContent>
                              <Typography>{reviewContent.slice(0,100)}</Typography>
                          </CardContent>
                      </Card>
                  </Grid2>

              ))}
          </Grid2>
      </React.Fragment>
  )
}

export default ReviewsComponent