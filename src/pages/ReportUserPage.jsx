import React, { useState } from 'react';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchUserData from '../components/useFetchUserData'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const ReportUserPage = () => {
  
  const authHeader = useAuthHeader();
  const authUser = useAuthUser()
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState(''); // State for form description
  const [reason, setReason] = useState(''); // State for form reason


  const { userData, loading, error } = useFetchUserData(profileId, authHeader);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error loading user data: {error.message}</p>;
  }

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    // Prepare the data to be sent in the request
    const reportData = {
      reason: reason,
      details: description,
    };

    console.log(reportData);

    fetch(`/api/user/${profileId}/report`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(reportData), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to report profile');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Profile reported successfully:', data);
        navigate('/home');
      })
      .catch((error) => {
        console.error('There was a problem with the report:', error);
      });
  }

  return (
    <React.Fragment>
      <Typography variant="h3" sx={{ my: 4, px: 3, color: "primary.main" }}>
        Report {userData.firstName + ' ' + userData.lastName} 
      </Typography>
      <Paper
        sx={{
          p: 2,
          m: 2,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <FormControl sx={{ mx: 6, marginTop: 4, marginBottom: 1}}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="report-catogory-label"
            id="report-catogory"
            value={reason}
            label="ReportCategory"
            onChange={handleReasonChange}
          >
            <MenuItem value='SCAM'>Scam</MenuItem>
            <MenuItem value='HARASSMENT'>Harrassment</MenuItem>
            <MenuItem value='OTHER'>Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
            sx={{ mx: 6, my: 2 }}
            label="Description"
            multiline
            rows={8}
            variant="outlined"
            value={description} // Set the value of the text field
            onChange={handleDescriptionChange} // Update the description state on change
            
          />

        
      </Paper>

      <Button
        color="primary"
        variant="contained"
        type="submit"
        onClick={handleSubmit} // Trigger form submission
        sx={{ borderRadius: 4, mx: 5, my: 1 }}
      >
        Submit
      </Button>
    </React.Fragment>
  )
}

export default ReportUserPage