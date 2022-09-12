import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';
import App from './App';

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#297AFF',
    },
    secondary: {
      main: '#FFB74F',
    },
    green: {
      main: '#24C27F'
    },
    background: {
      default: 'rgb(236, 240, 249)',
    },
    button: {
      main:'#666'
    },
    text: {
      primary: 'rgb(52, 69, 99)',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Montserrat',
    },
    h2: {
      fontFamily: 'Montserrat',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
