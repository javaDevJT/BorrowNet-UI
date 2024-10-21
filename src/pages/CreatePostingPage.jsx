import React, { useState } from 'react'
import { useFormik } from 'formik';
import { number, object, string } from 'yup'
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Alert  } from '@mui/material'
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const newPostingSchema = object({
  title: string()
        .min(1, 'The title must be at least 1 character long')
        .max(30, 'The title must be at most 30 characters long')
        .matches(/^[a-zA-Z]+$/, 'The title must contain only letters')
        .required('Required'),
  description: string()
              .max(500, 'Description must be at most 500 characters')
              .matches(/^[a-zA-Z0-9]+$/, 'The description must contain only letters and numbers'),
  timeLimit: number()
            .positive()
            .integer()
            .max(30) // 30 days maximum
            .required('Required'),
  condition: string()
            .max(30, 'Must be at most 30 characters long')
            .required('Required'),
});


const CreatePostingPage = () => {
  const [showAlert, setShowAlert] = useState(false); // To show alert message if something goes wrong
  
  const navigate = useNavigate();

  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      timeLimit: '',
      condition: '',
    },
    validationSchema: newPostingSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/auth/new-post', {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Creation failed');
        } else {
            navigate('/home');
          }
        
      } catch (error) {
        console.error('Creation error:', error);
        setShowAlert(true);
      }
    },
  });

  return (
    <React.Fragment>
      {showAlert && (
        <Alert severity="error" variant='filled' sx={{ p:2 }}>
          Creation failed. Please check your information and try again.
        </Alert>
      )}
      <Box
        item xs={12}
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
          id="title"
          name="title"
          label="Title"
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <TextField
          sx={{
            marginTop: 2,
          }}
          fullWidth
          id="description"
          name="description"
          label="Description (Optional)"
          type="text"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <TextField
          sx={{
            marginTop: 2,
          }}
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

        <TextField
          sx={{
            marginTop: 2,
          }}
          fullWidth
          id="condition"
          name="condition"
          label="Condition"
          type="text"
          value={formik.values.condition}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.condition && Boolean(formik.errors.condition)}
          helperText={formik.touched.condition && formik.errors.condition}
        />

        <TextField
          sx={{
            marginTop: 2,
            marginBottom: 2,
          }}
          fullWidth
          id="image"
          name="image"
          label="Choose an image of the item"
          type="file"
          inputProps={{ accept: 'image/*' }}
          onChange={(event) => {
            formik.setFieldValue("picture", event.currentTarget.files[0]);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.picture && Boolean(formik.errors.picture)}
          helperText={formik.touched.picture && formik.errors.picture}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 4 }}>
            Create Posting
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default CreatePostingPage