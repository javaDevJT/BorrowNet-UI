import { Avatar, Box, Card, CardContent, CardHeader, Paper, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const ProfileComponent = ({ user }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <Paper 
        elevation={10} 
        sx={{
          borderRadius: 4,
          maxWidth: '345px',
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          m: 5,

        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 4,
            p:4
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: red[500],
              width: 86, 
              height: 86,
            }}
          >
            X
          </Avatar>
          <Typography variant='h5'>{user.first_name + ' ' + user.second_name + ', ' + user.age}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 2,
            p:3
          }}
        >
          <Box>
            <Typography variant='h4'>45</Typography>
            <Typography>Reviews</Typography>
          </Box>
          <Box>
            <Typography variant='h4'>3.47</Typography>
            <Typography>Rating</Typography>
          </Box>
        </Box>
      </Paper>
      <Box
        sx={{

          m: 5,
        }}
      >
        <Typography variant='h2'>About Me</Typography>
        <Typography>{user.description}</Typography>
      </Box>

    </Box>
    
  )
}

export default ProfileComponent