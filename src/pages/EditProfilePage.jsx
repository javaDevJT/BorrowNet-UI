import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { styled } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const Input = styled('input')({
  display: 'none',
});

const EditProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null); // State for the uploaded image
  const [userPreferencesData, setUserPreferencesData] = useState(null); // State for fetched data
  const [description, setDescription] = useState(''); // State for form description
  const [profileImage, setProfileImage] = useState(''); // State for profile image URL

  const navigate = useNavigate();

  
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Set selected image for preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Update description state as user types
  };

  useEffect(() => {
    fetch(`/api/preferences/1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUserPreferencesData(data);
        setDescription(data.profileDescription); // Set description field with fetched data
        setProfileImage(data.profilePicture); // Set initial profile image from fetched data
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);


  const handleSubmit = () => {
    // Prepare the data to be sent in the POST request
    const profileData = {
      id: 1,
      borrowDistanceKM: 10.00,
      profileDescription: description,
      profilePicture: selectedImage || profileImage, // Send base64 string or existing image
    };
  
    // POST request to save updated profile data as JSON
    fetch('/api/preferences/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer your-token-here', // Replace with tokeen
      },
      body: JSON.stringify(profileData), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Profile updated successfully:', data);
        navigate('/my-profile');
      })
      .catch((error) => {
        console.error('There was a problem with the update:', error);
      });
  };


  if (!userPreferencesData) {
    return <CircularProgress />;
  }

  return (
    <React.Fragment>
      <Typography variant="h3" sx={{ my: 4, px: 3, color: "primary.main" }}>
        Edit Profile
      </Typography>
      <Paper
        sx={{
          p: 2,
          m: 2,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box sx={{ m: 3 }}>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleImageChange}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<InsertPhotoIcon />}
            >
              Upload Profile Picture
            </Button>
          </label>
          {selectedImage ? (
            <Avatar
              alt="Uploaded Profile"
              src={selectedImage} // Preview newly uploaded image
              sx={{ width: 200, height: 200, m: 4 }}
            />
          ) : profileImage ? (
            <Avatar
              alt="Profile"
              src={profileImage} // Display fetched profile image
              sx={{ width: 200, height: 200, m: 4 }}
            />
          ) : (
            <Avatar
              sx={{ width: 200, height: 200, m: 4, bgcolor: deepOrange[500] }}
            >
              <Typography variant="h1">R</Typography>
            </Avatar>
          )}
        </Box>
        <TextField
          label="Description"
          multiline
          rows={8}
          variant="outlined"
          fullWidth
          value={description} // Set the value of the text field
          onChange={handleDescriptionChange} // Update the description state on change
          sx={{ mx: 4, my: 8 }}
        />
      </Paper>

      <Button
        color="primary"
        variant="contained"
        type="submit"
        onClick={handleSubmit} // Trigger form submission
        sx={{ borderRadius: 4, mx: 5, my: 1 }}
      >
        Done
      </Button>
    </React.Fragment>
  );
};

export default EditProfilePage;
