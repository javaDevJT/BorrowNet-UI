import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

// Custom hook to use the Theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};

const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Create Material UI themes
  const muiThemeLight = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#0052cc',
      },
      secondary: {
        main: '#edf2ff',
      },
    },
  });

  const muiThemeDark = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#666363',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: '#ffffff',
      },
    },
  });

  // Select the theme based on the state
  const muiTheme = theme === 'light' ? muiThemeLight : muiThemeDark;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
