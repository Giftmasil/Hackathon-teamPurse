import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        minHeight: "100%",
        background: "linear-gradient(247.28deg, #E494A2 0.08%, #745B67 34.02%) no-repeat",
        fontFamily: "Work Sans, sans-serif",
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
