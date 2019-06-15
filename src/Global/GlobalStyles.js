import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 10px;
  }

  body {
    color: ${ ({ theme }) => theme.font };
    font-family: ${ ({ theme }) => theme.bodyFont };
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${ ({ theme }) => theme.headerFont };
  }

  a {
    color: ${ ({ theme }) => theme.primary };
  }

  a:hover {
    color: ${ ({ theme }) => theme.primary };
  }

  button {
    outline: none !important;
  }

  input {
    outline: none !important;
  }
`;

export default GlobalStyles;