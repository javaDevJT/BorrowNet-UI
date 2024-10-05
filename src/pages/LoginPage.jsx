import React from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Button, TextField, Box, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Validation schema for the login using Yup
const loginSchema = object({
  email: string(),
  password: string()
});

// Login page component
const LoginPage = () => {
  const navigate = useNavigate(); // Hook to navigate between pages
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      // TODO: Add login logic here, email and password are in values.email and values.password and must be present
      try {
        // Login API call
        // const response = await api.login(values);

       // const data = await response.json(); // Parse JSON response

        //localStorage.setItem('token', data.token);

        navigate('/home'); // Handle successful login, e.g., navigate to homepage
      } catch (error) {
        // TODO: Handle login error
      }
    },
  });

  return (
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
  );
};

export default LoginPage;