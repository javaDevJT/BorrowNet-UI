import React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Button, TextField, Box, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const loginSchema = object({
  email: string().required('Required'),
  password: string().required('Required'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      // TODO
      console.log('Form submitted with values:', values);
      alert('Form is valid.');
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
        width: '300px',
        margin: 'auto',
        marginTop: '200px',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
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

      <Button color="primary" variant="contained" fullWidth type="submit">
        Log In
      </Button>
      
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
      <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
        Are you new?{' '}
        <Button variant="outlined" size="small" onClick={() => navigate('/registration')} color="primary">
          Sign Up
        </Button>
      </Typography>
      </Stack>
    </Box>
  );
};

export default LoginPage;