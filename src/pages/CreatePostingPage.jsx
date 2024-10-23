import React, { useState } from 'react'
import { useFormik } from 'formik';
import { number, object, string } from 'yup'
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, TextField, Typography, Box, Alert, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const newPostingSchema = object({
  itemName: string()
    .min(1, 'The title must be at least 1 character long')
    .max(30, 'The title must be at most 30 characters long')
    .matches(/^[a-zA-Z]+$/, 'The title must contain only letters')
    .required('Required'),
  itemDescription: string()
    .max(500, 'Description must be at most 500 characters'),
  timeLimit: number()
    .positive()
    .integer()
    .max(30, 'Time Limit is 30 days')
    .required('Required'),
  condition: string()
    .max(30, 'Must be at most 30 characters long')
    .required('Required')
});

const CreatePostingPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      itemName: '',
      itemDescription: '',
      itemPhoto: '',
      timeLimit: '',
      condition: '',
    },
    validationSchema: newPostingSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('itemName', values.itemName);
        formData.append('itemDescription', values.itemDescription || '');
        formData.append('timeLimit', values.timeLimit);
        formData.append('condition', values.condition);
        if (selectedImage) {
          formData.append('itemPhoto', selectedImage); // Add the item image to form data
        }

        const response = await fetch('/api/auth/new-post', {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Creation failed');
        } else {
          navigate('/home'); // Redirect to home page where the new posting will be displayed
        }
      } catch (error) {
        console.error(error);
        setShowAlert(true);
      }
    },
  });

  return (
    <React.Fragment>
      {showAlert && (
        <Alert severity="error" variant='filled' sx={{ p: 2 }}>
          Creation failed. Please check your information and try again.
        </Alert>
      )}
      <Box
        xs={12}
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
        sx={{
          width: '500px',
          margin: 'auto',
          padding: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          New Posting
        </Typography>

        <TextField
          fullWidth
          id="itemName"
          name="itemName"
          label="Title"
          type="text"
          value={formik.values.itemName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.itemName && Boolean(formik.errors.itemName)}
          helperText={formik.touched.itemName && formik.errors.itemName}
        />

        <TextField
          sx={{ marginTop: 2 }}
          fullWidth
          id="itemDescription"
          name="itemDescription"
          label="Description (Optional)"
          type="text"
          multiline
          rows={4}
          value={formik.values.itemDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.itemDescription && Boolean(formik.errors.itemDescription)}
          helperText={formik.touched.itemDescription && formik.errors.itemDescription}
        />

        <TextField
          sx={{ marginTop: 2 }}
          fullWidth
          id="timeLimit"
          name="timeLimit"
          label="Time Limit (days)"
          type="number"
          inputProps={{ min: 1, max: 30 }}
          value={formik.values.timeLimit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.timeLimit && Boolean(formik.errors.timeLimit)}
          helperText={formik.touched.timeLimit && formik.errors.timeLimit}
        />

        <FormControl fullWidth sx={{ marginTop: 2 }} error={formik.touched.condition && Boolean(formik.errors.condition)}>
          <InputLabel id="condition-label">Condition</InputLabel>
          <Select
            labelId="condition-label"
            id="condition"
            name="condition"
            value={formik.values.condition}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Condition"
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="GoodCondition">Good Condition</MenuItem>
            <MenuItem value="BadCondition">Bad Condition</MenuItem>
          </Select>
          {formik.touched.condition && formik.errors.condition && (
            <FormHelperText>{formik.errors.condition}</FormHelperText>
          )}
        </FormControl>

        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<InsertPhotoIcon />}
              sx={{ width: '100%' }}
            >
              Upload Image
            </Button>
          </label>

          {selectedImage && (
            <Avatar
              variant="square"
              alt="Preview"
              src={URL.createObjectURL(selectedImage)} // Preview uploaded image
              sx={{ width: 200, height: 200, m: 4 }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 4 }}>
            Create Posting
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default CreatePostingPage;