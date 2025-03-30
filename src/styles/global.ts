'use client'

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
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

  /* Bloqueia a rolagem */
 .no-scroll {
  overflow: hidden;
}

/* Fundo com opacidade */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); 
  z-index: 1100; 
  pointer-events: none; 
}
`;
