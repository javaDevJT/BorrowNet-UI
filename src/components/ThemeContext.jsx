import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

// Custom hook to use the Theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};

const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Define separate palettes for light and dark modes
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        main: '#0052cc',
      },
      secondary: {
        main: mode === 'light' ? '#edf2ff' : '#666363',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#f4f6f8' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
        secondary: mode === 'light' ? '#555555' : '#ffffff', 
      },
    },
  });

  // Create Material UI theme based on current theme state
  const muiTheme = createTheme(getDesignTokens(theme));

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;