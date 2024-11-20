import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

export const ThemeContext = createContext();

// Custom hook to use the Theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};

const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Create Material UI theme based on current theme state
  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: '#0052cc',
      },
      secondary: {
        main: '#edf2ff',
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;