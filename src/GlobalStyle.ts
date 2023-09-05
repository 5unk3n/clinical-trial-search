import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, h1, p {
    margin: 0;
    padding: 0;
  }

  ul {
    padding: 0;
    list-style: none;
  }  
`;

export default GlobalStyle;
