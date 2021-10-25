
import { createTheme, ThemeProvider } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode
};

export const DashboardThemeProvider = ({children}: Props) => {

  const theme = createTheme({
    palette: {
      mode: 'dark',
    }
  });

  return (
    <ThemeProvider theme={theme} children={children}></ThemeProvider>
  )
}