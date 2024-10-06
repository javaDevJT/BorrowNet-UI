import React, { useState } from 'react'
import { date, object, string } from 'yup';
import { useFormik } from 'formik';
import { Button, TextField, Box, Typography, Alert, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Validation schema for the registration using Yup
const registrationSchema = object({
  first: string()
        .min(1, 'First name must be at least 1 character long')
        .matches(/^[a-zA-Z]+$/, 'First name must contain only letters')
        .required('Required'),
  last: string()
        .min(1, 'Last name must be at least 1 character long')
        .matches(/^[a-zA-Z]+$/, 'Last name must contain only letters')
        .required('Required'),
  date: date().required('Required'),
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
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        setShowAlert(true);
        //alert(error.message || 'Registration failed. Please check your information and try again.');
      }
    },
  });

  return (
    <React.Fragment>
    {showAlert && (
      <Alert severity="error" variant='filled' sx={{ p:2 }}>
        Registration failed. Please check your information and try again.
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
      marginTop: '100px',
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
      id="first"
      name="first"
      label="First name"
      type="text"
      value={formik.values.first}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.first && Boolean(formik.errors.first)}
      helperText={formik.touched.first && formik.errors.first}
    />

    <TextField
      fullWidth
      id="last"
      name="last"
      label="Last name"
      type="text"
      value={formik.values.last}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.last && Boolean(formik.errors.last)}
      helperText={formik.touched.last && formik.errors.last}
    />

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        id="date"
        name="date"
        label="Date of birth"
        value={formik.values.date ? dayjs(formik.values.date) : null}
        onChange={(value) => formik.setFieldValue('date', value)}
      />
    </LocalizationProvider>

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
      type={showPassword ? 'text' : 'password'}
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.password && Boolean(formik.errors.password)}
      helperText={formik.touched.password && formik.errors.password}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(event) => event.preventDefault()}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
  />

    <Button color="primary" variant="contained" type="submit" sx ={{ borderRadius: 4 }}>
      Done <CheckIcon />
    </Button>
  </Box>
  </React.Fragment>
  )
}

export default RegistrationPage