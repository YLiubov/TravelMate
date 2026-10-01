import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    min-width: 320px;
    background: ${({ theme }) => theme.colors.page};
    color: ${({ theme }) => theme.colors.text};
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 15px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  button, input { font: inherit; }
  button, a { -webkit-tap-highlight-color: transparent; }
  button { color: inherit; }
  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; }
  ::selection { background: #b9d7ff; color: #10294b; }
`;
