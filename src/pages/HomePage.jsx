import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Pagination, Stack, Typography } from '@mui/material';
import React from 'react'
import useAuthUser from "react-auth-kit/hooks/useAuthUser";



const HomePage = () => {
  const authUser = useAuthUser()
  console.log(authUser.firstName)

  const examplePost = {
    title: "Vintage Camera",
    description: "A classic vintage camera in great condition. Perfect for photography enthusiasts!",
    picture: "https://via.placeholder.com/150",  // Placeholder image URL
    timeLimit: "7 days",  // How long the item can be borrowed
    condition: "Good",
  };
  const postList = [examplePost, examplePost, examplePost, examplePost, examplePost];


  return (
    <React.Fragment>
      <Stack>
      {postList.map((post, index) => (
        <Card  key={index} sx={{ borderRadius: 4, my:1, mx:5}}>
          <CardContent> {/*onClick={() => handleOpen(index)} */}
            <Box sx={{display:'flex', flexDirection: 'row', justifyContent: "space-between", maxWidth: '100%', maxHeight: 150, minHeight: 150}}>
              <Box sx={{my:2, mx:3}}>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', my: 2 }}>
                  {post.description}
                </Typography>
              </Box>
              <Avatar variant='square' sx={{m:4, width: 120, height: 120}}/>
            </Box>
          </CardContent>
        </Card>
    ))}
        <Pagination count='3' sx={{        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',}}/>

      </Stack>

    </React.Fragment>
  )
}

export default HomePage