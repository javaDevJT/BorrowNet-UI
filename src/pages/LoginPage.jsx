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
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        } else {
          const data = await response.json();
          if (data.token) {
            localStorage.setItem('token', data.token);
            navigate('/home'); // Navigate to homepage if login is successful
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
      onSubmit={formik.handleSubmit}
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
      noValidate
      autoComplete="off"
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