import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  container: {
    gutter: {
      xs: "16px",
      md: "64px",
    },
  },
});

theme = createTheme(theme, {
  palette: {
    //Bluish
    primary: {
      main: "#3767a4",
      dark: "#183b79",
      light: "#78a1d4",
    },
    //Yellowish
    secondary: {
      main: "#eab14b",
    },
    //snow grey
    tertiary: {
      main: "#e5e9ed",
    },
    error: {
      main: "red",
    },
    success: {
      main: "green",
    },
    info: {
      main: " yellow",
    },
  },
});
export default theme;
