import React, { createContext, useContext, useEffect, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((row) => row.startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
};

// Custom hook to use the Theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};

const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getCookie('theme') || 'light');

  // Update the theme state if the cookie changes
  useEffect(() => {
    const interval = setInterval(() => {
      const newTheme = getCookie('theme');
      if (newTheme && newTheme !== theme) {
        setTheme(newTheme);
      }
    }, 500); // Check for changes every 500ms

    return () => clearInterval(interval);
  }, [theme]);

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
