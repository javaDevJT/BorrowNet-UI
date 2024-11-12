import React from 'react'

/*
  SettingsPage is a page that contains the settings of the application.
  It should contain the following:
  - language of the application
  - theme of the application (light or dark)
  - maximum distance preference for browsing postings (with a default value of 1 km)
*/

import { Formik, Form, Field } from 'formik';
import { Button, FormControl, FormLabel, MenuItem, Select, InputLabel, Typography, Switch, TextField, Box } from '@mui/material';

const SettingsPage = () => {
  const initialValues = {
    language: 'en',
    theme: 'light',
    maxDistance: 1,
  };

  const handleSubmit = (values) => {
    console.log('Settings:', values);
  };

  return (
    <div style={{ padding: '2rem', width: '500px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <FormControl fullWidth margin="normal">
              <InputLabel id="language-label">Language</InputLabel>
              <Select
                labelId="language-label"
                id="language"
                name="language"
                value={values.language}
                onChange={handleChange}
                label="Language"
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" component="fieldset">
              <FormLabel component="legend">Theme</FormLabel>
              <div>
                <Field
                  as={Switch}
                  type="checkbox"
                  name="theme"
                  checked={values.theme === 'dark'}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: 'theme',
                        value: e.target.checked ? 'dark' : 'light',
                      },
                    });
                  }}
                  color="primary"
                />
                <Typography component="span" style={{ marginLeft: '0.5rem' }}>
                  {values.theme === 'dark' ? 'Dark' : 'Light'}
                </Typography>
              </div>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                id="maxDistance"
                name="maxDistance"
                label="Maximum Distance (km)"
                type="number"
                value={values.maxDistance}
                onChange={handleChange}
                inputProps={{ min: 1, max: 5 }}
              />
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 4 }}>
                Save
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SettingsPage;