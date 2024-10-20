import React from 'react'
import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid2, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

const PostsComponent = ({ user }) => {

  const postList = ["1", "2", "3"];


  return (  
    <React.Fragment>
      <Typography
          variant="h3"
          sx={{my: 4, color: "primary.main"}}
          >
              Posts
      </Typography>
          <Grid2 container spacing={3}>
              {postList.map((post, index) => (
                  <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                      <Card
                        sx = {{borderRadius: 4}}
                      >
                        <CardHeader title="Hammer"/>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://tchristy.com/wp-content/uploads/sites/2/2022/11/TC.HM_.034.png"
                            alt="Hammer"
                        >
                        </CardMedia>
                      </Card>
                  </Grid2>

              ))}
          </Grid2>
      </React.Fragment>
  )
}

export default PostsComponent