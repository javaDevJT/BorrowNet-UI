import React, { useState } from 'react';
import { Avatar, Box, Button, Paper, Stack, TextField, TextareaAutosize, Typography } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { styled } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';


const Input = styled('input')({
  display: 'none',
});




const EditProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  

  return (
    <React.Fragment>
      <Typography variant='h3' sx={{my: 4, px: 3,  color: "primary.main"}}>Edit Profile</Typography>
      <Paper
        sx={{
          p:2,
          m:2,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box sx={{m:3}}>
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImageChange} />
            <Button variant="contained" component="span" startIcon={<InsertPhotoIcon />}>
              Upload Profile Picture
            </Button>
          </label>
          {selectedImage ? (
            <Avatar
            alt=""
            src={selectedImage}
            sx={{ width:200, height: 200, m: 4 }}
          />
          )
            :
          (
            <Avatar sx={{ width:200, height: 200, m: 4, bgcolor: deepOrange[500] }}>
              <Typography variant='h1'>R</Typography>
            </Avatar>
          )
          }
        </Box>
        <TextField
          label="Description"
          multiline
          rows={8}
          variant="outlined"
          fullWidth
          sx = {{mx:4, my:8}}
        />
      </Paper>

      <Button color="primary" variant="contained" type="submit" sx ={{ borderRadius: 4, mx:5, my:1}}>
        Done
      </Button>

    </React.Fragment>
  )
}

export default EditProfilePage