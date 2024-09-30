import React from 'react'
import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid2, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

const PostsComponent = ({ posts }) => {

  return (  
    <React.Fragment>
      <Typography
          variant="h3"
          sx={{my: 4, color: "primary.main"}}
          >
              Posts
      </Typography>
          <Grid2 container spacing={3}>
              {posts.map((post) => (
                  <Grid2 item size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                      <Card
                        sx = {{borderRadius: 4}}
                      >
                        <CardHeader title="Hammer"/>
                        <CardMedia
                            component="img"
                            height="194"
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