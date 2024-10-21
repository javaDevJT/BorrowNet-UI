import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Rating, Select, TextField, Typography } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { styled } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const ReportUserPage = () => {

  const { profileId } = useParams();
  console.log(profileId)


  const [reportCategory, setReportCategory] = React.useState('');

  const handleChange = (event) => {
    setReportCategory(event.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h3" sx={{ my: 4, px: 3, color: "primary.main" }}>
        Report ... 
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
            value={reportCategory}
            label="ReportCategory"
            onChange={handleChange}
          >
            <MenuItem value='scam'>Scam</MenuItem>
            <MenuItem value='harrassment'>Harrassment</MenuItem>
            <MenuItem value='other'>Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
            sx={{ mx: 6, my: 2 }}
            label="Description"
            multiline
            rows={8}
            variant="outlined"
            //fullWidth
            //value={description} // Set the value of the text field
            //onChange={handleDescriptionChange} // Update the description state on change
            
          />

        
      </Paper>

      <Button
        color="primary"
        variant="contained"
        type="submit"
        //onClick={handleSubmit} // Trigger form submission
        sx={{ borderRadius: 4, mx: 5, my: 1 }}
      >
        Submit
      </Button>
    </React.Fragment>
  )
}

export default ReportUserPage