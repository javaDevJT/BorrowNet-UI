import React, { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Button, TextField, Box, Typography, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Validation schema for the login using Yup
const loginSchema = object({
  email: string(),
  password: string()
});

// Login page component
const LoginPage = () => {
  const [showAlert, setShowAlert] = useState(false); // To show alert message if login fails
  const navigate = useNavigate(); // To navigate to another page
  const formik = useFormik({ // Formik hook to handle form state
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema, // Validation schema for the form
    onSubmit: async (values) => { // Submit handler
      try {
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        } else {
          const data = await response.json(); // Parse response data as JSON
          if (data.jwt) {
            localStorage.setItem('jwt', data.jwt); // If token is received, store it in local storage
            navigate('/home'); // Finally navigate to homepage
          } else {
            throw new Error('No token received');
          }
        }

      } catch (error) {
        console.error('Login error:', error);
        setShowAlert(true);
        //alert(error.message || 'Login failed. Please check your credentials and try again.');
      }
    },
  });

  return (
    <React.Fragment>
      {showAlert && (
        <Alert severity="error" variant='filled' sx={{ p:2 }}>
          Login failed. Incorrect email or password.
        </Alert>
        
      )}
      <Box
      component="form"
      onSubmit={formik.handleSubmit} // Form submit handler
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        width: '350px',
        margin: 'auto',
        marginTop: '200px',
        bgcolor: "secondary.main",
        borderRadius: 4,
        padding: 4,
        minWidth: '350px',
      }}
      noValidate // Disable browser validation
      autoComplete="off" // Disable autocomplete
    >
      <Typography variant="h4">Login</Typography>
      <TextField
        required
        fullWidth
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        fullWidth
        required
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      <Button color="primary" variant="contained" type="submit" sx ={{ borderRadius: 4 }}>
        Log In
      </Button>

      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ marginTop: 2 }}>
        <Typography variant="body2">Are you new?</Typography>
          <Button variant="outlined" size="small" onClick={() => navigate('/registration')} color="primary">
            Sign Up
          </Button>
      </Stack>
    </Box>
    </React.Fragment>
    
  );
};

export default LoginPage;