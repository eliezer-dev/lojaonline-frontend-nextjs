'use client'

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    overflow-x: auto;
    min-height: 100vh;  
    background-color: ${({theme}) => theme.colors.green100 };
    color: ${({theme}) => theme.colors.gray500};
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  body, input, button, textarea {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  main {
    display: block;
  }
`;
