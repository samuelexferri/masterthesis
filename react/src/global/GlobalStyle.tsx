import { createGlobalStyle } from 'styled-components'

import { Colors, Fonts } from './Styles'

import FiraCodeRegular from '../assets/fonts/FiraCode-Regular.woff2'
import FiraCodeBold from '../assets/fonts/FiraCode-Bold.woff2'
import FiraCodeMedium from '../assets/fonts/FiraCode-Medium.woff2'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @font-face {
    font-family: "FiraCode";
    src: url(${FiraCodeRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "FiraCode";
    src: url(${FiraCodeMedium}) format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "FiraCode";
    src: url(${FiraCodeBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  body, html {
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.Foreground};
    font-family: ${Fonts.FiraCode};
    font-size: 16px;
    color: ${Colors.Background};
  }
  
  button {
    font-family: ${Fonts.FiraCode};
    font-size: 1em;
    border: none;
    background-color: transparent;
    padding: 0;
    outline: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${Colors.Background};
    text-decoration: none;

    &:visited {
      color: ${Colors.Background};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 150%;
    font-weight: 600;
    font-family: ${Fonts.FiraCode};
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 24px;
  }
  
  h3 {
    font-size: 14px;
  }

  h4 {
    font-size: 12px;
  }

  p {
    margin: 0;
  }
`
