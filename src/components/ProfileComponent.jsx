import { Avatar, Box, Paper, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const ProfileComponent = ({ firstName, lastName, description, profilePicture }) => {
  return (
    <Box
      sx={{
        display: {xs: "flex", sm: "flex", md: "flex", lg: "flex"},
        flexDirection: {xs: "column", sm: "column", md: "row", lg: "row"},
        justifyContent: {xs: "space-between", sm: "space-between", md: "flex-start", lg: "flex-start"},
      }}
    >
      <Paper 
        elevation={10} 
        sx={{
          borderRadius: 4,
          maxWidth: '345px',
          minWidth: '345px',
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
            src={profilePicture} 
            sx={{ 
              bgcolor: red[500],
              width: 86, 
              height: 86,
            }}
          >
            
          </Avatar>
          <Typography variant='h5'>{ firstName + ' ' + lastName}</Typography>
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
        <Typography variant='h3' sx={{ color: "primary.main"}}>About Me</Typography>
        <Typography>{description}</Typography>
      </Box>

    </Box>
    
  )
}

export default ProfileComponent