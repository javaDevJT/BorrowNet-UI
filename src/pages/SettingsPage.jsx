import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, FormControl, FormLabel, MenuItem, Select, InputLabel, Typography, Switch, TextField, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '../components/ThemeContext';

const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString(); // Expiration date in UTC
  document.cookie = `${name}=${value}; expires=${expires}; path=/`; // Set cookie with path
};


const SettingsPage = () => {
  const { theme, setTheme } = useTheme();

  const initialValues = {
    language: 'en',
    theme: theme === 'dark' ? 'dark' : 'light',
    maxDistance: 1,
  };

  const handleSubmit = (values) => {
    //if (values.theme !== theme) {
      //setTheme(values.theme);
    //}
    setCookie("theme", values.theme, 7);

    document.cookie = `maxDistance=${values.maxDistance}; path=/;`;
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
                <MenuItem value="it">Italian</MenuItem>
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
              <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 4 }} startIcon={<SaveIcon />}>
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