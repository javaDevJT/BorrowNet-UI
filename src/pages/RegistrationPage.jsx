import React from 'react'
import { date, object, string } from 'yup';
import { useFormik } from 'formik';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Validation schema for the registration using Yup
// IMPORTANT: email must be unique
const registrationSchema = object({
  first: string().required('Required'),
  last: string().required('Required'),
  date: date()
        .required('Required')
        .min(new Date('1900-01-01'), 'Invalid date')
        .max(new Date('2005-12-31'), 'Invalid date'),
  email: string().required('Required').email('Invalid email'),
  password: string()
            .min(8, 'Password must be at least 8 characters long')
            .max(64, 'Password must be at most 64 characters long')
            .matches(/[a-z]/, 'Must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least one special character')
            .required('Required'),
});

// Registration page component
const RegistrationPage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      first: '',
      last: '',
      date: '',
      email: '',
      password: '',
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        } else {
          const data = await response.json();
          if (data.token) {
            localStorage.setItem('token', data.token);
            navigate ('/home');
          } else {
            throw new Error('No token received');
          }
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert(error.message || 'Registration failed. Please check your information and try again.');
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
    <Typography variant="h4">Create an account</Typography>
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
      Done
    </Button>
  </Box>
  )
}

export default RegistrationPage